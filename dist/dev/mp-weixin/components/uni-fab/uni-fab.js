(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-fab/uni-fab"],{308:
/*!********************************************!*\
  !*** ./src/components/uni-fab/uni-fab.vue ***!
  \********************************************/
/*! no static exports found */function(t,n,i){"use strict";i.r(n);var e=i(/*! ./uni-fab.vue?vue&type=template&id=7018754c&scoped=true& */309),o=i(/*! ./uni-fab.vue?vue&type=script&lang=js& */311);for(var r in o)"default"!==r&&function(t){i.d(n,t,(function(){return o[t]}))}(r);i(/*! ./uni-fab.vue?vue&type=style&index=0&id=7018754c&lang=scss&scoped=true& */313);var s,u=i(/*! ../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */85),c=Object(u["default"])(o["default"],e["render"],e["staticRenderFns"],!1,null,"7018754c",null,!1,e["components"],s);c.options.__file="components/uni-fab/uni-fab.vue",n["default"]=c.exports},309:
/*!***************************************************************************************!*\
  !*** ./src/components/uni-fab/uni-fab.vue?vue&type=template&id=7018754c&scoped=true& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(t,n,i){"use strict";i.r(n);var e=i(/*! -!../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--14-0!../../../node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./uni-fab.vue?vue&type=template&id=7018754c&scoped=true& */310);i.d(n,"render",(function(){return e["render"]})),i.d(n,"staticRenderFns",(function(){return e["staticRenderFns"]})),i.d(n,"recyclableRender",(function(){return e["recyclableRender"]})),i.d(n,"components",(function(){return e["components"]}))},310:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--14-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./src/components/uni-fab/uni-fab.vue?vue&type=template&id=7018754c&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(t,n,i){"use strict";var e;i.r(n),i.d(n,"render",(function(){return o})),i.d(n,"staticRenderFns",(function(){return s})),i.d(n,"recyclableRender",(function(){return r})),i.d(n,"components",(function(){return e}));var o=function(){var t=this,n=t.$createElement;t._self._c},r=!1,s=[];o._withStripped=!0},311:
/*!*********************************************************************!*\
  !*** ./src/components/uni-fab/uni-fab.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/*! no static exports found */function(t,n,i){"use strict";i.r(n);var e=i(/*! -!../../../node_modules/babel-loader/lib!../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./uni-fab.vue?vue&type=script&lang=js& */312),o=i.n(e);for(var r in e)"default"!==r&&function(t){i.d(n,t,(function(){return e[t]}))}(r);n["default"]=o.a},312:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./src/components/uni-fab/uni-fab.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(t,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e="other",o={name:"UniFab",props:{pattern:{type:Object,default:function(){return{}}},horizontal:{type:String,default:"left"},vertical:{type:String,default:"bottom"},direction:{type:String,default:"horizontal"},content:{type:Array,default:function(){return[]}},show:{type:Boolean,default:!1},popMenu:{type:Boolean,default:!0},fabOpenType:{type:String,default:""}},data:function(){return{fabShow:!1,isShow:!1,isAndroidNvue:"android"===e,styles:{color:"#3c3e49",selectedColor:"#007AFF",backgroundColor:"#fff",buttonColor:"#007AFF"}}},computed:{contentWidth:function(t){return 55*(this.content.length+1)+10+"px"},contentWidthMin:function(){return"55px"},boxWidth:function(){return this.getPosition(3,"horizontal")},boxHeight:function(){return this.getPosition(3,"vertical")},leftBottom:function(){return this.getPosition(0,"left","bottom")},rightBottom:function(){return this.getPosition(0,"right","bottom")},leftTop:function(){return this.getPosition(0,"left","top")},rightTop:function(){return this.getPosition(0,"right","top")},flexDirectionStart:function(){return this.getPosition(1,"vertical","top")},flexDirectionEnd:function(){return this.getPosition(1,"vertical","bottom")},horizontalLeft:function(){return this.getPosition(2,"horizontal","left")},horizontalRight:function(){return this.getPosition(2,"horizontal","right")}},watch:{pattern:function(t,n){this.styles=Object.assign({},this.styles,t)}},created:function(){this.isShow=this.show,0===this.top&&(this.fabShow=!0),this.styles=Object.assign({},this.styles,this.pattern)},methods:{_onGetUserInfo:function(t){this.$emit("getUserInfo",t)},_onClick:function(){this.$emit("fabClick"),this.popMenu&&(this.isShow=!this.isShow)},open:function(){this.isShow=!0},close:function(){this.isShow=!1},_onItemClick:function(t,n){this.$emit("trigger",{index:t,item:n})},getPosition:function(t,n,i){return 0===t?this.horizontal===n&&this.vertical===i:1===t?this.direction===n&&this.vertical===i:2===t?this.direction===n&&this.horizontal===i:this.isShow&&this.direction===n?this.contentWidth:this.contentWidthMin}}};n.default=o},313:
/*!******************************************************************************************************!*\
  !*** ./src/components/uni-fab/uni-fab.vue?vue&type=style&index=0&id=7018754c&lang=scss&scoped=true& ***!
  \******************************************************************************************************/
/*! no static exports found */function(t,n,i){"use strict";i.r(n);var e=i(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./uni-fab.vue?vue&type=style&index=0&id=7018754c&lang=scss&scoped=true& */314),o=i.n(e);for(var r in e)"default"!==r&&function(t){i.d(n,t,(function(){return e[t]}))}(r);n["default"]=o.a},314:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./src/components/uni-fab/uni-fab.vue?vue&type=style&index=0&id=7018754c&lang=scss&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(t,n,i){}}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/uni-fab/uni-fab.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-fab/uni-fab-create-component',
    {
        'components/uni-fab/uni-fab-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(308))
        })
    },
    [['components/uni-fab/uni-fab-create-component']]
]);
