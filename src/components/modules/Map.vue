<template>
  <div class=map_container>
    <gmap-map
        id="map_canvas"
        ref="map"
        style="width: 100%; height: 100%; position: absolute; left:0; top:0"
        class="map"
        :center="center"
        :zoom="12"
    >
      <gmap-marker
        :key="index"
        v-for="(g, index) in garbages"
        :position="{lat: g.latitude, lng: g.longitude}"
        :clickable="true"
        :draggable="false"
        @click="toggleInfoWindow(g, index)"
      >
      </gmap-marker>
      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWindowOpen"
        @closeclick="infoWindowOpen=false"
      >
        <div v-html="infoContent"></div>
      </gmap-info-window>

    </gmap-map>
    <!-- <div v-for="(garbage, index) in garbages" :key="index"> -->
      <!-- <div>{{garbages.index}}</div> -->
      <!-- <div>{{garbage.latitude}}</div> -->
    <!-- </div> -->
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
          height: -35
        }
      },
      garbages: [],
    };
  },
  updated() {
    let map = this.$refs.map.$mapObject;
    var garbagePos = [];
    this.garbages.forEach(e => {
      console.log(typeof(e.latitude));
      garbagePos.push(
        {position: {lat:e.latitude, lng:e.longitude}}
      );
    });
    console.log(garbagePos);
    console.log(Math.min(...garbagePos.map(d => d.position.lat)));
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
  },
  computed: {},
  created() {
    console.log(this.garbages);
    // TODO:garbagesの情報を常にmap上に表示させる
  },
  methods: {
    toggleInfoWindow(garbage,idx) {
      this.infoWindowPos = {lat: garbage.latitude, lng: garbage.longitude};
      console.log(typeof(garbage.latitude));
      this.infoContent = this.getInfoWindowContent(garbage);
      if (this.currentMidx == idx) {
        this.infoWindowOpen = !this.infoWindowOpen;
      }
      else {
        this.infoWindowOpen = true;
        this.currentMidx = idx;
      }
      // this.mapFitBounds();
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

    // mapFitBounds() {
      
    // }
  },
  firestore() {
    return {
      garbages: db.collection('garbage').orderBy("time", "asc")
    }
  }
};
</script>

<style scoped>
</style>
