<template>
  <v-container>
    <policy-plan-create-edit-dialog
      v-if="showPolicyCreateDialog"
      :dialog.sync="showPolicyCreateDialog"
      @closeDialog="closeDialog"
      :isEdit="isEdit"
    >
    </policy-plan-create-edit-dialog>
    <page-title title="Policy plans"></page-title>
    <list-view-table
      :headers="headers"
      :items="plans.plans"
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
import ListViewTable from "../../components/common/ListViewTable.vue";
import PageTitle from "../../components/common/PageTitle.vue";
import PolicyPlanCreateEditDialog from "./PolicyPlanCreateEditDialog.vue";
export default {
  components: { PageTitle, PolicyPlanCreateEditDialog, ListViewTable },

  computed: {
    plans() {
      return this.$store.getters["plan/models"];
    },
  },
  data() {
    return {
      showPolicyCreateDialog: false,
      search: "",
      isEdit: false,
      headers: [
        { text: "Name", value: "name" },
        { text: "Limit total", value: "limit_total" },
        { text: "Premium", value: "premium" },
        { text: "Created at", value: "created_at" },
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
    editItem(item) {
      this.isEdit = true;
      this.showPolicyCreateDialog = true;
      this.$store.commit("policy/SET_MODEL", item);
    },
    deleteItem(item) {
      this.$store.dispatch("policy/delete_model", {
        url: "policies",
        id: item.id,
      });
    },
    onClick(item) {
      this.$store.commit("policy/SET_MODEL", item);
      this.$router.push({ name: "policy-view", params: { id: item.id } });
    },
    viewPolicy(id) {
      this.$router.push({ name: "policy-view", params: { id: id } });
    },
  },
};
</script>

<style>
</style>