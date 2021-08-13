<template>
  <v-container>
    <page-title title="Episodes"></page-title>
    <v-card flat class="pa-5">
      <v-card-title class="pb-10">
        <!-- <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field> -->
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="episodes"
        :search="search"
        show-expand
        show-select
        :single-expand="singleExpand"
        :expanded.sync="expanded"
      >

        <template v-slot:item.total_amount="{ item }">
          {{ getEpisodeTotalAmt(item) }}
        </template>

        <template v-slot:item.created_at="{ item }">
          {{ moment(item.created_at).format("MMMM D, YYYY") }}
        </template>

        <template v-slot:no-data>
          <h3>There are no services in this episode.</h3>
        </template>

        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length" class="pa-5 text-center" style="background: #d3d3d326">
            <template>
              <v-row class="font-weight-bold">
                <v-col>Service</v-col>
                <v-col>Insurance</v-col>
                <v-col>Aasandha</v-col>
                <v-col>Self</v-col>
                <v-col>Action</v-col>
              </v-row>
              <v-row v-for="service in item.services" :key="service.created_at">
                <v-col>{{ service.name }}</v-col>
                <v-col>{{ service.pivot.insurance_covered_limit }}</v-col>
                <v-col>{{ service.pivot.aasandha_covered_limit }}</v-col>
                <v-col>{{ service.pivot.self_covered_limit }}</v-col>
                <v-col>
                  <v-icon small @click="deleteItem(service)"> mdi-delete </v-icon>
                </v-col>
              </v-row>
            </template>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import PageTitle from "../../components/common/PageTitle.vue";
export default {
  components: { PageTitle },
  mounted() {
    this.$store.dispatch("episode/get_episodes");
  },
  computed: {
    episodes() {
      return this.$store.getters["episode/episodes"];
    },
  },
  data() {
    return {
      expanded: [],
      singleExpand: false,
      selected: [],
      search: "",
      headers: [
        {
          text: "Service Provider",
          align: "start",
          sortable: false,
          value: "service_provider.name",
        },
        { text: "Memo number", value: "memo_number" },
        { text: "Total amount", value: "total_amount" },
        { text: "Status", value: "status" },
        { text: "Created at", value: "created_at" },
        { text: "", value: "data-table-expand" },
      ],
    };
  },
  methods: {
      sumField() {
        // sum data in give key (property)
        return 100;
    },
    getEpisodeTotalAmt(services) {
        let total = 0;
      console.log("====> ");
    //   services.services.forEach((service) => {
        //   total += 1;
          console.log(services.services.reduce((a, b) => { 
              return a + b.pivot.insurance_covered_limit;
          }, 0));//service.pivot.insurance_covered_limit);
    //   });
      return total;
    //   return services.reduce((acc, service) => {
        // return acc + service.pivot.insurance_covered_limit;
    //   }, 0);
    //   console.log("====> ", total);
    },
    deleteItem(item){
        console.log('Delete', item);
        this.$store.dispatch('episode_service/remove_service_from_episode', item.pivot.id);
    }
  },
};
</script>

<style>
</style>