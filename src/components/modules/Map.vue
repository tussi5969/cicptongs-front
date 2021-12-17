<template>
  <div class="main_container">
    <div class="map_container">
      <gmap-map
          id="map_canvas"
          ref="map"
          style="width: 100%; height: calc(100% - 56px - 60px); position: absolute; left:0; top:116px;"
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
    };
  },
  created() {},
  updated() {
    console.log(this.nowId);
  },
  mounted() {
    var garbagePos = [];
    // Get Firestore data
    db.collection('garbage').orderBy("time", "asc").get().then(docs => {
      let map = this.$refs.map.$mapObject;
      var iconcolor = "black"
      docs.forEach((doc, index) => {
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
        const marker = new window.google.maps.Marker({
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
        garbagePos.push(
          {position: {lat:doc.data().latitude, lng:doc.data().longitude}}
        );
      });

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
    }).catch((error) => {
      console.log(error);
      this.garbages = [];
    });
  },
  computed: {
    nowId() {
      return this.$store.getters['id'];
    }
  },
  methods: {
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

</style>