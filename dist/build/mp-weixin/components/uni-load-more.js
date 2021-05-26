(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-load-more"],{"9c0e":function(t,n,e){"use strict";var o=e("de69"),a=e.n(o);a.a},a7c6:function(t,n,e){"use strict";e.r(n);var o=e("f21d"),a=e("fc5d");for(var u in a)"default"!==u&&function(t){e.d(n,t,(function(){return a[t]}))}(u);e("9c0e");var c,r=e("f0c5"),f=Object(r["a"])(a["default"],o["b"],o["c"],!1,null,"faa193a8",null,!1,o["a"],c);n["default"]=f.exports},da7e:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=t.getSystemInfoSync().platform,o={name:"UniLoadMore",props:{status:{type:String,default:"more"},showIcon:{type:Boolean,default:!0},iconType:{type:String,default:"auto"},color:{type:String,default:"#777777"},contentText:{type:Object,default:function(){return{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"}}}},data:function(){return{platform:e}},methods:{onClick:function(){this.$emit("clickLoadMore",{detail:{status:this.status}})}}};n.default=o}).call(this,e("543d")["default"])},de69:function(t,n,e){},f21d:function(t,n,e){"use strict";var o;e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return o}));var a=function(){var t=this,n=t.$createElement;t._self._c},u=[]},fc5d:function(t,n,e){"use strict";e.r(n);var o=e("da7e"),a=e.n(o);for(var u in o)"default"!==u&&function(t){e.d(n,t,(function(){return o[t]}))}(u);n["default"]=a.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-load-more-create-component',
    {
        'components/uni-load-more-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("a7c6"))
        })
    },
    [['components/uni-load-more-create-component']]
]);
