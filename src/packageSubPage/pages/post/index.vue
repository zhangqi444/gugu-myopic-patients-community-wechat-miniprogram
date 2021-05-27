<template>
	<view v-if="!loading" class="container">
		<view class="list-container">
			<contentList class="list" @loadMore="loadMore" limit="10" ref="contentList" :getter="getter">
				<template v-slot:header>
					<view class="edit-contanier" v-if="self._id === author._id">
						<view class="image-container">
							<image v-if="post.securityCheckStatus != 'PASSED'" :src="underreviewIcon" class="tag-under-review"></image>
							<image v-else :src="publishedIcon" class="tag-published"></image>
						</view>
						<view class="edit-area">
							<view class="edit-item">
								<image :src="editIcon" class="image-edit"></image>
								<text class="text-edit">编辑</text>
							</view>
							<view class="edit-item">
								<image :src="deleteIcon" class="image-edit"></image>
								<text class="text-edit">删除</text>
							</view>
						</view>
					</view>
					<view class="spliter-header"></view>
					<view class="header-container">
						<text class="title">{{ post.title }}</text>
						<view class="subtitle-container" v-if="false">
							<text class="subtitle-reply">全部回答</text>
							<text class="subtitle-source">来自xx圈</text>
						</view>
						<view class="spliter-title"></view>
						<view class="author-info-container flex">
							<image class="author-image flex" :src="author.avatar"></image>
							<view class="author-title-container flex column">
								<text class='author-info-text author-info-title'>{{ author.fullTitle }}</text>
								<text class="author-info-text author-info-subtitle">
									{{ `${visitCountText}・${updatedAtRelative}${author.introduction ? '・' + author.introduction : '' }` }}
								</text>
							</view>
						</view>
					</view>
					<parser v-if="hasTextContent" class="parser" :html="post.content" />
					<view class="spliter-middle"></view>
					<view v-if="!commentListItem || commentListItem.length === 0" class="no-comment-container">
						<image :src="nocommentIcon" class="no-comment-image"></image>
						<text class="no-comment-text">还没有评论，发表第一条评论吧</text>
					</view>
				</template>
				<template v-slot:item="{item}">
					<commentListItem :ref="'comment-item' + item._id" :item="item" @thumb="thumbComment"/>
				</template>
				<template v-slot:spliter>
					<view class="spliter" />
				</template>
				<!-- <template v-slot:placeholder>
					<view class="placeholder">
						<image></image>
						<p>还没有评论，发表第一条评论吧</p>
					</view>
				</template> -->
				<template v-slot:footer>
					<view class="view-annotate">
						<text>圈子内容仅供参考，不代表咕咕的立场</text>
						<a>免责声明</a>
					</view>
				</template>
			</contentList>
		</view>
		<view class="footer">
			<impressionBarComment ref="impressionBarComment" class="impression-bar" @inputBlur="commentInputBlur" @publish="publishComment"
				:target="commentTarget ? commentTarget : post" :item="post" :showCommentPublish="false" :showImpressionBar="true" type="Post" />
		</view>
	</view>
</template>

