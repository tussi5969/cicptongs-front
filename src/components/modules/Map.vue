<template>
  <gmap-map
      :center="center"
      :zoom="16"
      style="width: 100%; height: 640px"
  >
    <gmap-marker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center=m.position"
    />
  </gmap-map>
</template>
<script>
export default {
  data() {
    return {
      center: { lat: 34.684346, lng: 135.836375 },
      markers: [
        {position: {lat: 34.684, lng: 135.836}},
        {position: {lat: 34.68532, lng: 135.83645}},
      ]
    };
  },
};
</script>