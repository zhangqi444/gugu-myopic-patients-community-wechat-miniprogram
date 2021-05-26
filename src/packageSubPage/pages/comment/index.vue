<template>
	<view class="container">
		<uniPopup id="errorPopup" ref="errorPopup" type="message">
			<uniPopupMessage type="error" :message="errorMessage" :duration="2000"></uniPopupMessage>
		</uniPopup>
		<view class="listview-container">
			<contentList class="listview" @loadMore="onLoadMore" limit="10" ref="contentList" :getter="getter" >
				<template v-slot:item="{item}">
					<commentListItem :ref="'item-' + item._id" :item="item" @thumb="thumb" @reply="reply"/>
				</template>
				<template v-slot:spliter>
					<view class="spliter" />
				</template>
			</contentList>
		</view>
		<view class="footer">
			<impressionBarComment ref="impressionBarComment" class="impression-bar" @inputBlur="commentInputBlur" @publish="publishComment"
				:target="commentTarget ? commentTarget : article" :item="article" :showImpressionBar="false" :showCommentPublish="false" />
		</view>
	</view>
</template>

<script>
	import { ARTICLE_GETTER_GET_ONE } from "@/store/articleStore";
	import { COMMENT_MUTATION_ADD, COMMENT_GETTER_GET, COMMENT_GETTER_GET_ONE, COMMENT_MUTATION_UPDATE_ONE } from "@/store/commentStore";
	import { commentsByArticle, addComment } from "@/common/apis/comment";
	import { addVisitComment } from "@/common/apis/visit";
	import { addThumbComment } from "@/common/apis/thumb";
	import { addThumb } from "@/common/helpers/actionHelper";
	import { mapState } from 'vuex';
	import Strings from '@/common/strings';
	import { PAGES, APP } from '@/common/constants';
	import commentListItem from '@/packageSubPage/components/comment-list/comment-list-item';
	import contentList from '@/components/content-list/index';
	import impressionBarComment from '@/components/impression/impression-bar-comment';
	import uniPopup from '@/components/uni-popup/uni-popup';
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message';
	
	export default {
		components: {
			commentListItem, contentList, impressionBarComment, uniPopup, uniPopupMessage,
		},
		data() {
			return {
				articleId: '',
				getter: COMMENT_GETTER_GET,
				isAdding: false,
				errorMessage: '',
				commentTarget: null, // 如果是空，则代表正在给文章评论
			};
		},
		computed: {
			...mapState({
				self: state => state.userStore.self,
			}),
			article() {
				return this.$store.getters[ARTICLE_GETTER_GET_ONE](this.articleId);
			},
		},
		async onLoad(option) {
			if(option) {
				this.articleId = option.articleId;
				this.commentTarget = option.commentId && this.$store.getters[COMMENT_GETTER_GET_ONE](option.commentId);
				this.isAdding = option.isAdding;
			}
		},
		async onReady() { // 如果详情页面在应用内别直接打开，此时内存中有缓存内容，则在页面渲染结束后加载更多异步信息
			uni.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline'],
				title: this.article.title,
				path: `${PAGES.ARTICLE.path}?id=${this.articleId}`,
				content: this.article.content,
				imageUrl: this.article.cover
			});
			
			if(this.$refs["contentList"]) {
				this.$refs["contentList"].$refs.list.loadMore();
			} else {
				setTimeout(() => {
					this.$refs["contentList"].$refs.list.loadMore();
				}, 200);
			}
			
			this.isAdding && this.$refs['impressionBarComment'].focusInput();
			
			addVisitComment(this.articleId, this.self._id);
		},
		methods: {
			async publishComment(commentText) {
				if(!commentText) return;
				
				try {
					const input = { article: this.articleId, content: commentText.trim(), isNestedComment: !!this.commentTarget };
					
					if(this.commentTarget) { // 如果是发表评论，额外增加评论相关的输入
						const isTargetNested = this.commentTarget.isNestedComment;
						input.comment = isTargetNested ? this.commentTarget.comment._id : this.commentTarget._id;
						input.nestedComment = isTargetNested ? this.commentTarget._id : null;
					}
					
					let result = await addComment(input);
					result = result && result.data && result.data.addComment;
					if(result && result._id) {
						this.$refs['impressionBarComment'].clearInput();
						this.$store.commit(COMMENT_MUTATION_UPDATE_ONE, { item: result });
						this.$refs["contentList"].unshiftLocalIdList(result._id);
						this.commentTarget = null;
						return;
					}
				} catch(e) {
					console.error(e);
				}			
				this.errorMessage = Strings.ERROR.COMMENT_PUBLISH_FAILED;
				this.$refs.errorPopup.open();	
			},
			async onLoadMore(id, defaultOption, callback) {
				try {
					let option = { ...defaultOption, sort: { 'createdAt': -1 } };
					let result = await commentsByArticle(this.articleId, this.self._id, option);
					result = result.data.commentsByArticle;
					this.$store.commit(COMMENT_MUTATION_ADD, { items: result });
					callback(result);
				} catch(e) {
					console.error(e);
					callback(null);
				}
			},
			loadMore() {
				this.$refs.commentList.loadMore();
			},
			async thumb(comment) {
				await addThumb(comment, this.self, addThumbComment, COMMENT_MUTATION_UPDATE_ONE);
			},
			reply(comment) {
				this.commentTarget = comment;
				this.$refs['impressionBarComment'].focusInput();
			},
			commentInputBlur(commentText) {
				if(!commentText) this.commentTarget = null;
			},
		}
	}
</script>

<style scoped>
	page {
		width: 100%;
		min-height: 100%;
		display: flex;
	}
	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100vh;
		background-color: #FFFFFF;
	}
	.listview-container {
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
	.listview {
		display: flex;
		height: 100%;
		width: 100%;
		flex: 1;
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
