<template>
  <v-container>
    <company-create-edit-dialog
      v-if="showCompanyDialog"
      :dialog.sync="showCompanyDialog"
      @closeDialog="closeDialog"
      :isEdit="isEdit"
    >
    </company-create-edit-dialog>
    <page-title title="Companies"></page-title>
    <list-view-table
      :headers="headers"
      :items="companies"
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
        @click="createCompany"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      
    </v-fab-transition>
  </v-container>
</template>

<script>
import ListViewTable from "../../components/common/ListViewTable.vue";
import PageTitle from "../../components/common/PageTitle.vue";
import CompanyCreateEditDialog from './CompanyCreateEditDialog.vue';

export default {
  components: { ListViewTable, PageTitle, CompanyCreateEditDialog },
  mounted() {
    this.$store.dispatch("company/get_companies");
  },
  computed: {
    companies() {
      return this.$store.getters["company/companies"];
    },
  },
  data() {
    return {
      isEdit: false,
      showCompanyDialog: false,
      search: "",
      headers: [
        { text: "Name", value: "name" },
        { text: "Registration", value: "registration"},
        { text: "Contact", value: "contact" },
        { text: "Address", value: "address" },
        { text: "Street", value: "street" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    createCompany(){
      this.showCompanyDialog = true;
      this.isEdit = false;
    },
    closeDialog(){
      this.showCompanyDialog = false;
    },
    onClick() {},
    editItem(item) {
      this.$store.commit('company/SET_COMPANY', item);
      this.isEdit = true;
      this.showCompanyDialog = true;
    },
    deleteItem(item) {
      this.$store.dispatch('company/delete_company', item.id)
    },
  },
};
</script>

<style>
</style>