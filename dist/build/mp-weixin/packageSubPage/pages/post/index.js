require('../../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["packageSubPage/pages/post/index"],{"0aec":function(t,e,n){"use strict";n.r(e);var r=n("7dce"),o=n("c9ed");for(var c in o)"default"!==c&&function(t){n.d(e,t,(function(){return o[t]}))}(c);n("9cc1");var a,i=n("f0c5"),s=Object(i["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],a);e["default"]=s.exports},2814:function(t,e,n){},"438e":function(t,e,n){"use strict";(function(t){n("6cdc"),n("921b");r(n("66fd"));var e=r(n("0aec"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"7dce":function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return r}));var o=function(){var t=this,e=t.$createElement;t._self._c},c=[]},9436:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=b(n("a34a")),o=n("1789"),c=n("26cc"),a=n("977d"),i=(n("75b0"),n("1a3e")),s=n("5a86"),u=n("a12c"),l=n("9362"),d=(n("6ac7"),n("6843")),f=n("2f62"),m=b(n("3f9b")),p=n("9a36"),h=n("325c"),v=n("43c7");function b(t){return t&&t.__esModule?t:{default:t}}function T(t,e,n,r,o,c,a){try{var i=t[c](a),s=i.value}catch(u){return void n(u)}i.done?e(s):Promise.resolve(s).then(r,o)}function O(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var c=t.apply(e,n);function a(t){T(c,r,o,a,i,"next",t)}function i(t){T(c,r,o,a,i,"throw",t)}a(void 0)}))}}function g(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function _(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?g(Object(n),!0).forEach((function(e){P(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function P(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var w=function(){n.e("components/parser").then(function(){return resolve(n("273c"))}.bind(null,n)).catch(n.oe)},S=function(){Promise.all([n.e("common/vendor"),n.e("components/content-list/index")]).then(function(){return resolve(n("47d0"))}.bind(null,n)).catch(n.oe)},x=function(){Promise.all([n.e("common/vendor"),n.e("packageSubPage/components/comment-list/comment-list-item")]).then(function(){return resolve(n("686c"))}.bind(null,n)).catch(n.oe)},E=function(){Promise.all([n.e("common/vendor"),n.e("components/impression/impression-bar-comment")]).then(function(){return resolve(n("6e5c"))}.bind(null,n)).catch(n.oe)},A={components:{parser:w,contentList:S,commentListItem:x,impressionBarComment:E},data:function(){return{id:null,loading:!1,loaded:!1,getter:a.POST_COMMENT_GETTER_GET,commentTarget:null,nocommentIcon:(0,h.getStaticResource)("no-comment"),underreviewIcon:(0,h.getStaticResource)("post-under-review"),publishedIcon:(0,h.getStaticResource)("post-published"),editIcon:(0,h.getStaticResource)("post-edit"),deleteIcon:(0,h.getStaticResource)("post-delete")}},computed:_(_({},(0,f.mapState)({self:function(t){return t.userStore.self},post:function(t){return this.id&&this.$store.getters[c.POST_GETTER_GET_ONE](this.id)||{}}})),{},{onboarded:function(){return this.self&&this.self.onboardingStatus===p.ONBOARDING_STATUS.ONBOARDED},author:function(){var t=(0,v.parseAuthor)(this.post);return(0,v.isAuthorDoctorOrExpert)(this.post)||(t.fullTitle=t.name),t},updatedAtRelative:function(){return this.post.updatedAt&&(0,o.format)(this.post.updatedAt,"YYYY-MM-DD")},visitCountText:function(){return"".concat(this.post.visitCount,"次").concat(this.hasVideoContent?"播放":"阅读")},hasTextContent:function(){return this.post.content&&""!==this.post.content.trim()}}),onLoad:function(e){var n=this;return O(r.default.mark((function o(){return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(n.id=e&&e.id,n.post&&n.post._id){r.next=9;break}return n.loading=!0,t.showLoading({title:m.default.GLOBAL.LOADING}),r.next=6,n.load();case 6:t.hideLoading(),n.loading=!1,n.loaded=!0;case 9:case"end":return r.stop()}}),o)})))()},onReady:function(){var e=this;return O(r.default.mark((function n(){return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(t.showShareMenu({withShareTicket:!0,menus:["shareAppMessage","shareTimeline"],title:e.post.title,path:"".concat(p.PAGES.POST.path,"?id=").concat(e.post._id),content:e.post.content}),n.prev=1,e.loaded){n.next=5;break}return n.next=5,e.load();case 5:e.$refs["contentList"]?e.$refs["contentList"].$refs.list.loadMore():setTimeout((function(){e.$refs["contentList"].$refs.list.loadMore()}),200),(0,u.addVisitSelf)(e.post._id,p.PAGES.POST.ref),n.next=13;break;case 9:return n.prev=9,n.t0=n["catch"](1),console.error(n.t0),n.abrupt("return");case 13:case"end":return n.stop()}}),n,null,[[1,9]])})))()},onShareAppMessage:function(t){return{title:this.post.title,path:"".concat(p.PAGES.POST.path,"?id=").concat(this.post._id),content:this.post.content}},methods:{load:function(){var t=this;return O(r.default.mark((function e(){var n;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.id){e.next=5;break}return e.next=3,(0,i.postRich)(t.id,t.self._id);case 3:n=e.sent,t.$store.commit(c.POST_MUTATION_UPDATE_ONE,{item:n.data.postRich});case 5:case"end":return e.stop()}}),e)})))()},loadMore:function(t,e,n){var o=this;return O(r.default.mark((function t(){var c,i;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,c=_(_({},e),{},{sort:{createdAt:-1}}),t.next=4,(0,s.postCommentsByPost)(o.id,o.self._id,c);case 4:i=t.sent,i=i.data.postCommentsByPost||[],o.$store.commit(a.POST_COMMENT_MUTATION_ADD,{items:i}),n(i),t.next=14;break;case 10:t.prev=10,t.t0=t["catch"](0),console.error(t.t0),n(null);case 14:case"end":return t.stop()}}),t,null,[[0,10]])})))()},thumbComment:function(t){var e=this;return O(r.default.mark((function n(){return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,(0,d.addThumb)(t,e.self,l.addThumbPostComment,a.POST_COMMENT_MUTATION_UPDATE_ONE);case 2:case"end":return n.stop()}}),n)})))()},commentInputBlur:function(t){t||(this.commentTarget=null)},publishComment:function(t){var e=this;return O(r.default.mark((function n(){var o,c,a;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(t){n.next=2;break}return n.abrupt("return");case 2:return n.prev=2,o={article:e.articleId,content:t.trim(),isNestedComment:!e.commentTarget},e.commentTarget&&(c=e.commentTarget.isNestedComment,o.comment=c?e.commentTarget.comment:e.commentTarget._id,o.nestedComment=c?e.commentTarget._id:null),n.next=7,addComment(o);case 7:a=n.sent,a=a&&a.data&&a.data.addComment,a._id&&(e.$refs["impressionBarComment"].clearInput(),e.$store.commit(COMMENT_MUTATION_UPDATE_ONE,{item:a}),e.$refs["contentList"].unshiftLocalIdList(a._id),e.commentTarget=null),n.next=16;break;case 12:n.prev=12,n.t0=n["catch"](2),console.error(n.t0),callback(null);case 16:case"end":return n.stop()}}),n,null,[[2,12]])})))()}}};e.default=A}).call(this,n("543d")["default"])},"9cc1":function(t,e,n){"use strict";var r=n("2814"),o=n.n(r);o.a},c9ed:function(t,e,n){"use strict";n.r(e);var r=n("9436"),o=n.n(r);for(var c in r)"default"!==c&&function(t){n.d(e,t,(function(){return r[t]}))}(c);e["default"]=o.a}},[["438e","common/runtime","common/vendor","packageSubPage/common/vendor"]]]);