<template>
  <v-app>
    <appbar></appbar>
    <v-main class="grey lighten-5">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <!-- <Footer></Footer> -->
  </v-app>
</template>

<script>
import Appbar from './components/common/Appbar.vue'
// import Footer from './components/common/Footer.vue'
  export default {
  components: { 
    Appbar,
    // Footer: Footer 
    },
    data: () => ({
      drawer: false,
      group: null,
    }),
  }
</script>
