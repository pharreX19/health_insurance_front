<template>
  <v-container>
    <service-provider-create-edit-dialog
      v-if="showProviderDialog"
      :dialog.sync="showProviderDialog"
      @closeDialog="closeDialog"
      :isEdit="isEdit"
    >
    </service-provider-create-edit-dialog>
    <page-title title="Service Providers"></page-title>
    <list-view-table
      :headers="headers"
      :items="service_providers"
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
        @click="createProvider"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script>
import ListViewTable from "../../components/common/ListViewTable.vue";
import PageTitle from "../../components/common/PageTitle.vue";
import ServiceProviderCreateEditDialog from "../../views/ServiceProviders/ServiceProviderCreateEditDialog.vue";

export default {
  components: { ListViewTable, PageTitle, ServiceProviderCreateEditDialog },
  mounted() {
    this.$store.dispatch("service_provider/get_service_providers");
  },
  computed: {
    service_providers() {
      return this.$store.getters["service_provider/serviceProviders"];
    },
  },
  data() {
    return {
      isEdit: false,
      showProviderDialog: false,
      search: "",
      headers: [
        { text: "Name", value: "name" },
        { text: "Contact", value: "contact" },
        { text: "Address", value: "address" },
        { text: "Street", value: "street" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    createProvider(){
      this.showProviderDialog = true;
      this.isEdit = false;
    },
    closeDialog(){
      this.showProviderDialog = false;
    },
    onClick() {},
    editItem(item) {
      this.$store.commit('service_provider/SET_SERVICE_PROVIDER', item);
      this.isEdit = true;
      this.showProviderDialog = true;
    },
    deleteItem(item) {
      this.$store.dispatch('service_provider/delete_service_providers', item.id)
    },
  },
};
</script>

<style>
</style>