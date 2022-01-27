<template>
  <div class="main_container">
    <div class="map_container">
      <gmap-map
          id="map_canvas"
          ref="map"
          style="width: 100%; height: calc(100% - 56px - 48px); position: absolute; left:0; top:56px;"
          class="map"
          :center="center"
          :zoom="12"
          :options="{
            streetViewControl: false,
            rotateControl: false,
            mapTypeControl: false,
          }"
      >
      </gmap-map>
      <v-navigation-drawer
        v-model="markerInfo"
        clipped-left
        absolute
      >
        <div class="infolist-img">
          <img v-bind:src="garbageImg" width="256px" height="256px">
        </div>
        <div class="infolist">
          <div class="infolist-name">{{ garbageName }}</div>
          <div class="infolist-section">
            <div class="infolist-section-title">Time</div>
            <div class="infolist-section-content">{{ garbageTime }}</div>
          </div>
          <div class="infolist-section">
            <div class="infolist-section-title">ID</div>
            <div class="infolist-section-content">{{ garbageUserId }}</div>
          </div>
          <div class="infolist-section">
            <div class="infolist-section-title">Area</div>
            <div class="infolist-section-content">Lat: {{ garbagePos.lat }}</div>
            <div class="infolist-section-content">Lng: {{ garbagePos.lng }}</div>
          </div>
        </div>

      </v-navigation-drawer>
    </div>

    <div class="point" v-if="nowId != 'ALL'">
      <div class="point-desc">現在のポイント</div>
      <span class="point-count">
        <em class="point-count-num"> {{userPoint}} </em>
        <em class="point-count-unit"> pt</em>
      </span>
    </div>

    <!-- 凡例 -->
    <div class="garbage" v-if="showGarbageGuide">
      <div class="guide">
        <div class="guide-content">
          <div class="guide-content-flex">
            <div class="marker">
              <div class="marker-circle can"></div>
              <div class="marker-name">缶</div>
            </div>
            <div class="marker">
              <div class="marker-circle petbottle"></div>
              <div class="marker-name">ペットボトル</div>
            </div>
            <div class="marker">
              <div class="marker-circle tobacco"></div>
              <div class="marker-name">タバコ</div>
            </div>
            <div class="marker">
              <div class="marker-circle paper"></div>
              <div class="marker-name">紙類</div>
            </div>
            <div class="marker">
              <div class="marker-circle plastic"></div>
              <div class="marker-name">プラスチック</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="garbage" v-if="showGPSGuide">
      <div class="guide">
        <div class="guide-content">
          <div class="guide-content-flex" v-for="(color, index) in gpsMarkerColorPalette" v-bind:key="color.id">
            <div class="marker-gps">
              <div class="marker-circle" v-bind:style="{ background: color }"></div>
              <div class="marker-name">{{ index }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import {db} from '../../plugins/firebase'
export default {
  data() {
    return {
      center: { lat: 34.684452, lng: 135.834709 },
      infoContent: '',
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoWindowOpen: false,
      currentMidx: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: 0
        }
      },
      garbages: [],
      markers: [],
      markerInfo: false,
      garbageImg: null,
      garbageName: null,
      garbageUserId: null,
      garbageTime: null,
      garbagePos: {
        lat: null,
        lng: null
      },
      userPoint: 0,
      showGarbageGuide: true,
      showGPSGuide: false,
      gpsMarkerColorPalette: ["#004D40", "#9CCC65", "#41A1E1", "#A667BF", "#F2C500", "#EA8B1D", "#EB5D49", "#475B6F", "#ECF0F1", "#9FAEAF"]
    };
  },
  created() {},
  mounted() {
    this.showMapData(this.nowId, this.nowMode);
    this.showGuide(this.nowMode);
  },
  computed: {
    nowId() {
      return this.$store.getters['id'];
    },
    nowMode() {
      return this.$store.getters['mode'];
    }
  },
  watch: {
    nowId(val) {
      this.showMapData(val, this.nowMode);
    },
    nowMode(val) {
      this.showMapData(this.nowId, val);
      this.showGuide(val);
    }
  },
  methods: {
    resetMarker() {
      this.markers.forEach(m => {
        m.setMap(null);
      });
      this.markers = [];
    },
    showGuide(mode) {
      if (mode == 0){
        this.showGPSGuide = false;
        this.showGarbageGuide = true;
      } else if (mode == 1){
        this.showGarbageGuide = false;
        this.showGPSGuide = true;
      }
    },
    showMapData(id, mode) {
      var searchId = (id == 'ALL') ? 0 : id;
      var searchSign = (id == 'ALL') ? '>=' : '==';
      var modeName = (mode == 0) ? 'garbage' : 'gps';
      // var modeName = (mode == 0) ? 'garbage_test' : 'gps_test';
      var garbagePos = [];
      this.resetMarker();
      // Get Firestore data
      db.collection(modeName).where("user_id", searchSign, searchId).get().then(docs => {
        if (mode == 0) { 
          this.userPoint = docs.size;
        }
        if (docs.size == 0) {
          console.log("データがありません");
        } else {
          let map = this.$refs.map.$mapObject;
          var iconcolor = "black";
          docs.forEach((doc) => {
            if (doc.data().latitude != null && doc.data().longitude != null){
              if (mode == 0) {
                // marker color
                switch (doc.data().type) {
                  case "PET bottle":
                    iconcolor = "#3261AB"; //blue 
                    break;
                  case "plastic":
                    iconcolor = "#131420"; //gray
                    break;
                  case "can":
                    iconcolor = "#C7243A"; //red
                    break;
                  case "paper":
                    iconcolor = "#009250"; //green
                    break;
                  case "tabacco":
                    iconcolor = "#EDAD0B"; //yellow
                    break;
                  default:
                    iconcolor = "white";
                }
                var marker = new window.google.maps.Marker({
                  position: {lat:doc.data().latitude, lng:doc.data().longitude},
                  draggable: false,
                  clickable: true,
                  map: map,
                  icon: {
                    path: window.google.maps.SymbolPath.CIRCLE,//シンボル円
                      scale: 12,           //サイズ
                      fillColor: iconcolor,  //塗り潰し色
                      fillOpacity: 0.8,   //塗り潰し透過率
                      strokeColor: "white", //枠線の色
                      strokeWeight: 1   //枠線の幅
                  },
                });
                marker.addListener("click", () => {
                  var infoData = doc.data()
                  this.markerInfo = !this.markerInfo;
                  this.garbageImg = infoData.img_url;
                  this.garbageName = this.convertGarbageNameToJa(infoData.type);
                  this.garbageTime = this.getStringFromDate(infoData.time);
                  this.garbagePos = {
                    lat: infoData.latitude,
                    lng: infoData.longitude
                  }
                  this.garbageUserId = infoData.user_id;
                });
              }
              else {
                marker = new window.google.maps.Marker({
                  position: {lat:doc.data().latitude, lng:doc.data().longitude},
                  draggable: false,
                  clickable: false,
                  map: map,
                  icon: {
                    path: window.google.maps.SymbolPath.CIRCLE,//シンボル円
                      scale: 12,           //サイズ
                      fillColor: this.gpsMarkerColorPalette[doc.data().user_id],  //塗り潰し色
                      fillOpacity: 0.8,   //塗り潰し透過率
                      strokeColor: "white", //枠線の色
                      strokeWeight: 1   //枠線の幅
                  },
                });
              }         
              this.markers.push(marker);
              garbagePos.push(
                {position: {lat:doc.data().latitude, lng:doc.data().longitude}}
              );
            }
          });

          if (garbagePos.length > 0) {
            var latLngBounds = new window.google.maps.LatLngBounds(
                // sw
              {
                lat: Math.min(...garbagePos.map(d => d.position.lat)),
                lng: Math.min(...garbagePos.map(d => d.position.lng))
              },
              // ne
              {
                lat: Math.max(...garbagePos.map(d => d.position.lat)),
                lng: Math.max(...garbagePos.map(d => d.position.lng))
              }
            );
            map.fitBounds(latLngBounds,10);
            }
          }
        }).catch((error) => {
          console.log(error);
          this.garbages = [];
        });
    },

    getStringFromDate(date) {
      var dateTime = new Date(date.seconds * 1000);
      var outputStringDate = dateTime.toLocaleDateString() + ' ' + dateTime.toLocaleTimeString();
      return outputStringDate;
    },
    convertGarbageNameToJa(enname) {
      if (enname === "PET bottle"){
        return "ペットボトル";
      }else if (enname === "can"){
        return "缶";
      }else if (enname === "paper"){
        return "紙類";
      }else if (enname === "tabacco" || enname === "tobacco"){
        return "タバコ";
      }else if (enname === "plastic"){
        return "プラスチック";
      }
    }
  },
  };
