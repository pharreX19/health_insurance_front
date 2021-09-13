<template>
  <v-container>
    <limit-group-create-edit-dialog
      v-if="showLimitGroupDialog"
      :dialog.sync="showLimitGroupDialog"
      @closeDialog="closeDialog"
      :isEdit="isEdit"
    ></limit-group-create-edit-dialog>
    <page-title title="Services"></page-title>
    <list-view-table
      :headers="headers"
      :items="services"
      :search="search"
      @onClick="onClick"
      @editItem="editItem"
      @deleteItem="deleteItem"
    >
    </list-view-table>
    <v-fab-transition>
      <v-btn
        class="pa-8"
        color="cyan darken-3"
        dark
        bottom
        fixed
        right
        fab
        @click="createService"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script>
import ListViewTable from "../../components/common/ListViewTable.vue";
import PageTitle from "../../components/common/PageTitle.vue";
import LimitGroupCreateEditDialog from './LimitGroupCreateEditDialog.vue';

export default {
  components: { ListViewTable, PageTitle, LimitGroupCreateEditDialog },
  beforeMount() {
    this.$store.dispatch("serviceLimitGroup/get_service_limit_groups");
  },
  computed: {
    services() {
      return this.$store.getters["serviceLimitGroup/serviceLimitGroups"];
    },
  },
  data() {
    return {
      showLimitGroupDialog: false,
      isEdit: '',
      search: "",
      headers: [
        { text: "Name", value: "name" },
        { text: "Description", value: "description" },
        { text: "Created At", value: "created_at" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    createService(){
      this.isEdit = false;
      this.showLimitGroupDialog = true;
    },
    closeDialog(){
      this.isEdit = false;
      this.showLimitGroupDialog = false;
    },
    onClick() {},
    editItem(item) {
      this.$store.commit('serviceLimitGroup/SET_SERVICE_LIMIT_GROUP', item);
      this.isEdit = true;
      this.showLimitGroupDialog = true;
    },
    deleteItem(item) {
      // console.log(item);
      this.$store.dispatch('serviceLimitGroup/delete_service_limit_group', item.id);
    },
  },
};
</script>

<style>
</style>