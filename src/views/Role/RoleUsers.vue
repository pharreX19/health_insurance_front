<template>
  <v-container>
    <page-title title="Users"></page-title>
    <user-create-edit-dialog
      v-if="showUserDialog"
      :dialog.sync="showUserDialog"
      @closeDialog="closeDialog"
      :isEdit="isEdit"
    >
    </user-create-edit-dialog>
    <list-view-table
      :headers="headers"
      :items="users"
      :search="search"
      @onClick="onClick"
      @editItem="editItem"
      @deleteItem="deleteItem"
      @changeActiveStatus="changeActiveStatus"
    >
    </list-view-table>
    <v-fab-transition>
      <v-btn
        class="pa-8 mb-10"
        color="cyan darken-3"
        dark
        bottom
        absolute
        right
        fab
        @click="createUser"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script>
import ListViewTable from "../../components/common/ListViewTable.vue";
import PageTitle from "../../components/common/PageTitle.vue";
import UserCreateEditDialog from "./UserCreateEditDialog.vue";
export default {
  components: { PageTitle, ListViewTable, UserCreateEditDialog },
  beforeMount() {
    this.$store.dispatch("role_permission/get_users", this.$route.params.id);
  },
  computed: {
    users() {
      return this.$store.getters["role_permission/users"];
    },
  },
  data() {
    return {
      isEdit: false,
      item: null,
      search: "",
      switch1: true,
      showUserDialog: false,
      headers: [
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Gender", value: "gender" },
        { text: "Contact", value: "contact" },
        { text: "Service Provider", value: "service_providers" },
        { text: "Balance (MVR)", value: "amount" },
        { text: "Is active", value: "switch", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    onClick() {},
    editItem(item) {
      console.log(item);
      this.isEdit = true;
      this.$store.commit("role_permission/SET_USER", item);
      this.showUserDialog = true;
    },
    deleteItem(item) {
      this.$store.dispatch('role_permission/delete_user', item.id);
    },
    createUser() {
      this.showUserDialog = true;
    },
    closeDialog() {
      this.isEdit = false;
      this.showUserDialog = false;
    },
    changeActiveStatus(item){
      item.service_provider_id = [];
      item.service_providers.map((service_provider) => {
        item.service_provider_id.push(service_provider.id);
      })
      this.$store.dispatch('role_permission/update_user', item);
    }
  },
};
</script>

<style>
</style>
PageTitlee>