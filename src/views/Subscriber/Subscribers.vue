<template>
  <v-container>
    <!-- <company-create-edit-dialog
      v-if="showCompanyDialog"
      :dialog.sync="showCompanyDialog"
      @closeDialog="closeDialog"
      :isEdit="isEdit"
    >
    </company-create-edit-dialog> -->
    <subscriber-create-edit-dialog
      v-if="showSubscriberDialog"
      :dialog.sync="showSubscriberDialog"
      @closeDialog="closeDialog"
    ></subscriber-create-edit-dialog>

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
    
  </v-container>
</template>

<script>
import ListViewTable from "../../components/common/ListViewTable.vue";
import PageTitle from "../../components/common/PageTitle.vue";
import SubscriberCreateEditDialog from './SubscriberCreateEditDialog.vue';

export default {
  components: { ListViewTable, PageTitle, SubscriberCreateEditDialog },
  mounted() {
    this.$store.dispatch("subscriber/get_subscribers");
  },
  computed: {
    companies() {
      return this.$store.getters["subscriber/subscribers"];
    },
  },
  data() {
    return {
      showSubscriberDialog: false,
      search: "",
      headers: [
        { text: "Policy no.", value: "policy_number" },
        { text: "Name", value: "name" },
        { text: "Country", value: "country" },
        { text: "National ID", value: "national_id"},
        { text: "Passport", value: "passport" },
        { text: "Work Permit", value: "work_permit" },
        { text: "Contact", value: "contact" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    createCompany(){
      this.showSubscriberDialog = true;
      this.isEdit = false;
    },
    closeDialog(){
      this.showSubscriberDialog = false;
    },
    onClick() {},
    editItem(item) {
      this.$store.commit('subscriber/SET_SUBSCRIBER', item);
      this.isEdit = true;
      this.showSubscriberDialog = true;
    },
    deleteItem(item) {
      this.$store.dispatch('company/delete_company', item.id)
    },
  },
};
</script>

<style>
</style>