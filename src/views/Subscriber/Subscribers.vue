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

    <page-title title="Subscribers"></page-title>
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
    // this.$store.dispatch("subscriber/get_models", 'subscribers');
  },
  computed: {
    companies() {
      return this.$store.getters["subscriber/models"];
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
    // createCompany(){
    //   this.showSubscriberDialog = true;
    //   this.isEdit = false;
    // },
    closeDialog(){
      this.showSubscriberDialog = false;
    },
    onClick(item) {
      this.$router.push({name: 'subscriber', params: {id: item.id}});
    },
    editItem(item) {
      this.$store.commit('subscriber/SET_MODEL', item);
      this.isEdit = true;
      this.showSubscriberDialog = true;
    },
    deleteItem(item) {
      this.$store.dispatch('subscriber/delete_model', {url: 'subscribers', id: item.id})
    },
  },
};
</script>

<style>
</style>