<template>
  <div class="main_container">
    <div class="map_container">
      <gmap-map
          id="map_canvas"
          ref="map"
          style="width: 100%; height: calc(100% - 56px - 60px - 48px); position: absolute; left:0; top:116px;"
          class="map"
          :center="center"
          :zoom="12"
          :options="{
            streetViewControl: false,
            rotateControl: false,
            mapTypeControl: false,
          }"
      >
        <gmap-info-window
          :options="infoOptions"
          :position="infoWindowPos"
          :opened="infoWindowOpen"
          @closeclick="infoWindowOpen=false"
        >
          <div v-html="infoContent"></div>
        </gmap-info-window>
      </gmap-map>

    </div>
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
      showGarbageGuide: true,
      showGPSGuide: false,
      gpsMarkerColorPalette: ["#1AC3A6", "#34CF7A", "#41A1E1", "#A667BF", "#F2C500", "#EA8B1D", "#EB5D49", "#475B6F", "#ECF0F1", "#9FAEAF"]
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
      var garbagePos = [];
      this.resetMarker();
      // Get Firestore data
      db.collection(modeName).where("user_id", searchSign, searchId).get().then(docs => {
        if (docs.size == 0) {
          console.log("データがありません");
        } else {
          let map = this.$refs.map.$mapObject;
          var iconcolor = "black";
          docs.forEach((doc, index) => {
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
                  this.toggleInfoWindow(doc.data(), index);
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

    toggleInfoWindow(garbage,idx) {
      this.infoWindowPos = {lat: garbage.latitude, lng: garbage.longitude};
      this.infoContent = this.getInfoWindowContent(garbage);
      if (this.currentMidx == idx) {
        this.infoWindowOpen = !this.infoWindowOpen;
      }
      else {
        this.infoWindowOpen = true;
        this.currentMidx = idx;
      }
    },

    getInfoWindowContent(garbage) {
      return (
        `
        <div class="card" style="width:104px; height:104px">
          <div class="card-content" style="margin-left:6px">
            <div><b style="font-size:16px; font-weight:900">${garbage.type}</b></div>
            <img style="margin-top:8px; border-radius: 4px;" src="${garbage.img_url}" width="96" height="72">
          </div>
        </div>
        `
      );
    },
  },
  };
</script>

<style scoped>
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