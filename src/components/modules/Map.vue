<template>
  <gmap-map
      :center="{lat:34.7, lng:135.8}"
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
  
}
</script>