<template>
	<view v-if="!loading" class="container flex column">
		<txv-video v-if="hasVideoContent" :vid="item.video.vid" :playerid="item._id" class="video" showCenterPlayBtn="true" controls="true" />
		<view class="article-list-container">
			<articleList class="article-list" @loadMore="loadMoreArticles" :loadMoreEnabled="false" limit="10" ref="articleList">
				<template v-slot:header>
					<view class="header-container">
						<text class="title">{{ item.title }}</text>
						<view class="author-info-container" @click="clickAuthor(item)">
							<image class="author-image flex" :src="author.avatar"></image>
							<view class="author-title-container flex column">
								<text class='author-info-text author-info-title'>{{ author.fullTitle }}</text>
								<text class="author-info-text author-info-subtitle">
									{{ `${visitCountText}・${updatedAtRelative}${author.introduction ? '・' + author.introduction : '' }` }}
								</text>
							</view>
						</view>
					</view>
					<view class="header-tag-container">
						<tag class="tag" v-for="(tag, index) in item.tags" :key="tag._id" :text="tag.name"></tag>
					</view>
					<view v-if="author && author.coAuthorsLongTitle" class="attention-container">
						<!-- TODO: 目前默认只有一名联合作者 -->
						<p class="attention-text">本内容由
							<span class="attention-text attention-text-link" @click="clickAuthor(item.coAuthors[0])" >{{`${author.coAuthorsLongTitle}`}}</span>
							联合发布并向您推荐。
						</p>
					</view>
					<parser v-if="hasTextContent" class="parser" :html="item.content" />
					<view v-if="showComment" class="comment-container">
						<text class="comment-title-text">{{ `评论 ${item.commentCount}` }}</text>
						<commentListItem :item="comments[0]" @thumb="thumbComment" @reply="comment(true, comments[0]._id)"/>
						<view class="all-comment-container" @click="comment($event)">
							{{ `查看所有评论(${item.commentCount})` }}
						</view>
					</view>
					<view class="related-articles-text-container">相关推荐</view>
				</template>
				<template v-slot:footer>
					<view class="view-annotate">本站内容仅供医学知识科普使用，\n不能代替执业医师当面诊断，请谨慎参考。</view>
				</template>
			</articleList>
		</view>
		<view class="footer">
			<impressionBar class="impression-bar" @click="impressionClick" :item="item"/>
		</view>
	</view>
</template>

