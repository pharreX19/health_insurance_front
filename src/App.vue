<template>
  <v-app id="app">
    <appbar></appbar>
    <v-main class="grey lighten-5 overflow-hidden">
      <loader :is-visible="loading" text="<small>loading</small>"></loader>
        <v-container fluid class="mt-4">
        <router-view></router-view>
        <!-- <v-btn dark @click="snackbar = true"> Open Snackbar </v-btn> -->
        <!-- <v-snackbar v-model="snackbar">
          {{ text }}

          <template v-slot:action="{ attrs }">
            <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar> -->
        <vtoast></vtoast>
      </v-container>
    </v-main>
    <!-- <Footer></Footer> -->
  </v-app>
</template>

<script>
import Appbar from "./components/common/Appbar.vue";
import vtoast from "./components/common/Toast.vue";
export default {
  components: {
    Appbar,
    vtoast,
    // Footer: Footer
  },
  // mounted(){
  //     this.$root.vtoast = this.$refs.vtoast
  // },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
  },
  // data: () => ({
  //   drawer: false,
  //   group: null,
  // }),
};
</script>

<style lang="css" scoped>
#app {
  font-family: "Nunito", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* // text-align: center; */
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
      color: #42b983;
    }

</style>

