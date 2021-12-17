<template>
  <div>
    <Header />
    <Menu />
    <Map />
  </div>
</template>
<script>
import Header from './../modules/Header.vue'
import Menu from './../modules/Menu.vue'
import Map from './../modules/Map.vue'
export default {
  components: {
    Header,
    Menu,
    Map
  }
}
</script>