(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6a28e1fb"],{"0e14":function(e,t,n){"use strict";var s=n("3abc"),i=n.n(s);i.a},"1fdf":function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"edit-test"},[n("div",{staticClass:"title"},[n("h3",[e._v("Edit test")]),n("button",{staticClass:"btn btn-small",on:{click:e.cancelTestBtnHandler}},[e._v("cancel")])]),e._l(e.errors,(function(t){return n("Alert",{key:t,attrs:{type:"danger"}},[e._v(e._s(t))])})),e._l(e.successes,(function(t){return n("Alert",{key:t,attrs:{type:"success"}},[e._v(e._s(t))])})),e.isLoading?n("Loader"):n("div",{staticClass:"col s12"},[n("div",{staticClass:"row"},[n("div",{staticClass:"input-field col s12"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.test.title,expression:"test.title"}],attrs:{id:"test-title",type:"text",maxlength:"50"},domProps:{value:e.test.title},on:{change:e.inputOnChangeListener,input:function(t){t.target.composing||e.$set(e.test,"title",t.target.value)}}}),n("label",{staticClass:"active",attrs:{for:"test-title"}},[e._v("Title")])])]),n("div",{staticClass:"row"},[n("div",{staticClass:"input-field col s12"},[n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.test.description,expression:"test.description"}],staticClass:"materialize-textarea",attrs:{id:"description"},domProps:{value:e.test.description},on:{change:e.inputOnChangeListener,input:function(t){t.target.composing||e.$set(e.test,"description",t.target.value)}}}),n("label",{staticClass:"active",attrs:{for:"description"}},[e._v("Description")])])]),n("div",{staticClass:"row"},[n("div",{staticClass:"col"},[n("b",[e._v("Created:")]),e._v(" "+e._s(e.test.created)+"\n      ")])])]),e.isLoading?e._e():n("h5",[e._v("Total: "+e._s(e.questions.length))]),!e.isLoading&&e.questions.length>0?n("Test",{attrs:{questions:e.questions,enableDeleteQuestion:e.enableDeleteQuestion,enableEdit:e.enableEditTest,addQuestion:e.addQuestion,deleteQuestion:e.deleteQuestion,addOption:e.addOption,deleteOption:e.deleteOption}}):e._e(),e.isLoading?e._e():n("div",{staticClass:"update-test-button"},[n("button",{staticClass:"btn btn-large",attrs:{id:"CreateTestBtn"},on:{click:e.updateTestBtnHandler}},[e._v("Update test")])])],2)},i=[],a=(n("8e6e"),n("456d"),n("75fc")),r=(n("ac6a"),n("96cf"),n("3b8d")),o=(n("20d6"),n("bd86")),c=n("864c"),u=n("98ab"),l=n("eecb"),d=n.n(l),p=n("555f"),f=n("dc08");function h(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,s)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?h(n,!0).forEach((function(t){Object(o["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):h(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var b={name:"editTest",components:{Test:c["a"],Alert:u["a"],Loader:p["a"]},data:function(){return{test:{id:0,title:"",description:"",created:"",action:f["a"].NONE},questions:[],errors:[],successes:[],isLoading:!1,deletedQuestions:[]}},computed:{enableDeleteQuestion:function(){return this.questions.length>1},enableEditTest:function(){return!0}},methods:{inputOnChangeListener:function(){this.test.action=f["a"].UPDATE},addQuestion:function(){this.questions.push({id:0,text:"",action:f["a"].CREATE,answers:[{id:0,text:"",correct:!1,action:f["a"].CREATE},{id:0,text:"",correct:!1,action:f["a"].CREATE}]})},deleteQuestion:function(e){if(this.enableDeleteQuestion){var t=null;t=!!this.isQuestionEmpty(e)||confirm("Are you sure you want to delete the Question ".concat(e+1,"?")),t&&(this.questions[e].action&&this.questions[e].action!=f["a"].NONE&&this.questions[e].action!=f["a"].UPDATE||(this.questions[e].action=f["a"].DELETE,this.deletedQuestions.push(v({},this.questions[e]))),this.questions.splice(e,1))}},addOption:function(e){this.questions[e].answers.push({id:0,text:"",checked:!1,action:f["a"].CREATE})},deleteOption:function(e,t){var n=this;if(this.questions[e].answers.length>2){var s=null;if(s=!!this.isOptionEmpty(e,t)||confirm("Are you sure you want to delete the Option ".concat(t+1," of Question ").concat(e+1,"?")),s){if(!this.questions[e].answers[t].action||this.questions[e].answers[t].action==f["a"].NONE||this.questions[e].answers[t].action==f["a"].UPDATE){this.questions[e].answers[t].action=f["a"].DELETE;var i=this.deletedQuestions.findIndex((function(t){return t.id==n.questions[e].id}));i<0&&(i=this.deletedQuestions.push({id:this.questions[e].id,answers:[]})-1),this.deletedQuestions[i].answers.push(this.questions[e].answers[t])}this.questions[e].answers.splice(t,1)}}},isOptionEmpty:function(e,t){return this.questions[e].answers[t].text.length<=0},isQuestionEmpty:function(e){if(this.questions[e].text.length>0)return!1;for(var t=!0,n=0;n<this.questions[e].answers.length;n++)if(t=this.isOptionEmpty(e,n),0==t)break;return t},getById:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var n,s=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.clearAlerts(),this.isLoading=!0,e.next=4,this.$store.dispatch("tests/getById",t);case 4:n=e.sent,n.errors.forEach((function(e){s.errors.push(e.message)})),this.test.id=n.entity.id,this.test.title=n.entity.title,this.test.description=n.entity.description,this.test.created=n.entity.created,n.entity.questions&&(this.questions=n.entity.questions),this.isLoading=!1;case 12:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),updateTestBtnHandler:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){var t,n,s=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.clearAlerts(),t=confirm("Are you sure you want to update this test?"),0!=t){e.next=4;break}return e.abrupt("return");case 4:return this.isLoading=!0,this.deletedQuestions.forEach((function(e){var t=s.questions.findIndex((function(t){return t.id==e.id}));t>=0?s.questions[t].answers=[].concat(Object(a["a"])(s.questions[t].answers),Object(a["a"])(e.answers)):s.questions.push(e)})),this.deletedQuestions=[],e.next=9,this.$store.dispatch("tests/manage",v({},this.test,{questions:this.questions}));case 9:n=e.sent,this.questions=n.entity.questions,this.isLoading=!1,n.errors.forEach((function(e){s.errors.push(e.message)})),n.isSuccess&&(d.a.create({type:"success",message:"The test was updated successfully"}),this.$router.push({path:this.$route.query.redirect||"/tests"}));case 14:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),cancelTestBtnHandler:function(){this.clearAlerts();var e=confirm("Are you sure you want to cancel test editting?");1==e&&this.$router.push({path:this.$route.query.redirect||"/tests"})},clearAlerts:function(){this.errors=[],this.successes=[]}},mounted:function(){this.getById(this.$route.params.id)}},m=b,g=(n("dc81"),n("2877")),y=Object(g["a"])(m,s,i,!1,null,null,null);t["default"]=y.exports},"33a8":function(e,t,n){"use strict";var s=n("f6d3"),i=n.n(s);i.a},"3abc":function(e,t,n){},"3bf0":function(e,t,n){"use strict";var s=n("a25d"),i=n.n(s);i.a},"5dbc":function(e,t,n){var s=n("d3f4"),i=n("8b97").set;e.exports=function(e,t,n){var a,r=t.constructor;return r!==n&&"function"==typeof r&&(a=r.prototype)!==n.prototype&&s(a)&&i&&i(e,a),e}},7386:function(e,t,n){},"864c":function(e,t,n){"use strict";var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"test"},[e._l(e.questions,(function(t,s){return n("Question",{key:s,attrs:{value:t,index:s,enableDelete:e.enableDeleteQuestion,enableEdit:e.enableEdit,enableCheck:e.enableCheck},on:{deleteQuestion:e.deleteQuestion,addOption:e.addOption,deleteOption:e.deleteOption,checkOption:e.checkOption}})})),e.enableEdit?n("div",{staticClass:"add-question-button"},[n("div",{staticClass:"btn-floating btn-meduim",on:{click:e.addQuestion}},[n("i",{staticClass:"material-icons"},[e._v("add")])])]):e._e()],2)},i=[],a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"row question"},[n("div",{staticClass:"col card s12"},[n("div",{staticClass:"card-content"},[n("div",{staticClass:"card-title"},[n("span",[e._v("Question "+e._s(e.index+1))]),e.enableEdit?n("i",{staticClass:"material-icons small",class:{"blue-grey-text text-lighten-3":!e.enableDelete},on:{click:e.deleteQuestion}},[e._v("\n                    close\n                ")]):e._e()]),n("div",{staticClass:"s12"},[n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.value.text,expression:"value.text"}],staticClass:"materialize-textarea",attrs:{id:"questionText",placeholder:"question",disabled:!e.enableEdit,maxlength:"200"},domProps:{value:e.value.text},on:{change:e.inputOnChangeListener,input:function(t){t.target.composing||e.$set(e.value,"text",t.target.value)}}})])]),n("div",{staticClass:"card-action"},[n("div",{staticClass:"answers"},e._l(e.value.answers,(function(t,s){return n("Answer",{key:s,attrs:{value:t,index:s,enableDelete:e.enableDeleteAnswer,enableEdit:e.enableEdit,enableCheck:e.enableCheck},on:{deleteAnswer:e.deleteOption,checkAnswer:e.checkOption}})})),1),e.enableEdit?n("div",{staticClass:"add-answer-button"},[n("div",{staticClass:"btn-floating btn-small",on:{click:e.addOption}},[n("i",{staticClass:"material-icons"},[e._v("add")])])]):e._e()])])])},r=[],o=(n("c5f6"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"answer"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.value.text,expression:"value.text"}],attrs:{placeholder:"option",type:"text",disabled:!e.enableEdit,maxlength:"50"},domProps:{value:e.value.text},on:{change:e.inputOnChangeListener,input:function(t){t.target.composing||e.$set(e.value,"text",t.target.value)}}}),n("label",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.value.correct,expression:"value.correct"}],attrs:{type:"checkbox",disabled:!e.enableCheck},domProps:{checked:Array.isArray(e.value.correct)?e._i(e.value.correct,null)>-1:e.value.correct},on:{change:[function(t){var n=e.value.correct,s=t.target,i=!!s.checked;if(Array.isArray(n)){var a=null,r=e._i(n,a);s.checked?r<0&&e.$set(e.value,"correct",n.concat([a])):r>-1&&e.$set(e.value,"correct",n.slice(0,r).concat(n.slice(r+1)))}else e.$set(e.value,"correct",i)},e.inputOnChangeListener]}}),n("span")]),e.enableEdit?n("i",{staticClass:"material-icons",class:{"blue-grey-text text-lighten-3":!e.enableDelete},on:{click:e.deleteAnswer}},[e._v("\n        delete\n    ")]):e._e()])}),c=[],u=n("dc08"),l={name:"answer",props:{value:{type:Object,required:!0},index:Number,enableDelete:{type:Boolean,default:!1},enableEdit:{type:Boolean,default:!1},enableCheck:{type:Boolean,default:!0}},methods:{deleteAnswer:function(){this.enableDelete&&!this.disable&&this.$emit("deleteAnswer",this.index)},inputOnChangeListener:function(){this.value.action!=u["a"].CREATE&&(this.value.action=u["a"].UPDATE),this.$emit("checkAnswer",this.value.id,this.value.submit)}}},d=l,p=(n("0e14"),n("2877")),f=Object(p["a"])(d,o,c,!1,null,"5aec53f7",null),h=f.exports,v={name:"question",components:{Answer:h},props:{value:{type:Object,required:!0},index:Number,enableDelete:{type:Boolean,default:!1},enableEdit:{type:Boolean,default:!1},enableCheck:{type:Boolean,default:!0}},methods:{addOption:function(){this.$emit("addOption",this.index)},deleteQuestion:function(){this.enableDelete&&!this.disable&&this.$emit("deleteQuestion",this.index)},deleteOption:function(e){this.$emit("deleteOption",this.index,e)},inputOnChangeListener:function(){this.value.action!=u["a"].CREATE&&(this.value.action=u["a"].UPDATE)},checkOption:function(e,t){this.$emit("checkOption",this.value.id,e,t)}},computed:{enableDeleteAnswer:function(){return this.value.answers.length>2}}},b=v,m=(n("33a8"),Object(p["a"])(b,a,r,!1,null,null,null)),g=m.exports,y={name:"test",components:{Question:g},props:{questions:{type:Array,required:!0},enableDeleteQuestion:{type:Boolean,default:!1},enableEdit:{type:Boolean,default:!1},addQuestion:{type:Function,default:function(){}},deleteQuestion:{type:Function,default:function(){}},addOption:{type:Function,default:function(){}},deleteOption:{type:Function,default:function(){}},enableCheck:{type:Boolean,default:!0},checkOption:{type:Function,default:function(){}}}},w=y,O=(n("3bf0"),Object(p["a"])(w,s,i,!1,null,null,null));t["a"]=O.exports},"8b97":function(e,t,n){var s=n("d3f4"),i=n("cb7c"),a=function(e,t){if(i(e),!s(t)&&null!==t)throw TypeError(t+": can't set as prototype!")};e.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(e,t,s){try{s=n("9b43")(Function.call,n("11e9").f(Object.prototype,"__proto__").set,2),s(e,[]),t=!(e instanceof Array)}catch(i){t=!0}return function(e,n){return a(e,n),t?e.__proto__=n:s(e,n),e}}({},!1):void 0),check:a}},a25d:function(e,t,n){},a78e:function(e,t,n){var s,i;
/*!
 * JavaScript Cookie v2.2.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */(function(a){var r;if(s=a,i="function"===typeof s?s.call(t,n,t,e):s,void 0===i||(e.exports=i),r=!0,e.exports=a(),r=!0,!r){var o=window.Cookies,c=window.Cookies=a();c.noConflict=function(){return window.Cookies=o,c}}})((function(){function e(){for(var e=0,t={};e<arguments.length;e++){var n=arguments[e];for(var s in n)t[s]=n[s]}return t}function t(e){return e.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent)}function n(s){function i(){}function a(t,n,a){if("undefined"!==typeof document){a=e({path:"/"},i.defaults,a),"number"===typeof a.expires&&(a.expires=new Date(1*new Date+864e5*a.expires)),a.expires=a.expires?a.expires.toUTCString():"";try{var r=JSON.stringify(n);/^[\{\[]/.test(r)&&(n=r)}catch(u){}n=s.write?s.write(n,t):encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),t=encodeURIComponent(String(t)).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent).replace(/[\(\)]/g,escape);var o="";for(var c in a)a[c]&&(o+="; "+c,!0!==a[c]&&(o+="="+a[c].split(";")[0]));return document.cookie=t+"="+n+o}}function r(e,n){if("undefined"!==typeof document){for(var i={},a=document.cookie?document.cookie.split("; "):[],r=0;r<a.length;r++){var o=a[r].split("="),c=o.slice(1).join("=");n||'"'!==c.charAt(0)||(c=c.slice(1,-1));try{var u=t(o[0]);if(c=(s.read||s)(c,u)||t(c),n)try{c=JSON.parse(c)}catch(l){}if(i[u]=c,e===u)break}catch(l){}}return e?i[e]:i}}return i.set=a,i.get=function(e){return r(e,!1)},i.getJSON=function(e){return r(e,!0)},i.remove=function(t,n){a(t,"",e(n,{expires:-1}))},i.defaults={},i.withConverter=n,i}return n((function(){}))}))},aa77:function(e,t,n){var s=n("5ca1"),i=n("be13"),a=n("79e5"),r=n("fdef"),o="["+r+"]",c="​",u=RegExp("^"+o+o+"*"),l=RegExp(o+o+"*$"),d=function(e,t,n){var i={},o=a((function(){return!!r[e]()||c[e]()!=c})),u=i[e]=o?t(p):r[e];n&&(i[n]=u),s(s.P+s.F*o,"String",i)},p=d.trim=function(e,t){return e=String(i(e)),1&t&&(e=e.replace(u,"")),2&t&&(e=e.replace(l,"")),e};e.exports=d},c5f6:function(e,t,n){"use strict";var s=n("7726"),i=n("69a8"),a=n("2d95"),r=n("5dbc"),o=n("6a99"),c=n("79e5"),u=n("9093").f,l=n("11e9").f,d=n("86cc").f,p=n("aa77").trim,f="Number",h=s[f],v=h,b=h.prototype,m=a(n("2aeb")(b))==f,g="trim"in String.prototype,y=function(e){var t=o(e,!1);if("string"==typeof t&&t.length>2){t=g?t.trim():p(t,3);var n,s,i,a=t.charCodeAt(0);if(43===a||45===a){if(n=t.charCodeAt(2),88===n||120===n)return NaN}else if(48===a){switch(t.charCodeAt(1)){case 66:case 98:s=2,i=49;break;case 79:case 111:s=8,i=55;break;default:return+t}for(var r,c=t.slice(2),u=0,l=c.length;u<l;u++)if(r=c.charCodeAt(u),r<48||r>i)return NaN;return parseInt(c,s)}}return+t};if(!h(" 0o1")||!h("0b1")||h("+0x1")){h=function(e){var t=arguments.length<1?0:e,n=this;return n instanceof h&&(m?c((function(){b.valueOf.call(n)})):a(n)!=f)?r(new v(y(t)),n,h):y(t)};for(var w,O=n("9e1e")?u(v):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),C=0;O.length>C;C++)i(v,w=O[C])&&!i(h,w)&&d(h,w,l(v,w));h.prototype=b,b.constructor=h,n("2aba")(s,f,h)}},dc81:function(e,t,n){"use strict";var s=n("7386"),i=n.n(s);i.a},eecb:function(e,t,n){const s=n("a78e"),i=(e={})=>{if(Object.values(e).filter(e=>e).length>0){const t=a();o(t),s.set(t,e)}},a=(e=r())=>{return void 0===s.get(e)?e:a(r())},r=()=>{return`jsFlash-${Date.now()}`},o=e=>{const t=s.getJSON("jsFlashNames"),n=void 0===t?[]:t;n.push(e),s.set("jsFlashNames",n)},c=()=>{const e=s.getJSON("jsFlashNames");if(void 0===e)return[];{const t=e.map(e=>{const t=s.getJSON(e);return s.remove(e),t});return s.remove("jsFlashNames"),t}};t.create=i,t.get=c},f6d3:function(e,t,n){},fdef:function(e,t){e.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);
//# sourceMappingURL=chunk-6a28e1fb.b97eff19.js.map