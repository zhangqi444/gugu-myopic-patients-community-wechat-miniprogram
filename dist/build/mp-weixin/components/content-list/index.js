(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/content-list/index"],{"198b":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement;t._self._c},o=[]},"47d0":function(t,e,n){"use strict";n.r(e);var i=n("198b"),a=n("c508");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("8149");var s,r=n("f0c5"),d=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,"a2937e68",null,!1,i["a"],s);e["default"]=d.exports},7222:function(t,e,n){},8149:function(t,e,n){"use strict";var i=n("7222"),a=n.n(i);a.a},c508:function(t,e,n){"use strict";n.r(e);var i=n("edd7"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},edd7:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;n("325c"),i(n("3f9b")),n("9a36");function i(t){return t&&t.__esModule?t:{default:t}}var a=function(){Promise.all([n.e("common/vendor"),n.e("components/list/index")]).then(function(){return resolve(n("11ef"))}.bind(null,n)).catch(n.oe)},o=function(){n.e("components/uni-cell").then(function(){return resolve(n("07fc"))}.bind(null,n)).catch(n.oe)},s={components:{list:a,uniCell:o},props:{limit:{type:Number,default:5},_id:{type:String,default:""},refresherEnabled:{type:Boolean,default:!1},loadMoreEnabled:{type:Boolean,default:!0},getter:{type:String,default:""}},data:function(){return{navigateFlag:!1,skip:0,loaded:!1,dataIdList:[],localDataIdList:[]}},computed:{dataList:function(){if(this.getter&&this.$store.getters[this.getter]){var t=this.$store.getters[this.getter](this.localDataIdList)||[],e=this.$store.getters[this.getter](this.dataIdList);return t.concat(e)}},showLoadMore:function(){return(this.loadMoreEnabled||!this.loaded)&&this.dataList&&this.dataList.length>0}},created:function(){this.skip=0},methods:{loadMore:function(t,e){var n=this;!this.loadMoreEnabled&&this.loaded||(t&&(this.skip=0),this.$emit("loadMore",this._id,{skip:this.skip,limit:this.limit},(function(i){var a=i.map((function(t){return t._id}));n.dataIdList=t?a:n.dataIdList.concat(a),n.localDataIdList=t?[]:n.localDataIdList,n.skip=n.dataIdList.length,n.loaded=!0,e(i,n.limit)})))},unshiftLocalIdList:function(t){this.localDataIdList.unshift(t)}}};e.default=s}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/content-list/index-create-component',
    {
        'components/content-list/index-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("47d0"))
        })
    },
    [['components/content-list/index-create-component']]
]);