<script>
	import articleList from '@/components/article-list/index';
	import tag from "@/components/tag";
	import { format } from 'fecha';	
	import { ARTICLE_GETTER_GET_ONE, ARTICLE_MUTATION_UPDATE_ONE, ARTICLE_MUTATION_ADD } from "@/store/articleStore";
	import { COMMENT_MUTATION_UPDATE_ONE, COMMENT_GETTER_GET, COMMENT_MUTATION_ADD } from "@/store/commentStore";
	import { USER_GETTER_GET_SELF } from "@/store/userStore";
	import { articleRich, articles, articlesByAnyTags } from "@/common/apis/article";
	import { addVisitArticle } from "@/common/apis/visit";
	import { addThumbArticle, addThumbComment } from "@/common/apis/thumb";
	import { addCollectArticle } from "@/common/apis/collect";
	import { addComment } from "@/common/apis/comment";
	import { login } from '@/common/helpers/authHelper';
	import { addThumb, addCollect } from "@/common/helpers/actionHelper";
	import { parseAuthor, isAuthorDoctorOrExpert, addAuthor, navigateToAuthorPage } from "@/common/helpers/authorHelper"
	import { mapState } from 'vuex';
	import Strings from '@/common/strings';
	import { PAGES, ARTICLE_TYPE } from '@/common/constants';
	import { getStaticResource } from "@/common/util";
	import parser from "@/components/parser";
	import impressionBar from '@/components/impression/impression-bar';
	import commentListItem from '@/packageSubPage/components/comment-list/comment-list-item';
	
	export default {
		components: { tag, articleList, parser, impressionBar, commentListItem },
		data() {
			return {
				id: null, loading: false, loaded: false,
				commentAdminIcon: getStaticResource("admin"),
				commentReplyIcon: getStaticResource("comment-reply"),
				commentThumbIcon: getStaticResource("comment-thumb"),
			};
		},
		computed: {
			...mapState({
				self: state => state.userStore.self,
				item(state) {
					if(!this.id) return {};
					return this.$store.getters[ARTICLE_GETTER_GET_ONE](this.id) || {};
				},
				comments() {
					if(!this.item || !this.item.comments) return;
					return this.$store.getters[COMMENT_GETTER_GET](this.item.comments.map(c => c._id)) || {};
				}
			}),
			author() {
				const author = parseAuthor(this.item);
				// 对于官方账户OfficialUser或者普通用户User，文章详情页面的作者名只显示name。
				// 否则，则显示带有职称的名称。
				if(!isAuthorDoctorOrExpert(this.item)) {
					author.fullTitle = author.name;
				}
				return author;
			},
			showComment() {
				return this.item.comments && this.item.comments.length > 0;
			},
			collected() {
				return this.item && this.item.self && this.item.self.collect && this.item.self.collect.value || false;
			},
			thumbed() {
				return this.item && this.item.self && this.item.self.thumb && this.item.self.thumb.value || false;
			},
			updatedAtRelative() {
				return this.item.updatedAt ? format(this.item.updatedAt, "YYYY-MM-DD") : '';
			},
			hasTextContent() {
				return this.item.content && this.item.content.trim() !== '';
			},
			hasVideoContent() {
				return this.item.video && this.item.video.vid;
			},
			visitCountText() {
				return this.item.visitCount ? `${this.item.visitCount}次${ this.hasVideoContent ?  '播放' : '阅读'}` : '';
			},
		},
		async onLoad(option) {
			this.id = option && option.id;
			// 如果详情页面被通过分享直接点开，此时内存中无缓存内容，则需要同步重新加载全部内容
			if(!this.item || !this.item._id) {
				this.loading = true;
				uni.showLoading({
				    title: Strings.GLOBAL.LOADING
				});
				await this.load();
				uni.hideLoading();
				this.loading = false;
				this.loaded = true;
			}
		},
		async onReady() { // 如果详情页面在应用内别直接打开，此时内存中有缓存内容，则在页面渲染结束后加载更多异步信息
			uni.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline'],
				title: this.item.title,
				path: `${PAGES.ARTICLE.path}?id=${this.item._id}`,
				content: this.item.content,
				imageUrl: this.item.cover
			});
			try {
				if(!this.loaded) await this.load(); // 加载文章的详情信息，尤其包括当前用户是否对该文章点赞等信息
				
				addVisitArticle(this.item._id, this.self._id);
				this.$store.commit(ARTICLE_MUTATION_UPDATE_ONE, {
					item: { ...this.item, visitCount: this.item.visitCount + 1 }
				});
				
				if(this.$refs["articleList"]) {
					this.$refs["articleList"].$refs.list.loadMore();
				} else {
					setTimeout(() => {
						this.$refs["articleList"].$refs.list.loadMore();
					}, 200);
				}
			} catch(e) {
				console.error(e);
				return;
			}
		},
		onShareAppMessage(res) {
			return {
				title: this.item.title,
				path: `${PAGES.ARTICLE.path}?id=${this.item._id}`,
				content: this.item.content,
				imageUrl: this.item.cover
			}
		},
		methods: {
			impressionClick(type) {
				switch(type) {
					case 'thumb':
						this.thumb(); return;
					case 'collect':
						this.collect(); return;
					case 'comment':
						this.comment(true); return;
					case 'share':
					default:
						return;
				}
			},
			comment(isAdding, commentId) {
				let url = `${PAGES.COMMENT.path}?articleId=${this.id}&isAdding=${!!isAdding}`;
				if(commentId) {
					url = url + `&commentId=${commentId}`;
				}
				uni.navigateTo({ url });
			},
			async thumb(event) {
				await addThumb(this.item, this.self, addThumbArticle, ARTICLE_MUTATION_UPDATE_ONE);
			},
			async collect(event) {
				await addCollect(this.item, this.self, addCollectArticle, ARTICLE_MUTATION_UPDATE_ONE);
			},
			async load() {
				if(!this.self._id) await login(this);
				
				if(this.id) {
					const article = await articleRich(this.id, this.self._id);
					this.$store.commit(ARTICLE_MUTATION_UPDATE_ONE, { item: article.data.articleRich });
					this.$store.commit(COMMENT_MUTATION_ADD, { items: article.data.articleRich.comments });
					addAuthor(article);
					article.data.articleRich.coAuthors.forEach(c => addAuthor(c));
				}
			},
			async loadMoreArticles(id, option, callback) {
				try {
					const tags = this.item.tags.map(t => t.name);
					const condition = { type: ARTICLE_TYPE.DEFAULT };
					var articlesResult;
					articlesResult = await articlesByAnyTags(tags, { ...option, sort: { 'createdAt': -1 } }, condition);
					articlesResult = articlesResult 
						&& articlesResult.data 
						&& articlesResult.data.articlesByAnyTags.filter(a => a._id !== this.item._id) 
						|| [];					
					this.$store.commit(ARTICLE_MUTATION_ADD, { items: articlesResult });
					callback(articlesResult);
				} catch(e) {
					console.error(e);
					callback(null);
				}
			},
			clickAuthor(source) {
				navigateToAuthorPage(source);
			},
			async thumbComment(comment) {
				await addThumb(comment, this.self, addThumbComment, COMMENT_MUTATION_UPDATE_ONE);
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		min-height: 100%;
		display: flex;
	}
	.container {
		width: 100%;
		flex: 1;
		box-sizing: border-box;
	}
	.video {
		width: 100%;
	}
	.header-container {
		position: relative;
		display: flex;
		flex-direction: column;
		padding: 34rpx 32rpx 0 32rpx;
	}
	.title {
		font-size: 16px;
		line-height: 24px;
		margin-bottom: 6px;
		color: #2E2E2E;
	}
	.author-info-container {
		display: flex;
		align-items: center;
		margin-bottom: 9px;
	}
	.author-image {
		width: 36px;
		height: 36px;
		border-radius: 50%;
	}
	.author-title-container {
		margin-left: 4px;
		align-items: flex-start;
		flex: 1;
	}
	.author-info-text {
		font-size: 14px;
		line-height: 20px;
		color: #939393;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1; /* number of lines to show */
		-webkit-box-orient: vertical;
	}
	.author-info-subtitle {
		color: #B2ACAC;
		line-height: 17px;
		font-size: 12px;
	}
	.header-tag-container {
		display: flex;
		flex-direction: row;
		flex-flow: wrap;
		margin-bottom: 16px;
		line-height: 23px;
		padding-left: 32rpx;
		margin-top: -12rpx;
	}
	.tag {
		margin-right: 22rpx;
		margin-top: 12rpx;
	}
	.attention-container {
		display: flex;
		background: rgba(0,0,0,.03);
		border-radius: 20rpx;	
		margin: 36rpx;	
	}
	.attention-text {
		font-size: 28rpx;
		line-height: 48rpx;
		color: rgba(136,136,136,1.0);
		margin: 32rpx 40rpx;
	}
	.attention-text-link {
		font-weight: bold;
		margin: 0px;
	}
	.header-footer-container {
		justify-content: space-between;
		padding-left: 32rpx;
		padding-bottom: 15px;
	}
	.header-footer-text {
		color: #B2ACAC;
		line-height: 17px;
		font-size: 12px;
	}
	.parser {
		padding: 20rpx 32rpx 40rpx 32rpx;
		display: block;
	}
	.comment-container {
		display: flex;
		position: relative;
		flex-direction: column;
		width: 100%;
		background-color: #FFFFFF;
		padding-bottom: 32rpx;
		border-top: 12rpx;
		border-right: 0px;
		border-left: 0px;
		border-bottom: 0px;
		border-color: #F5F5F5;
		border-style: solid;
	}
	.comment-title-text {
		display: flex;
		padding-top: 20rpx;
		padding-left: 36rpx;
		color: #2E2E2E;
		font-size: 32rpx;
		font-weight: bold;
	}
	.all-comment-container {
		display: flex;
		justify-content: center;
		border-top: 2rpx;
		border-bottom: 0px;
		border-color: #F5F5F5;
		border-style: solid;
		padding-top: 24rpx;
		color: #36BF56;
		font-size: 28rpx;
		line-height: 40rpx;
	}
	.related-articles-text-container {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		padding-left: 36rpx;
		height: 80rpx;
		border-top: 12rpx;
		border-color: #F5F5F5;
		border-style: solid;
		font-weight: bold;
		font-size: medium;
		border-bottom: 0rpx;
	}
	.article-list-container {
		display: flex;
		flex: 1;
		flex-direction: column;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		position: relative;
		overflow: auto;
	}
	.article-list {
		height: 100%;
		width: 100%;
		position: absolute;
	}
	.view-annotate {
		text-align: center;
		font-size: 28rpx;
		line-height: 44rpx;
		color:#888888;
		background-color: #F8F8F8;
		padding: 32rpx 36rpx;
	}
	.footer {
		border-style: solid;
		border-width: 2rpx 0 0 0;
		border-color: #F0F0F0;
		--safe-area-inset-bottom: env(safe-area-inset-bottom);
		padding-bottom: calc(var(--safe-area-inset-bottom));
	}
</style>
