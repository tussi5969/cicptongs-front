(function(t){function n(n){for(var a,r,c=n[0],l=n[1],p=n[2],u=0,f=[];u<c.length;u++)r=c[u],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&f.push(o[r][0]),o[r]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);s&&s(n);while(f.length)f.shift()();return i.push.apply(i,p||[]),e()}function e(){for(var t,n=0;n<i.length;n++){for(var e=i[n],a=!0,c=1;c<e.length;c++){var l=e[c];0!==o[l]&&(a=!1)}a&&(i.splice(n--,1),t=r(r.s=e[0]))}return t}var a={},o={app:0},i=[];function r(n){if(a[n])return a[n].exports;var e=a[n]={i:n,l:!1,exports:{}};return t[n].call(e.exports,e,e.exports,r),e.l=!0,e.exports}r.m=t,r.c=a,r.d=function(t,n,e){r.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,n){if(1&n&&(t=r(t)),8&n)return t;if(4&n&&"object"===typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(r.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var a in t)r.d(e,a,function(n){return t[n]}.bind(null,a));return e},r.n=function(t){var n=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(n,"a",n),n},r.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},r.p="";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=n,c=c.slice();for(var p=0;p<c.length;p++)n(c[p]);var s=l;i.push([0,"chunk-vendors"]),e()})({0:function(t,n,e){t.exports=e("56d7")},"034f":function(t,n,e){"use strict";e("85ec")},"56d7":function(t,n,e){"use strict";e.r(n);e("e260"),e("e6cf"),e("cca6"),e("a79d");var a=e("2b0e"),o=e("755e"),i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-app",[e("v-app-bar",{attrs:{color:"light-blue accent-4",dark:"",absolute:"",app:""}},[e("v-spacer"),e("v-toolbar-title",[t._v("CICP-TONGS")]),e("v-spacer")],1),e("v-main",[e("Main")],1)],1)},r=[],c=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("Map")],1)},l=[],p=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"map_container"},[e("gmap-map",{ref:"map",staticClass:"map",staticStyle:{width:"100%",height:"100%",position:"absolute",left:"0",top:"0"},attrs:{id:"map_canvas",center:t.center,zoom:12,options:{streetViewControl:!1,rotateControl:!1,mapTypeControl:!1}}},[e("gmap-info-window",{attrs:{options:t.infoOptions,position:t.infoWindowPos,opened:t.infoWindowOpen},on:{closeclick:function(n){t.infoWindowOpen=!1}}},[e("div",{domProps:{innerHTML:t._s(t.infoContent)}})])],1)],1)},s=[],u=e("2909"),f=(e("d81d"),e("159b"),e("99af"),e("a7c6")),d=e("260b");e("e71f");a["default"].use(f["a"]);var g=d["a"].initializeApp({apiKey:"AIzaSyDb2BCe1ULMDVg4SK6TDgyzBqQkQ2M7OPU",authDomain:"cicptongs-a1b76.firebaseapp.com",projectId:"cicptongs-a1b76",storageBucket:"cicptongs-a1b76.appspot.com",messagingSenderId:"687458868015",appId:"1:687458868015:web:7fb11391d45f234c091fda"}),h=g.firestore(),b={data:function(){return{center:{lat:34.684452,lng:135.834709},infoContent:"",infoWindowPos:{lat:0,lng:0},infoWindowOpen:!1,currentMidx:null,infoOptions:{pixelOffset:{width:0,height:0}},garbages:[]}},created:function(){},mounted:function(){var t=this,n=[];h.collection("garbage").orderBy("time","asc").get().then((function(e){var a=t.$refs.map.$mapObject,o="black";e.forEach((function(e,i){switch(e.data().type){case"PET bottle":o="#3261AB";break;case"plastic":o="#131420";break;case"can":o="#C7243A";break;case"paper":o="#009250";break;case"tabacco":o="#EDAD0B";break;default:o="white"}var r=new window.google.maps.Marker({position:{lat:e.data().latitude,lng:e.data().longitude},draggable:!1,clickable:!0,map:a,icon:{path:window.google.maps.SymbolPath.CIRCLE,scale:12,fillColor:o,fillOpacity:.8,strokeColor:"white",strokeWeight:1}});r.addListener("click",(function(){t.toggleInfoWindow(e.data(),i)})),n.push({position:{lat:e.data().latitude,lng:e.data().longitude}})}));var i=new window.google.maps.LatLngBounds({lat:Math.min.apply(Math,Object(u["a"])(n.map((function(t){return t.position.lat})))),lng:Math.min.apply(Math,Object(u["a"])(n.map((function(t){return t.position.lng}))))},{lat:Math.max.apply(Math,Object(u["a"])(n.map((function(t){return t.position.lat})))),lng:Math.max.apply(Math,Object(u["a"])(n.map((function(t){return t.position.lng}))))});a.fitBounds(i,10)})).catch((function(n){console.log(n),t.garbages=[]}))},methods:{toggleInfoWindow:function(t,n){this.infoWindowPos={lat:t.latitude,lng:t.longitude},this.infoContent=this.getInfoWindowContent(t),this.currentMidx==n?this.infoWindowOpen=!this.infoWindowOpen:(this.infoWindowOpen=!0,this.currentMidx=n)},getInfoWindowContent:function(t){return'\n        <div class="card" style="width:104px; height:104px">\n          <div class="card-content" style="margin-left:6px">\n            <div><b style="font-size:16px; font-weight:900">'.concat(t.type,'</b></div>\n            <img style="margin-top:8px; border-radius: 4px;" src="').concat(t.img_url,'" width="96" height="72">\n          </div>\n        </div>\n        ')}}},m=b,v=e("2877"),w=Object(v["a"])(m,p,s,!1,null,"99acec64",null),y=w.exports,O={components:{Map:y}},M=O,x=Object(v["a"])(M,c,l,!1,null,null,null),k=x.exports,j={name:"App",components:{Main:k}},C=j,_=(e("034f"),e("6544")),P=e.n(_),W=e("7496"),S=e("40dc"),T=e("f6c4"),A=e("2fa4"),I=e("2a7f"),B=Object(v["a"])(C,i,r,!1,null,null,null),E=B.exports;P()(B,{VApp:W["a"],VAppBar:S["a"],VMain:T["a"],VSpacer:A["a"],VToolbarTitle:I["a"]});var D=e("f309");a["default"].use(D["a"]);var V=new D["a"]({});a["default"].config.productionTip=!1,a["default"].use(o,{load:{key:"AIzaSyAQHToOnU0iW0wPbEDpp1iT4vY7_FRsvBA",libraries:"places"}}),new a["default"]({vuetify:V,render:function(t){return t(E)}}).$mount("#app")},"85ec":function(t,n,e){}});
//# sourceMappingURL=app.7a78c316.js.map