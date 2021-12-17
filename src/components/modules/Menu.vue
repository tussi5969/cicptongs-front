<template>
  <div class="select">
    <v-row>
      <v-col cols="4" class="ml-10 mt-2">
        <v-tabs
          fixed-tabs
          background-color="#E0E0E0"
          @change="onChangeMode($event)"
        >
          <v-tab>
            <v-icon>
              mdi-sack
            </v-icon>
          </v-tab>
          <v-tab>
            <v-icon>
              mdi-map-marker-multiple
            </v-icon>
          </v-tab>
        </v-tabs>
      </v-col>
      <v-spacer />
      <v-col cols="1" class="mr-10 pt-2 text-h5">
        <v-select
          pt-0
          single-line
          v-model="now_id"
          :items="ids"
          @change="onChangeId($event)"
        >
        </v-select>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return{
      now_id: '',
      ids:['ALL',0,1,2,3,4,5,6,7,8,9,10]
    }
  },
  created() {
    console.log(this.$store.getters['id'])
    this.now_id = this.$store.getters['id'];
  },
  methods: {
    onChangeId(event) {
      this.$store.commit('updateId', event);
    },
    onChangeMode(event) {
      this.$store.commit('updateMode', event);
    }
  }
}
</script>

<style scoped>
.select{
  position: absolute;
  left: 0;
  top: 60px;
  width: 100%;
  height: 56px;
  background-color: #E0E0E0;
}

</style>