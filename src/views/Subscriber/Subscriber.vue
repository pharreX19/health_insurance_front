<template>
  <v-container fluid>
    <!-- <page-title title="View Subscriber"></page-title> -->
    <v-row>
      <v-col cols="12" md="4">
        <subscriber-details :subscriber="subscriber"></subscriber-details> 
      </v-col>

      <v-col cols="12" md="4">
        <subscriber-policy :subscriber="subscriber"></subscriber-policy>
      </v-col>
      <v-col cols="12" md="4">
        <subscriber-policy-usage style="height:92%"></subscriber-policy-usage>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import PageTitle from '../../components/common/PageTitle.vue';
import SubscriberDetails from '../../components/common/SubscriberDetails.vue';
import SubscriberPolicy from '../../components/SubscriberPolicy.vue';
import SubscriberPolicyUsage from '../../components/SubscriberPolicyUsage.vue';
// import SubscriberSummary from './SubscriberSummary.vue';
// import SubscriberServices from "./SubscriberServices.vue";
export default {
  components: { SubscriberDetails, SubscriberPolicy, SubscriberPolicyUsage },
  // components: { SubscriberServices },

  mounted() {
    this.$store.dispatch("subscriber/get_subscriber", {id: this.$route.params.id, includes: 'plan,subscriptions,company,episodes.services,episodes.serviceProvider,subscriptions'});
  },
  computed: {
    subscriber() {
      return this.$store.getters["subscriber/subscriber"];
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
      tab: null,
      items: ["services"],
    };
  },
};
</script>

<style>
</style>