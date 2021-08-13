<template>
  <v-container>
    <role-create-edit-dialog
      v-if="showRoleDialog"
      :dialog.sync="showRoleDialog"
      @closeDialog="closeDialog"
      :isEdit="isEdit"
    >
    </role-create-edit-dialog>
    <page-title title="User roles"></page-title>
    <list-view-table
      :headers="headers"
      :items="roles"
      :search="search"
      @onClick="onClick"
      @editItem="editItem"
      @deleteItem="deleteItem"
    >
    <template v-slot:item.created_at="{ item }">
          {{ moment(item.created_at).format("MMMM D, YYYY") }}
        </template>
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
        @click="createRole"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      
    </v-fab-transition>
  </v-container>
</template>

<script>
import ListViewTable from "../../components/common/ListViewTable.vue";
import PageTitle from "../../components/common/PageTitle.vue";
import RoleCreateEditDialog from './RoleCreateEditDialog.vue';

export default {
  components: { ListViewTable, PageTitle, RoleCreateEditDialog},
  mounted() {
    this.$store.dispatch("role_permission/get_roles");
  },
  computed: {
    roles() {
      return this.$store.getters["role_permission/roles"];
    },
  },
  data() {
    return {
      isEdit: false,
      showRoleDialog: false,
      search: "",
      headers: [
        { text: "Name", value: "name" },
        { text: "Created at", value: "created_at"},
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    createRole(){
      this.showRoleDialog = true;
      this.isEdit = false;
    },
    closeDialog(){
      this.showRoleDialog = false;
    },
    onClick() {
        console.log('clciked');
    },
    editItem(item) {
        console.log('===>', item);
      this.$store.commit('role_permission/SET_ROLE', item);
      this.isEdit = true;
      this.showRoleDialog = true;
    },
    deleteItem(item) {
      this.$store.dispatch('role_permission/delete_role', item.id)
    },
  },
};
</script>

<style>
</style>