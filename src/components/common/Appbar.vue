<template>
  <nav>
    <v-app-bar absolute flat color="cyan darken-3" dark app>
      <v-app-bar-nav-icon @click="openDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title><span class="font-weight-light">Health</span> Insurance</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="cyan darken-3" depressed>
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
            <v-list-item-title>John Doe </v-list-item-title>
            <v-list-item-subtitle>Admin</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
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
export default {
  data() {
    return {
      drawer: null,
      links: [
        {"title": "Dashboard", "icon": "mdi-view-dashboard", "route": "/"},
        {"title": "Companies", "icon": "mdi-forum", "route": "/companies"},
        {"title": "Policies", "icon": "mdi-view-dashboard", "route": "/policies"},
        {"title": "Subscribers", "icon": "mdi-view-dashboard", "route": "/subscribers"},
        {"title": "Services", "icon": "mdi-view-dashboard", "route": "/services"},
        {"title": "Limit Groups", "icon": "mdi-view-dashboard", "route": "/limit-groups"},
        {"title": "Episodes", "icon": "mdi-view-dashboard", "route": "/episodes"},
        {"title": "Service Providers", "icon": "mdi-view-dashboard", "route": "/service-providers"},
      ]
    };
  },
  methods: {
    openDrawer() {
      this.drawer = !this.drawer;
      console.log(this.drawer);
    },
  },
};
</script>

<style>
</style>