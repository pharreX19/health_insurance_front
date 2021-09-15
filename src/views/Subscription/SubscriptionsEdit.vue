<template>
  <v-container>
   
    <v-row justify="center" align="center">
      <v-col cols="12" align-self="center">
        <v-list-item two-line class="text-center">
          <v-list-item-content>
            <v-list-item-title>
              <p class="text-h4 font-weight-light mx-auto">Subscription</p>
            </v-list-item-title>
            <v-list-item-subtitle
              class="text-subtitle-1 font-weight-light mx-auto"
              >Upgrade you insurance plan or <strong>Continue</strong> with your
              existing plan.
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <current-plan :subscriber="subscriber"></current-plan>
      </v-col>
      <v-col cols="12" md="6">
        <new-plan :policies="policies" :plans="plans" :subscriber="subscriber" @getSubscriber="getSubscriber"></new-plan>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <subscription-history :subscriber="subscriber"></subscription-history>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import moment from "moment";
// import SubscriptionPaymentMethodDialog from "../../components/dialogs/SubscriptionPaymentMethodDialog.vue";
import CurrentPlan from '../../components/SubscriptionsRenew/CurrentPlan.vue';
import NewPlan from '../../components/SubscriptionsRenew/NewPlan.vue';
import SubscriptionHistory from '../../components/SubscriptionsRenew/SubscriptionHistory.vue';
export default {
  components: {CurrentPlan, NewPlan, SubscriptionHistory },
  created() {
    // if(!this.$store.getters['policy/policies']){
    this.$store.dispatch("policy/get_models", "policies?include=plans" );
    // }
    this.getSubscriber();
  },
  computed: {
    policies() {
      if (this.plans.length === 0) {
        this.$store.getters["policy/models"].map((policy) => {
          this.plans.push(policy.plans);
        });
      }
      return this.$store.getters["policy/models"];
    },
    subscriber() {
      return this.$store.getters["subscriber/model"];
    },
  },

  data: () => ({
    model: 0,
    plans: [],
    // policy: null,
    // plan: null,
    // new_subscription: {
    //   begin_date: moment().format("YYYY-MM-DD"),
    //   plan_id: "",
    //   subscriber_id: "",
    //   payment_method: "",
    // },
    policy_plans: [],
  }),

  methods: {
   

    getSubscriber() {
      this.$store.dispatch("subscriber/get_model", `subscribers/${this.$route.params.id}?include=subscriptions,plan`);
    },

    

    // selectPlan(plan){
    //   this.new_subscription = plan;
    //   this.new_subscription.plan_id = this.new_subscription.id;
    //   this.new_subscription.begin_date = moment().format('YYYY-MM-DD')
    // },


    

    

    deleteSubscription() {
      this.$store.dispatch(
        "subscription/delete_subscription",
        this.subscriber.subscriptions[0].id
      );
    },
  },
};
</script>

<style scoped>


.theme--dark.v-btn.v-btn--icon {
  color: #a71b1b !important;
}

.v-carousel__controls {
  background: rgb(23, 207, 106) !important;
}

.v-btn .v-btn__content .v-icon {
  color: rgb(194, 32, 32);
}
/* .mdi-circle::before{
  color: grey;
} */
/* .v-carousel__controls {
  background: rgba(255, 255, 255, 1) !important;
} */
</style>