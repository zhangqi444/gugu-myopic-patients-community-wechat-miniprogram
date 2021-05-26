require('../../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["packageSubPage/pages/comment/index"],{1259:function(e,t,n){"use strict";var r=n("1e12"),o=n.n(r);o.a},"187f":function(e,t,n){"use strict";(function(e){n("6cdc"),n("921b");r(n("66fd"));var t=r(n("d504"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"1e12":function(e,t,n){},"3f04":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=d(n("a34a")),o=n("e543"),c=n("42de"),i=n("f284"),a=n("a12c"),u=n("9362"),s=n("6843"),l=n("2f62"),m=d(n("3f9b")),f=n("9a36");function d(e){return e&&e.__esModule?e:{default:e}}function p(e,t,n,r,o,c,i){try{var a=e[c](i),u=a.value}catch(s){return void n(s)}a.done?t(u):Promise.resolve(u).then(r,o)}function h(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var c=e.apply(t,n);function i(e){p(c,r,o,i,a,"next",e)}function a(e){p(c,r,o,i,a,"throw",e)}i(void 0)}))}}function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach((function(t){g(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function g(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var T=function(){Promise.all([n.e("common/vendor"),n.e("packageSubPage/components/comment-list/comment-list-item")]).then(function(){return resolve(n("686c"))}.bind(null,n)).catch(n.oe)},O=function(){Promise.all([n.e("common/vendor"),n.e("components/content-list/index")]).then(function(){return resolve(n("47d0"))}.bind(null,n)).catch(n.oe)},_=function(){Promise.all([n.e("common/vendor"),n.e("components/impression/impression-bar-comment")]).then(function(){return resolve(n("6e5c"))}.bind(null,n)).catch(n.oe)},E=function(){Promise.all([n.e("common/vendor"),n.e("components/uni-popup/uni-popup")]).then(function(){return resolve(n("1c89"))}.bind(null,n)).catch(n.oe)},w=function(){n.e("components/uni-popup/uni-popup-message").then(function(){return resolve(n("bedb"))}.bind(null,n)).catch(n.oe)},M={components:{commentListItem:T,contentList:O,impressionBarComment:_,uniPopup:E,uniPopupMessage:w},data:function(){return{articleId:"",getter:c.COMMENT_GETTER_GET,isAdding:!1,errorMessage:"",commentTarget:null}},computed:v(v({},(0,l.mapState)({self:function(e){return e.userStore.self}})),{},{article:function(){return this.$store.getters[o.ARTICLE_GETTER_GET_ONE](this.articleId)}}),onLoad:function(e){var t=this;return h(r.default.mark((function n(){return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:e&&(t.articleId=e.articleId,t.commentTarget=e.commentId&&t.$store.getters[c.COMMENT_GETTER_GET_ONE](e.commentId),t.isAdding=e.isAdding);case 1:case"end":return n.stop()}}),n)})))()},onReady:function(){var t=this;return h(r.default.mark((function n(){return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:e.showShareMenu({withShareTicket:!0,menus:["shareAppMessage","shareTimeline"],title:t.article.title,path:"".concat(f.PAGES.ARTICLE.path,"?id=").concat(t.articleId),content:t.article.content,imageUrl:t.article.cover}),t.$refs["contentList"]?t.$refs["contentList"].$refs.list.loadMore():setTimeout((function(){t.$refs["contentList"].$refs.list.loadMore()}),200),t.isAdding&&t.$refs["impressionBarComment"].focusInput(),(0,a.addVisitComment)(t.articleId,t.self._id);case 4:case"end":return n.stop()}}),n)})))()},methods:{publishComment:function(e){var t=this;return h(r.default.mark((function n(){var o,a,u;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(e){n.next=2;break}return n.abrupt("return");case 2:return n.prev=2,o={article:t.articleId,content:e.trim(),isNestedComment:!!t.commentTarget},t.commentTarget&&(a=t.commentTarget.isNestedComment,o.comment=a?t.commentTarget.comment._id:t.commentTarget._id,o.nestedComment=a?t.commentTarget._id:null),n.next=7,(0,i.addComment)(o);case 7:if(u=n.sent,u=u&&u.data&&u.data.addComment,!u||!u._id){n.next=15;break}return t.$refs["impressionBarComment"].clearInput(),t.$store.commit(c.COMMENT_MUTATION_UPDATE_ONE,{item:u}),t.$refs["contentList"].unshiftLocalIdList(u._id),t.commentTarget=null,n.abrupt("return");case 15:n.next=20;break;case 17:n.prev=17,n.t0=n["catch"](2),console.error(n.t0);case 20:t.errorMessage=m.default.ERROR.COMMENT_PUBLISH_FAILED,t.$refs.errorPopup.open();case 22:case"end":return n.stop()}}),n,null,[[2,17]])})))()},onLoadMore:function(e,t,n){var o=this;return h(r.default.mark((function e(){var a,u;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=v(v({},t),{},{sort:{createdAt:-1}}),e.next=4,(0,i.commentsByArticle)(o.articleId,o.self._id,a);case 4:u=e.sent,u=u.data.commentsByArticle,o.$store.commit(c.COMMENT_MUTATION_ADD,{items:u}),n(u),e.next=14;break;case 10:e.prev=10,e.t0=e["catch"](0),console.error(e.t0),n(null);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})))()},loadMore:function(){this.$refs.commentList.loadMore()},thumb:function(e){var t=this;return h(r.default.mark((function n(){return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,(0,s.addThumb)(e,t.self,u.addThumbComment,c.COMMENT_MUTATION_UPDATE_ONE);case 2:case"end":return n.stop()}}),n)})))()},reply:function(e){this.commentTarget=e,this.$refs["impressionBarComment"].focusInput()},commentInputBlur:function(e){e||(this.commentTarget=null)}}};t.default=M}).call(this,n("543d")["default"])},"53b4":function(e,t,n){"use strict";n.r(t);var r=n("3f04"),o=n.n(r);for(var c in r)"default"!==c&&function(e){n.d(t,e,(function(){return r[e]}))}(c);t["default"]=o.a},be6c:function(e,t,n){"use strict";var r;n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return c})),n.d(t,"a",(function(){return r}));var o=function(){var e=this,t=e.$createElement;e._self._c},c=[]},d504:function(e,t,n){"use strict";n.r(t);var r=n("be6c"),o=n("53b4");for(var c in o)"default"!==c&&function(e){n.d(t,e,(function(){return o[e]}))}(c);n("1259");var i,a=n("f0c5"),u=Object(a["a"])(o["default"],r["b"],r["c"],!1,null,"364ebc6f",null,!1,r["a"],i);t["default"]=u.exports}},[["187f","common/runtime","common/vendor","packageSubPage/common/vendor"]]]);