(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-28af6e52"],{"088a":function(t,a,s){"use strict";var e=s("dd16"),r=s.n(e);r.a},"1c92":function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"login row"},[s("h3",[t._v("Sign in")]),s("div",{staticClass:"col",attrs:{id:"loginForm"}},[t._l(t.errors,(function(a){return s("Alert",{key:a,attrs:{type:"danger"}},[t._v(t._s(a))])})),s("div",{staticClass:"row"},[s("div",{staticClass:"input-field col s12"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.authData.testar,expression:"authData.testar"}],attrs:{id:"username",type:"text"},domProps:{value:t.authData.testar},on:{keyup:function(a){return t.usernameKeyUpHandler(a)},input:function(a){a.target.composing||t.$set(t.authData,"testar",a.target.value)}}}),s("label",{attrs:{for:"username"}},[t._v("Username")])]),s("div",{staticClass:"input-field col s12"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.authData.password,expression:"authData.password"}],ref:"passwordInput",attrs:{id:"password",type:"password"},domProps:{value:t.authData.password},on:{keyup:function(a){return t.passwordKeyUpHandler(a)},input:function(a){a.target.composing||t.$set(t.authData,"password",a.target.value)}}}),s("label",{attrs:{for:"password"}},[t._v("Password")])])]),s("div",{staticClass:"row"},[s("button",{staticClass:"btn",attrs:{id:"loginFormBtn"},on:{click:t.loginClickHandler}},[t._v("Sign in to Testar")])]),s("div",{staticClass:"row"},[s("p",[t._v("\n        Don't have an account?\n        "),s("router-link",{attrs:{to:"register"}},[t._v("Register")])],1)])],2)])},r=[],n=(s("ac6a"),s("a481"),s("98ab")),o={name:"LoginView",components:{Alert:n["a"]},data:function(){return{errors:[],authData:{testar:"",password:""}}},methods:{usernameKeyUpHandler:function(t){13==t.keyCode&&this.$refs.passwordInput.focus()},passwordKeyUpHandler:function(t){13==t.keyCode&&this.loginClickHandler()},loginClickHandler:function(){var t=this;this.errors=[],this.authData.testar=this.authData.testar.trim(),this.authData.testar.length<1||this.authData.password.length<1?(this.errors.push("Empty fields!"),this.authData.password=""):this.$store.dispatch("users/loginUser",this.authData).then((function(){t.$router.replace({path:t.$route.query.redirect||"/"})})).catch((function(a){a.forEach((function(a){t.errors.push(a.message)})),t.authData.password=""}))}}},i=o,u=(s("088a"),s("2877")),l=Object(u["a"])(i,e,r,!1,null,null,null);a["default"]=l.exports},dd16:function(t,a,s){}}]);
//# sourceMappingURL=chunk-28af6e52.d4fa5608.js.map