(function(t){function e(e){for(var i,o,r=e[0],l=e[1],c=e[2],u=0,p=[];u<r.length;u++)o=r[u],Object.prototype.hasOwnProperty.call(n,o)&&n[o]&&p.push(n[o][0]),n[o]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(t[i]=l[i]);d&&d(e);while(p.length)p.shift()();return s.push.apply(s,c||[]),a()}function a(){for(var t,e=0;e<s.length;e++){for(var a=s[e],i=!0,r=1;r<a.length;r++){var l=a[r];0!==n[l]&&(i=!1)}i&&(s.splice(e--,1),t=o(o.s=a[0]))}return t}var i={},n={app:0},s=[];function o(e){if(i[e])return i[e].exports;var a=i[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=i,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(a,i,function(e){return t[e]}.bind(null,i));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=e,r=r.slice();for(var c=0;c<r.length;c++)e(r[c]);var d=l;s.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"034f":function(t,e,a){"use strict";a("85ec")},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var i=a("2b0e"),n=a("755e"),s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Main")],1)},o=[],r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("Header"),a("v-main",[a("Menu"),a("Map")],1),a("Footer")],1)},l=[],c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app-bar",{attrs:{color:"light-blue accent-4",absolute:"",app:""}},[a("v-toolbar-title",{staticClass:"text-h5 ml-4 font-weight-bold white--text"},[t._v("CICP-TONGS")]),a("v-spacer")],1)},d=[],u={},p=u,f=a("2877"),g=a("6544"),m=a.n(g),v=a("40dc"),b=a("2fa4"),h=a("2a7f"),C=Object(f["a"])(p,c,d,!1,null,"dcd09270",null),w=C.exports;m()(C,{VAppBar:v["a"],VSpacer:b["a"],VToolbarTitle:h["a"]});var _=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"select"},[a("v-row",{staticClass:"mr-0"},[a("v-col",{staticClass:"mt-2",attrs:{cols:"8",md:"6"}},[a("v-tabs",{attrs:{"fixed-tabs":"","background-color":"#E0E0E0"},on:{change:function(e){return t.onChangeMode(e)}}},[a("v-tab",[a("v-icon",[t._v(" mdi-sack ")])],1),a("v-tab",[a("v-icon",[t._v(" mdi-map-marker-multiple ")])],1)],1)],1),a("v-spacer"),a("v-col",{staticClass:"mr-2 pt-2 text-h5",attrs:{cols:"3",md:"1"}},[a("v-select",{attrs:{"pt-0":"","single-line":"",items:t.ids},on:{change:function(e){return t.onChangeId(e)}},model:{value:t.now_id,callback:function(e){t.now_id=e},expression:"now_id"}})],1)],1)],1)},k=[],M=a("2909"),y=(a("99af"),a("d3b7"),a("ddb0"),{data:function(){return{now_id:"",ids:["ALL"].concat(Object(M["a"])(Array(21).keys()))}},created:function(){console.log(this.$store.getters["id"]),this.now_id=this.$store.getters["id"]},methods:{onChangeId:function(t){this.$store.commit("updateId",t)},onChangeMode:function(t){this.$store.commit("updateMode",t)}}}),I=y,x=(a("d2e8"),a("62ad")),O=a("132d"),P=a("0fd9"),S=a("b974"),A=a("71a3"),E=a("fe57"),j=Object(f["a"])(I,_,k,!1,null,"ad4a39b2",null),G=j.exports;m()(j,{VCol:x["a"],VIcon:O["a"],VRow:P["a"],VSelect:S["a"],VSpacer:b["a"],VTab:A["a"],VTabs:E["a"]});var T=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"main_container"},[a("div",{staticClass:"map_container"},[a("gmap-map",{ref:"map",staticClass:"map",staticStyle:{width:"100%",height:"calc(100% - 56px - 48px)",position:"absolute",left:"0",top:"56px"},attrs:{id:"map_canvas",center:t.center,zoom:12,options:{streetViewControl:!1,rotateControl:!1,mapTypeControl:!1}}}),a("v-navigation-drawer",{attrs:{"clipped-left":"",absolute:""},model:{value:t.markerInfo,callback:function(e){t.markerInfo=e},expression:"markerInfo"}},[a("div",{staticClass:"infolist-img"},[a("img",{attrs:{src:t.garbageImg,width:"256px",height:"256px"}})]),a("div",{staticClass:"infolist"},[a("div",{staticClass:"infolist-name"},[t._v(t._s(t.garbageName))]),a("div",{staticClass:"infolist-section"},[a("div",{staticClass:"infolist-section-title"},[t._v("Time")]),a("div",{staticClass:"infolist-section-content"},[t._v(t._s(t.garbageTime))])]),a("div",{staticClass:"infolist-section"},[a("div",{staticClass:"infolist-section-title"},[t._v("ID")]),a("div",{staticClass:"infolist-section-content"},[t._v(t._s(t.garbageUserId))])]),a("div",{staticClass:"infolist-section"},[a("div",{staticClass:"infolist-section-title"},[t._v("Area")]),a("div",{staticClass:"infolist-section-content"},[t._v("Lat: "+t._s(t.garbagePos.lat))]),a("div",{staticClass:"infolist-section-content"},[t._v("Lng: "+t._s(t.garbagePos.lng))])])])])],1),"ALL"!=t.nowId?a("div",{staticClass:"point"},[a("div",{staticClass:"point-desc"},[t._v("現在のポイント")]),a("span",{staticClass:"point-count"},[a("em",{staticClass:"point-count-num"},[t._v(" "+t._s(t.userPoint)+" ")]),a("em",{staticClass:"point-count-unit"},[t._v(" pt")])])]):t._e(),t.showGarbageGuide?a("div",{staticClass:"garbage"},[t._m(0)]):t._e(),t.showGPSGuide?a("div",{staticClass:"garbage"},[a("div",{staticClass:"guide"},[a("div",{staticClass:"guide-content"},t._l(t.gpsMarkerColorPalette,(function(e,i){return a("div",{key:e.id,staticClass:"guide-content-flex"},[a("div",{staticClass:"marker-gps"},[a("div",{staticClass:"marker-circle",style:{background:e}}),a("div",{staticClass:"marker-name"},[t._v(t._s(i))])])])})),0)])]):t._e()])},D=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"guide"},[a("div",{staticClass:"guide-content"},[a("div",{staticClass:"guide-content-flex"},[a("div",{staticClass:"marker"},[a("div",{staticClass:"marker-circle can"}),a("div",{staticClass:"marker-name"},[t._v("缶")])]),a("div",{staticClass:"marker"},[a("div",{staticClass:"marker-circle petbottle"}),a("div",{staticClass:"marker-name"},[t._v("ペットボトル")])]),a("div",{staticClass:"marker"},[a("div",{staticClass:"marker-circle tobacco"}),a("div",{staticClass:"marker-name"},[t._v("タバコ")])]),a("div",{staticClass:"marker"},[a("div",{staticClass:"marker-circle paper"}),a("div",{staticClass:"marker-name"},[t._v("紙類")])]),a("div",{staticClass:"marker"},[a("div",{staticClass:"marker-circle plastic"}),a("div",{staticClass:"marker-name"},[t._v("プラスチック")])])])])])}],L=(a("159b"),a("d81d"),a("a7c6")),V=a("260b");a("e71f");i["default"].use(L["a"]);var $=V["a"].initializeApp({apiKey:"AIzaSyDb2BCe1ULMDVg4SK6TDgyzBqQkQ2M7OPU",authDomain:"cicptongs-a1b76.firebaseapp.com",projectId:"cicptongs-a1b76",storageBucket:"cicptongs-a1b76.appspot.com",messagingSenderId:"687458868015",appId:"1:687458868015:web:7fb11391d45f234c091fda"}),B=$.firestore(),F={data:function(){return{center:{lat:34.684452,lng:135.834709},infoContent:"",infoWindowPos:{lat:0,lng:0},infoWindowOpen:!1,currentMidx:null,infoOptions:{pixelOffset:{width:0,height:0}},garbages:[],markers:[],markerInfo:!1,garbageImg:null,garbageName:null,garbageUserId:null,garbageTime:null,garbagePos:{lat:null,lng:null},userPoint:0,showGarbageGuide:!0,showGPSGuide:!1,gpsMarkerColorPalette:["#004D40","#9CCC65","#41A1E1","#A667BF","#F2C500","#EA8B1D","#EB5D49","#475B6F","#ECF0F1","#9FAEAF"]}},created:function(){},mounted:function(){this.showMapData(this.nowId,this.nowMode),this.showGuide(this.nowMode)},computed:{nowId:function(){return this.$store.getters["id"]},nowMode:function(){return this.$store.getters["mode"]}},watch:{nowId:function(t){this.showMapData(t,this.nowMode)},nowMode:function(t){this.showMapData(this.nowId,t),this.showGuide(t)}},methods:{resetMarker:function(){this.markers.forEach((function(t){t.setMap(null)})),this.markers=[]},showGuide:function(t){0==t?(this.showGPSGuide=!1,this.showGarbageGuide=!0):1==t&&(this.showGarbageGuide=!1,this.showGPSGuide=!0)},showMapData:function(t,e){var a=this,i="ALL"==t?0:t,n="ALL"==t?">=":"==",s=0==e?"garbage":"gps",o=[];this.resetMarker(),B.collection(s).where("user_id",n,i).get().then((function(t){if(0==e&&(a.userPoint=t.size),0==t.size)console.log("データがありません");else{var i=a.$refs.map.$mapObject,n="black";if(t.forEach((function(t){if(null!=t.data().latitude&&null!=t.data().longitude){if(0==e){switch(t.data().type){case"PET bottle":n="#3261AB";break;case"plastic":n="#131420";break;case"can":n="#C7243A";break;case"paper":n="#009250";break;case"tabacco":n="#EDAD0B";break;default:n="white"}var s=new window.google.maps.Marker({position:{lat:t.data().latitude,lng:t.data().longitude},draggable:!1,clickable:!0,map:i,icon:{path:window.google.maps.SymbolPath.CIRCLE,scale:12,fillColor:n,fillOpacity:.8,strokeColor:"white",strokeWeight:1}});s.addListener("click",(function(){var e=t.data();a.markerInfo=!a.markerInfo,a.garbageImg=e.img_url,a.garbageName=a.convertGarbageNameToJa(e.type),a.garbageTime=a.getStringFromDate(e.time),a.garbagePos={lat:e.latitude,lng:e.longitude},a.garbageUserId=e.user_id}))}else s=new window.google.maps.Marker({position:{lat:t.data().latitude,lng:t.data().longitude},draggable:!1,clickable:!1,map:i,icon:{path:window.google.maps.SymbolPath.CIRCLE,scale:12,fillColor:a.gpsMarkerColorPalette[t.data().user_id],fillOpacity:.8,strokeColor:"white",strokeWeight:1}});a.markers.push(s),o.push({position:{lat:t.data().latitude,lng:t.data().longitude}})}})),o.length>0){var s=new window.google.maps.LatLngBounds({lat:Math.min.apply(Math,Object(M["a"])(o.map((function(t){return t.position.lat})))),lng:Math.min.apply(Math,Object(M["a"])(o.map((function(t){return t.position.lng}))))},{lat:Math.max.apply(Math,Object(M["a"])(o.map((function(t){return t.position.lat})))),lng:Math.max.apply(Math,Object(M["a"])(o.map((function(t){return t.position.lng}))))});i.fitBounds(s,10)}}})).catch((function(t){console.log(t),a.garbages=[]}))},getStringFromDate:function(t){var e=new Date(1e3*t.seconds),a=e.toLocaleDateString()+" "+e.toLocaleTimeString();return a},convertGarbageNameToJa:function(t){return"PET bottle"===t?"ペットボトル":"can"===t?"缶":"paper"===t?"紙類":"tabacco"===t||"tobacco"===t?"タバコ":"plastic"===t?"プラスチック":void 0}}},N=F,z=(a("b68b"),a("f774")),U=Object(f["a"])(N,T,D,!1,null,"a6f14dc0",null),W=U.exports;m()(U,{VNavigationDrawer:z["a"]});var J=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-footer",{attrs:{padless:"",absolute:"",color:"black"}},[a("v-col",{staticClass:"text-center white--text",attrs:{cols:"12"}},[t._v(" "+t._s((new Date).getFullYear())+" - "),a("strong",[t._v("NAIST UBI")])])],1)},R=[],H=a("553a"),Q={},K=Object(f["a"])(Q,J,R,!1,null,null,null),Y=K.exports;m()(K,{VCol:x["a"],VFooter:H["a"]});var q={components:{Header:w,Menu:G,Map:W,Footer:Y}},X=q,Z=a("7496"),tt=a("f6c4"),et=Object(f["a"])(X,r,l,!1,null,null,null),at=et.exports;m()(et,{VApp:Z["a"],VMain:tt["a"]});var it={name:"App",components:{Main:at}},nt=it,st=(a("034f"),Object(f["a"])(nt,s,o,!1,null,null,null)),ot=st.exports,rt=a("2f62");i["default"].use(rt["a"]);var lt=new rt["a"].Store({state:{id:9,mode:0},mutations:{updateId:function(t,e){t.id=e},updateMode:function(t,e){t.mode=e}},getters:{mode:function(t){return t.mode},id:function(t){return t.id}}}),ct=a("f309");i["default"].use(ct["a"]);var dt=new ct["a"]({});i["default"].config.productionTip=!1,i["default"].use(n,{load:{key:"AIzaSyAQHToOnU0iW0wPbEDpp1iT4vY7_FRsvBA",libraries:"places"}}),new i["default"]({vuetify:dt,store:lt,render:function(t){return t(ot)}}).$mount("#app")},"85ec":function(t,e,a){},"8c24":function(t,e,a){},b68b:function(t,e,a){"use strict";a("e168")},d2e8:function(t,e,a){"use strict";a("8c24")},e168:function(t,e,a){}});
//# sourceMappingURL=app.f1c5002d.js.map