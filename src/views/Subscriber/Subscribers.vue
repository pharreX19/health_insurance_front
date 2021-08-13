<template>
  <main class="mx-5 mt-5">
    <list-view-header @search= "onSearch" title="Subscribers"></list-view-header>
    <list-view-table :headers="headers" :items="service_providers" :search="search" @onClick ="onClick"> 
      <!-- <list-view-sidebar :item="item" :view="goToViewPage"></list-view-sidebar> -->
    </list-view-table>
    <create-edit-dialog></create-edit-dialog>
  </main>
</template>

<script>
import ListViewHeader from '../../components/common/ListViewHeader.vue';
// import ListViewSidebar from '../../components/common/ListViewSidebar.vue';
import ListViewTable from '../../components/common/ListViewTable.vue';
import CreateEditDialog from "./SubscriberCreateEditDialog.vue";
export default {
  components: { CreateEditDialog, ListViewTable, ListViewHeader},// ListViewSidebar },
  mounted: function(){
    this.item = this.service_providers[0];
  },
  data() {
    return {
      search: "",
      item: {},
      headers: [
        { text: "Name", value: "name" },
        { text: "National ID", value: "national_id" },
        { text: "Passport", value: "passport" },
        { text: "Work permit", value: "workpermit" },
        { text: "Policy Status", value: "status" },

      ],
      service_providers: [
        {
          id: 1,
          name: "John Doe",
          contact: "+9609999999",
          joined_at: "October 20, 1990",
          passport: "AB872125S",
          workpermit: "WP120-1212",
          national_id: "REG-2021-2010",
          subscription: "Expat Policy",
          status: "on-going"
        },

        {
          id: 2,
          name: "Jane Doe",
          contact: "+9607654321",
          joined_at: "July 20, 1990",
          passport: "PA124310A",
          workpermit: "",
          national_id: "REG-2021-2010",
          subscription: "Expat Policy",
          status: "expired"
        },

        {
          id: 3,
          name: "Peter Jan",
          contact: "+960777777",
          joined_at: "March 20, 1990",
          passport: "AP109212A1",
          workpermit: "WP990-2021",
          national_id: "REG-2021-2010",
          subscription: "",
          status: "on-going"
        },
      ],
    };
  },
  methods: {
    view_company(value) {
      this.$router.push({
        name: "company",
        params: { id: value },
      });
    },
    onSearch: function(value){
      this.search = value;
    },
    onClick: function(value){
      this.item = value;
    },
    goToViewPage: function(){
      this.$router.push({
        name: "subscriber", params: {"id": this.item.id}
      })
    }
  },
};
</script>

<style scoped>

</style>