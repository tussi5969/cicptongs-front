<template>
  <v-app>
    <Header />
    <v-main>
      <Menu />
      <Map />
    </v-main>
    <Footer />
  </v-app>
</template>
<script>
import Header from './../modules/Header.vue'
import Menu from './../modules/Menu.vue'
import Map from './../modules/Map.vue'
import Footer from './../modules/Footer.vue'
export default {
  components: {
    Header,
    Menu,
    Map,
    Footer
  }
}
</script>