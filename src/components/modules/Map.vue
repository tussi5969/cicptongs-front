<template>
  <div>
    <gmap-map
        :center="center"
        :zoom="16"
        style="width: 100%; height: 640px"
    >
      <gmap-marker
        :key="index"
        v-for="(g, index) in garbages"
        :position="{lat: g.latitude, lng: g.longitude}"
        :clickable="true"
        :draggable="false"
        @click="toggleInfoWindow(g, index)"
      />
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


      // 34.684452, 135.834709
      // markers: [
      //   {position: {lat: 34.684, lng: 135.836}},
      //   {position: {lat: 34.68532, lng: 135.83645}},
      // ],
      garbages: [],
    };
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
    },

    getInfoWindowContent(garbage) {
      return (
        `
        <div class="card">
          <div class="card-content">
            <div>${garbage.type}</div>
            <div>Lat:${garbage.latitude}</div>
            <div>Lng:${garbage.longitude}</div>
          </div>
        </div>
        `
      );
    }
  },
  firestore() {
    return {
      garbages: db.collection('garbage').orderBy("time", "asc")
    }
  }
};
</script>