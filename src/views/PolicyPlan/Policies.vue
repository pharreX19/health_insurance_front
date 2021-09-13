<template>
<v-container>
    <policy-create-edit-dialog
      v-if="showPolicyCreateDialog"
      :dialog.sync="showPolicyCreateDialog"
      @closeDialog="closeDialog"
      :isEdit="isEdit"
    >
    </policy-create-edit-dialog>
    <page-title title="Policies"></page-title>
    <list-view-table
      :headers="headers"
      :items="policies"
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
        @click="createPolicy"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      
    </v-fab-transition>
  </v-container>
</template>

<script>
import ListViewTable from '../../components/common/ListViewTable.vue';
import PageTitle from "../../components/common/PageTitle.vue";
import PolicyCreateEditDialog from "./PolicyCreateEditDialog.vue";
export default {
  components: { PageTitle, PolicyCreateEditDialog, ListViewTable },
  mounted() {
    // this.$store.dispatch("policy/get_models", "policies?include=plans.services", true);
  },
  computed: {
    policies() {
      return this.$store.getters["policy/models"];
    },
  },
  data() {
    return {
      showPolicyCreateDialog: false,
      search: "",
      isEdit: false,
      headers: [
        { text: "Name", value: "name" },
        { text: "Policy no. format", value: "number_format"},
        { text: "Created at", value: "created_at" },
        { text: "Active Plans", value: "plans.length" },
        // { text: "Street", value: "street" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    createPolicy() {
      this.showPolicyCreateDialog = true;
    },
    closeDialog() {
      this.isEdit = false;
      this.showPolicyCreateDialog = false;
    },
    editItem(item){
      this.isEdit = true;
      this.showPolicyCreateDialog = true;
      this.$store.commit('policy/SET_MODEL', item);
    },
    deleteItem(item){
      this.$store.dispatch("policy/delete_model", {url: 'policies', id: item.id});
    },
    onClick(item){
      this.$store.commit('policy/SET_MODEL', item);
      this.$router.push({name: 'policy-view', params: {id: item.id}});
    },
    viewPolicy(id){
      this.$router.push({name: 'policy-view', params: {id: id}})
    }
  },
};
</script>

<style>
</style>