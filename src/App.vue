<template>
  <v-app>
    <v-app-bar
      color="light-blue accent-4"
      dark
      absolute
      app
    >
      <v-spacer />
      <v-toolbar-title>CICP-TONGS</v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <Main/>
    </v-main>
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
html {
  width: 100%;
  height: 100%;
}

body {
  width: 100%;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

.v-main {
  width: 100%;
  height: 100%;
}
</style>
