<template>
  <v-app>
    <Main/>
  </v-app>
</template>
<script>
import Main from './components/pages/Main.vue'

export default {
  name: 'App',
  components: {
    Main
  },
}
</script>

<style>
html {
  width: 100%;
  height: 100%;
  overflow: hidden;
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
