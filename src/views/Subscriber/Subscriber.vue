<template>
  <v-container>
    <!-- <page-title title="View Subscriber"></page-title> -->
    <v-row>
      <v-col cols="12" md="4">
        <subscriber-details :subscriber="subscriber"></subscriber-details> 
      </v-col>

      <v-col cols="12" md="4">
        <subscriber-policy :subscriber="subscriber"></subscriber-policy>
      </v-col>
      <v-col cols="12" md="4">
        <subscriber-policy-usage :subscriber="subscriber" style="height:83%"></subscriber-policy-usage>
      </v-col>
    </v-row>
    <v-row class="mt-0">
      <v-col>
        <v-card>
          <v-card-title class="text-h5 font-weight-light ml-3">
            Episodes
          </v-card-title>
          <v-data-table  class="pa-5"
        :headers="headers"
        :items="subscriber.episodes"
        :search="search"
        show-expand
        :single-expand="singleExpand"
        :expanded.sync="expanded"
      >

        <template v-slot:item.total_amount="{ item }">
          MVR {{ getEpisodeTotalAmt(item) }}
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
                <!-- <v-col>Action</v-col> -->
              </v-row>
              <v-row v-for="service in item.services" :key="service.id">
                <v-col>{{ service.name }}</v-col>
                <v-col>{{ service.pivot.insurance_covered_limit }}</v-col>
                <v-col>{{ service.pivot.aasandha_covered_limit }}</v-col>
                <v-col>{{ service.pivot.self_covered_limit }}</v-col>
                <!-- <v-col> -->
                  <!-- <v-icon small @click="deleteItem(service)"> mdi-delete </v-icon> -->
                <!-- </v-col> -->
              </v-row>
            </template>
          </td>
        </template>
      </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import PageTitle from '../../components/common/PageTitle.vue';
import SubscriberDetails from '../../components/common/SubscriberDetails.vue';
import SubscriberPolicy from '../../components/SubscriberPolicy.vue';
import SubscriberPolicyUsage from '../../components/SubscriberPolicyUsage.vue';
// import ListViewTable from "../../components/common/ListViewTable.vue";

// import SubscriberSummary from './SubscriberSummary.vue';
// import SubscriberServices from "./SubscriberServices.vue";
export default {
  components: { SubscriberDetails, SubscriberPolicy, SubscriberPolicyUsage },
  // components: { SubscriberServices },

  mounted() {
    this.$store.dispatch("subscriber/get_model", `subscribers/${this.$route.params.id}?include=plan,subscriptions,company,episodes.services,episodes.serviceProvider,subscriptions`);
  },
  computed: {
    subscriber() {
      return this.$store.getters["subscriber/model"];
    },
    services(){
      let services = [];
      this.subscriber.episodes.forEach(episode => {
        episode.services.map((service) => service.service_provider = episode.service_provider.name);
        services.push(...episode.services);
      });
    return services;
    }
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
        { text: "Activity at", value: "activity_at" },
        { text: "", value: "data-table-expand" },
      ],
      tab: null,
      items: ["services"],
    };
  },
  methods: {
    getEpisodeTotalAmt(services) {
        let total = 0;
      console.log("====>", services);
    //   services.services.forEach((service) => {
        //   total += 1;
          total = services.services.reduce((a, b) => { 
              return parseFloat(a) + parseFloat(b.pivot.insurance_covered_limit) + parseFloat(b.pivot.aasandha_covered_limit) + parseFloat(b.pivot.self_covered_limit);
          }, 0);//service.pivot.insurance_covered_limit);
    //   });
      return total ; //total;
    //   return services.reduce((acc, service) => {
        // return acc + service.pivot.insurance_covered_limit;
    //   }, 0);
    //   console.log("====> ", total);
    },
    editItem(){},
    deleteItem(){},
    onClick(){}
  }
};
</script>

<style>
</style>