</script>

<style scoped>
.point {
  position: absolute;
  right: 0px;
  top: 68px;
  padding: 8px 10px 0px;
  width: 120px;
  border-radius: 8px 0 0 8px;
  background-color: white;
  box-shadow: 0 0 4px gray;
}

.point-desc {
  font-size: 12px;
}

.point-count {
  justify-content: center;  
  vertical-align:baseline;
}

.point-count-num {
  font-size: 32px;
  font-weight: bold;
  color: #D04255;
}


.guide {
  position: absolute;
  right: 0px;
  top: 172px;
  padding: 12px 0;
  width: 72px;
  border-radius: 8px 0 0 8px;
  background-color: white;
  box-shadow: 0 0 4px gray;
}

.guide-content-flex{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
}

.marker{
  margin: 12px auto;
}

.marker-gps{
  margin: 4px auto;
}

.marker-circle{
  margin: 0 auto;
  margin-bottom: 4px;
  width: 14px;
  height: 14px;
  opacity: 0.8;
  border-radius: 50px;
  border: solid 1px white;
  box-shadow: 0px 0px 2px gray;
}

.infolist{
  margin: 0 20px;
  text-align: left;
}

.infolist-name{
  font-weight: 900;
  font-size: 32px;
  margin-top: 16px;
  margin-bottom: 12px;
}

.infolist-section{
  margin-bottom: 20px;
}

.infolist-section-title{
  font-size: 20px;
  font-weight: bold;
}

.can{
  background-color: #C7243A;
}
.petbottle{
  background-color: #3261AB;
}
.tobacco{
  background-color: #EDAD0B;
}
.paper{
  background-color: #009250;
}
.plastic{
  background-color: #131420;
}

.marker-name{
  font-weight: bold;
  font-size: 10px;
}
</style>