(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d711f"],{"74f2":function(t,e,s){"use strict";s.r(e);var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"competition-results"},[t._m(0),t._l(t.errors,(function(e){return s("Alert",{key:e,attrs:{type:"danger"}},[t._v(t._s(e))])})),t.isLoading?s("Loader"):s("div",{staticClass:"participants-table"},[s("table",[s("thead",[s("tr",[s("th",[t._v("Username")]),s("th",[t._v("Start time")]),s("th",[t._v("Finish time")]),s("th",[t._v("Points")])])]),s("tbody",t._l(t.participants,(function(e){return s("tr",{key:e.id},[s("td",[t._v(t._s(e.user.username))]),s("td",[t._v(t._s(e.start_time))]),s("td",[t._v(t._s(e.end_time))]),s("td",[t._v(t._s(e.points))])])})),0)])])],2)},n=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"title"},[s("h3",[t._v("Results")])])}],i=(s("ac6a"),s("96cf"),s("3b8d")),a=s("98ab"),o=s("555f"),c={name:"competitionResults",components:{Alert:a["a"],Loader:o["a"]},data:function(){return{participants:[],errors:[],isLoading:!1}},methods:{getResults:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){var s,r=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.errors=[],this.isLoading=!0,t.next=4,this.$store.dispatch("publics/getByIdWithParticipants",e);case 4:s=t.sent,s.errors.length<1?this.participants=s.entity:s.errors.forEach((function(t){r.errors.push(t.message)})),this.isLoading=!1;case 7:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}()},mounted:function(){this.getResults(this.$route.params.id)}},u=c,d=s("2877"),l=Object(d["a"])(u,r,n,!1,null,null,null);e["default"]=l.exports}}]);
//# sourceMappingURL=chunk-2d0d711f.31828983.js.map