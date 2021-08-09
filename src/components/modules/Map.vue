<template>
  <div>
    <gmap-map
        :center="center"
        :zoom="18"
        style="width: 100%; height: 640px"
    >
      <gmap-marker
        :key="index"
        v-for="(g, index) in garbages"
        :position="{lat: g.latitude, lng: g.longitude}"
        :clickable="true"
        :draggable="false"
      />
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
      center: { lat: 34.7315168, lng: 135.7341339 },
      // markers: [
      //   {position: {lat: 34.684, lng: 135.836}},
      //   {position: {lat: 34.68532, lng: 135.83645}},
      // ],
      garbages: [],
    };
  },

  firestore() {
    return {
      garbages: db.collection('garbage').orderBy("time", "asc")
    }
  }
};
</script>