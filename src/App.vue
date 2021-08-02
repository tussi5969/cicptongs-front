<template>
  <v-app>
    <v-app-bar
      color="light-blue accent-4"
      dark
      app
    >
      <v-spacer />
      <v-toolbar-title>CICP-TONGS</v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <Main/>
    <v-spacer />
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Main from './components/pages/Main.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    Main
  }
}
</script>

<style>
body {
  margin: 0px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
