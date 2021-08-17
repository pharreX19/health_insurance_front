<template>
  <v-container>
   <confirm-dialog
    v-if="showConfirmDialog"
    :dialog.sync="showConfirmDialog"
    @closeDialog="closeDialog"
    @confirmDelete ="confirmDelete"
    >
    </confirm-dialog>
    <role-create-edit-dialog
      v-if="showRoleDialog"
      :dialog.sync="showRoleDialog"
      @closeDialog="closeDialog"
      :isEdit="isEdit"
    >
    </role-create-edit-dialog>
    <page-title title="User roles and permissions"></page-title>
    <v-row style="max-height:100px">
      <v-col cols="12" md="5">
        <v-card class="pa-5" flat>
        <v-data-table
          :headers="headers"
          :items="roles"
          :search="search"
          loading-text="Loading...please wait"
          class="elevation-0 row-pointer"
          hide-default-footer
          @click:row="onClick"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click.stop="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click.stop="deleteItem(item)" color="red"> mdi-delete </v-icon>
          </template>
          
          <template v-slot:item.created_at="{ item }">
          {{ moment(item.created_at).format("DD-MM-YYYY") }}
        </template>
        </v-data-table>
      </v-card>
      </v-col>

      <v-col cols="12" md="7" style="max-height:80vh; overflow:scroll">
        <v-simple-table class="pa-5">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Permissions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="permission in permissions"
          :key="permission.id"
        >
          <td>
            <v-checkbox class="pa-0"
            v-model="role_permission"
            :label="permission.slug"
            :value="permission.id"
            @change="attachDetachPermission(permission.id)"
          ></v-checkbox>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
      </v-col>
    </v-row>
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
// import ListViewTable from "../../components/common/ListViewTable.vue";
import PageTitle from "../../components/common/PageTitle.vue";
import ConfirmDialog from '../../components/dialogs/ConfirmDialog.vue';
import RoleCreateEditDialog from './RoleCreateEditDialog.vue';

export default {
  components: {PageTitle, RoleCreateEditDialog, ConfirmDialog},
  mounted() {
    this.$store.dispatch("role_permission/get_roles");
    this.$store.dispatch("role_permission/get_permissions");
  },
  computed: {
    roles() {
      return this.$store.getters["role_permission/roles"];
    },

    permissions() {
      return this.$store.getters["role_permission/permissions"];
    },
  },
  data() {
    return {
      role_permission: [],
      roleId: null,
      isEdit: false,
      item: null,
      showConfirmDialog : false,
      showRoleDialog: false,
      search: "",
      headers: [
        { text: "Name", value: "name" },
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
      this.showConfirmDialog = false;
    },
    onClick(item) {
        this.role_permission = [];
        this.roleId = item.id;
        item.permissions.map((element) => {
          this.role_permission.push(element.id)
        })
        console.log('now is', this.role_permission);
    },
    editItem(item) {
        console.log('===>', item);
      this.$store.commit('role_permission/SET_ROLE', item);
      this.isEdit = true;
      this.showRoleDialog = true;
    },
    deleteItem(item) {
      this.item = item;
      this.showConfirmDialog = true;
    },
    confirmDelete(){
      this.$store.dispatch('role_permission/delete_role', this.item.id)
      this.closeDialog();
    },
    attachDetachPermission(permissionId){
      this.$store.dispatch('role_permission/attach_permission', {roleId: this.roleId, permissionId: permissionId})
    }
  },
};
</script>

<style>
</style>