<template>
  <nav>
    <v-app-bar fixed flat color="cyan darken-3" dark app>
      <v-app-bar-nav-icon v-if="isLoggedOut" @click="openDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="cursor:pointer" @click="toHome"><span class="font-weight-light">Health</span> Insurance</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="isLoggedOut" color="cyan darken-3" depressed @click="signout">
        signout
        <v-icon right>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer temporary v-model="drawer" app>
      <template v-slot:prepend>
        <v-list-item two-line link>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{name}}</v-list-item-title>
            <v-list-item-subtitle>MVR {{amount}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-divider></v-divider> -->
        <v-list>
          <v-list-item v-for="link in links" :key="link.title" link router :to="link.route">
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{link.title}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { store } from '../../store';
export default {
  data() {
    return {
      name: this.$store.state.user.name,
      amount: this.$store.state.user.amount,
      drawer: null,
      links: [
        {"title": "Home", "icon": "mdi-view-dashboard", "route": "/"},
        {"title": "Companies", "icon": "mdi-forum", "route": "/companies"},
        {"title": "Policies", "icon": "mdi-view-dashboard", "route": "/policies"},
        {"title": "Subscribers", "icon": "mdi-view-dashboard", "route": "/subscribers"},
        {"title": "Services", "icon": "mdi-view-dashboard", "route": "/services"},
        {"title": "Limit Groups", "icon": "mdi-view-dashboard", "route": "/limit-groups"},
        {"title": "Episodes", "icon": "mdi-view-dashboard", "route": "/episodes"},
        {"title": "Service Providers", "icon": "mdi-view-dashboard", "route": "/service-providers"},
        {"title": "Roles", "icon": "mdi-view-dashboard", "route": "/roles"},
      ]
    };
  },
  methods: {
    openDrawer() {
      this.drawer = !this.drawer;
    },
    toHome(){
      this.$router.push('/');
    },
    signout(){
      this.$auth.logout().then(() => {
        store.commit('clear_user');
      });
      // this.$store.dispatch('auth/logout');
    }
  },
  computed: {
    isLoggedOut(){
      return this.$store.state.user;
    }
  }
};
</script>

<style>
</style>