<script>
	import { format } from 'fecha';	
	import { POST_GETTER_GET_ONE, POST_MUTATION_UPDATE_ONE } from "@/store/postStore";
	import { POST_COMMENT_GETTER_GET, POST_COMMENT_MUTATION_ADD, POST_COMMENT_MUTATION_UPDATE_ONE } from "@/store/postCommentStore";
	import { USER_GETTER_GET_SELF } from "@/store/userStore";
	import { postRich } from "@/common/apis/post";
	import { addPostComment, postCommentsByPost } from "@/common/apis/postComment";
	import { addVisitSelf } from "@/common/apis/visit";
	import { addThumbPostComment } from '@/common/apis/thumb';
	import { login } from '@/common/helpers/authHelper';
	import { addThumb } from '@/common/helpers/actionHelper';
	import { mapState } from 'vuex';
	import Strings from '@/common/strings';
	import { PAGES, POST_TYPE, ONBOARDING_STATUS } from '@/common/constants';
	import { getStaticResource } from "@/common/util";
	import { parseAuthor, isAuthorDoctorOrExpert } from "@/common/helpers/authorHelper"
	import parser from "@/components/parser";
	import contentList from '@/components/content-list/index';
	import commentListItem from '@/packageSubPage/components/comment-list/comment-list-item';
	import impressionBarComment from '@/components/impression/impression-bar-comment'
	
	export default {
		components: { parser, contentList, commentListItem, impressionBarComment },
		data() {
			return {
				id: null, loading: false, loaded: false, getter: POST_COMMENT_GETTER_GET, commentTarget: null, // 如果是空，则代表正在给文章评论
				nocommentIcon: getStaticResource('no-comment'),
				underreviewIcon: getStaticResource('post-under-review'),
				publishedIcon: getStaticResource('post-published'),
				editIcon: getStaticResource('post-edit'),
				deleteIcon: getStaticResource('post-delete')
			};
		},
		computed: {
			...mapState({
				self: state => state.userStore.self,
				post(state) {
					if(!this.id) return {};
					return this.$store.getters[POST_GETTER_GET_ONE](this.id) || {}
				},
			}),
			onboarded() {
				return this.self && this.self.onboardingStatus === ONBOARDING_STATUS.ONBOARDED;
			},
			author() {
				const author = parseAuthor(this.post);
				// 对于官方账户OfficialUser或者普通用户User，文章详情页面的作者名只显示name。
				// 否则，则显示带有职称的名称。
				if(!isAuthorDoctorOrExpert(this.post)) {
					author.fullTitle = author.name;
				}
				return author;
			},
			updatedAtRelative() {
				return this.post.updatedAt && format(this.post.updatedAt, "YYYY-MM-DD");
			},
			visitCountText() {
				return `${this.post.visitCount}次${ this.hasVideoContent ?  '播放' : '阅读'}`;
			},
			hasTextContent() {
				return this.post.content && this.post.content.trim() !== '';
			},
		},
		async onLoad(option) {
			this.id = option && option.id;
			// 如果详情页面被通过分享直接点开，此时内存中无缓存内容，则需要同步重新加载全部内容
			if(!this.post || !this.post._id) {
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
				title: this.post.title,
				path: `${PAGES.POST.path}?id=${this.post._id}`,
				content: this.post.content,
			});
			try {
				if(!this.loaded) await this.load(); // 加载文章的详情信息，尤其包括当前用户是否对该文章点赞等信息
				
				if(this.$refs["contentList"]) {
					this.$refs["contentList"].$refs.list.loadMore();
				} else {
					setTimeout(() => {
						this.$refs["contentList"].$refs.list.loadMore();
					}, 200)
				}
				
				addVisitSelf(this.post._id, PAGES.POST.ref);
			} catch(e) {
				console.error(e);
				return;
			}
		},
		onShareAppMessage(res) {
			return {
				title: this.post.title,
				path: `${PAGES.POST.path}?id=${this.post._id}`,
				content: this.post.content,
			}
		},
		methods: {
			async load() {				
				if(this.id) {
					const result = await postRich(this.id, this.self._id);					
					this.$store.commit(POST_MUTATION_UPDATE_ONE, { item: result.data.postRich });
				}
			},
			async loadMore(id, defaultOption, callback) {
				try {
					let option = { ...defaultOption, sort: { 'createdAt': -1 } };
					var result = await postCommentsByPost(this.id, this.self._id, option);
					result = result.data.postCommentsByPost || [];					
					this.$store.commit(POST_COMMENT_MUTATION_ADD, { items: result });
					callback(result);
				} catch(e) {
					console.error(e);
					callback(null);
				}
			},
			async thumbComment(comment) {
				await addThumb(comment, this.self, addThumbPostComment, POST_COMMENT_MUTATION_UPDATE_ONE);
			},
			commentInputBlur(commentText) {
				if(!commentText) this.commentTarget = null;
			},
			async publishComment(commentText) {
				if(!commentText) return;
				
				try {
					const input = { article: this.articleId, content: commentText.trim(), isNestedComment: !!!this.commentTarget };
					
					if(this.commentTarget) { // 如果是发表评论，额外增加评论相关的输入
						const isTargetNested = this.commentTarget.isNestedComment;
						input.comment = isTargetNested ? this.commentTarget.comment : this.commentTarget._id;
						input.nestedComment = isTargetNested ? this.commentTarget._id : null;
					}
					
					let result = await addPostComment(input);
					result = result && result.data && result.data.addPostComment;
					if(result && result._id) {
						this.$refs['impressionBarComment'].clearInput();
						this.$store.commit(POST_COMMENT_MUTATION_UPDATE_ONE, { item: result });
						this.$refs["contentList"].unshiftLocalIdList(result._id);
						this.commentTarget = null;
					}
				} catch(e) {
					console.error(e);
				}				
			},
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
		display: flex;
		flex-direction: column;
		width: 100%;
		flex: 1;
		box-sizing: border-box;
	}
	.header-container {
		position: relative;
		display: flex;
		flex-direction: column;
		padding: 34rpx 32rpx 0 32rpx;
	}
	.title {
		font-size: 48rpx;
		line-height: 66rpx;
		margin-bottom: 6px;
		color: #2E2E2E;
		padding-bottom: 26rpx;
		word-break: break-all;
	}
	.subtitle-container {
		padding-bottom: 24rpx;
		display: flex;
	}
	.subtitle-reply {
		color: #A6A6A6;
		font-size: 24rpx;
		font-weight: Semibold;
		line-height: 34rpx;
		display: flex;
		align-self: flex-start;
		flex: 1;
	}
	.subtitle-source {
		color: #A6A6A6;
		font-size: 24rpx;
		font-weight: Semibold;
		line-height: 34rpx;
		display: flex;
		align-self: flex-end;
	}
	.spliter-title {
		background-color: #EBEBEB;
		height: 2rpx;
		justify-content: center;
	}
	.author-info-container {
		padding-top: 32rpx;
		align-items: center;
		margin-bottom: 9px;
	}
	.author-image {
		width: 36px;
		height: 36px;
		border-radius: 50%;
	}
	.author-title-container {
		margin-left: 20rpx;
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
		word-break: break-all;
		-webkit-box-orient: vertical;
	}
	.author-info-title {
		color: #4E5053;
		font-size: 28rpx;
		line-height: 40rpx;
		word-break: break-all;
	}
	.author-info-subtitle {
		color: #B2ACAC;
		line-height: 17px;
		font-size: 12px;
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
		padding: 20rpx 32rpx 60rpx 32rpx;
		display: block;
	}
	.spliter-middle {
		height: 20rpx;
		width: 100%;
		background-color: #F5F5F5;
	}
	.no-comment-container {
		width: 100%;
		height: 700rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	.no-comment-image {
		height: 150rpx;
		width: 150rpx;
	}
	.no-comment-text {
		font-size: 32rpx;
		margin-top: 20rpx;
		line-height: 48rpx;
		color: #888888;
	}
	.list-container {
		display: flex;
		flex: 1;
		flex-direction: column;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		position: relative;
		overflow: auto;
		--safe-area-inset-bottom: env(safe-area-inset-bottom);
		margin-bottom: calc(49px + (var(--safe-area-inset-bottom)));
	}
	.list {
		height: 100%;
		width: 100%;
		position: absolute;
	}
	.edit-contanier {
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: row;
		padding: 24rpx 0;
	}
	.image-container {
		display: flex;
		justify-content: flex-start;
		flex: 1;
		padding-left: 36rpx;
	}
	.tag-under-review {
		height: 50rpx;
		width: 104rpx;		
	}
	.tag-published {
		height: 50rpx;
		width: 104rpx;
	}
	.edit-area {
		display: flex;
		justify-content: flex-end;
	}
	.edit-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-right: 32rpx;
	}
	.image-edit {
		height: 28rpx;
		width: 28rpx;
		display: flex;
		align-items: center;
		padding-right: 6rpx;
	}
	.text-edit {
		font-weight: Regular;
		color: #979797;
		font-size: 28rpx;
		line-height: 40rpx;
	}
	.spliter-header {
		width: 100%;
		height: 2rpx;
		background-color: #F0F0F0;
	}
	.view-annotate {
		text-align: center;
		font-size: 14px;
		line-height: 22px;
		color:#888888;
		background-color: #F8F8F8;
		padding: 16px 0;
	}
	.footer {
		display: flex;
		position: fixed;
		bottom: 0;
		width: 100%;
		--safe-area-inset-bottom: env(safe-area-inset-bottom);
		padding-bottom: calc(var(--safe-area-inset-bottom));
		border-width: 2rpx 0 0 0;
		border-color: #F0F0F0;
		border-style: solid;
	}
	.impression-bar {
		width: 100%;
	}
	.spliter {
		background-color: #F5F5F5;
		padding-bottom: 2rpx;
	}
</style>
