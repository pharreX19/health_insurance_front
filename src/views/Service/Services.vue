<template>
  <v-container>
    <service-create-edit-dialog
      v-if="showServiceDialog"
      :dialog.sync="showServiceDialog"
      @closeDialog="closeDialog"
      :isEdit="isEdit"
    >
    </service-create-edit-dialog>
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
        class="pa-8 mb-10"
        color="cyan darken-3"
        dark
        bottom
        absolute
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
import ServiceCreateEditDialog from './ServiceCreateEditDialog.vue';

export default {
  components: { ListViewTable, PageTitle, ServiceCreateEditDialog },
  beforeMount() {
    this.$store.dispatch("service/get_services");
  },
  computed: {
    services() {
      return this.$store.getters["service/services"];
    },
  },
  data() {
    return {
      showServiceDialog: false,
      isEdit: '',
      search: "",
      headers: [
        { text: "Name", value: "name" },
        { text: "Description", value: "description" },
        { text: "Service Type", value: "service_type.name" },
        { text: "Limit group", value: "service_limit_group.name" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    createService(){
      this.isEdit = false;
      this.showServiceDialog = true;
    },
    closeDialog(){
      this.isEdit = false;
      this.showServiceDialog = false;
    },
    onClick() {},
    editItem(item) {
      this.$store.commit('service/SET_SERVICE', item);
      this.isEdit = true;
      this.showServiceDialog = true;
    },
    deleteItem(item) {
      // console.log(item);
      this.$store.dispatch('service/delete_service', item.id);
    },
  },
};
</script>

<style>
</style>