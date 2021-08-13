<template>
  <v-container>
    <subscription-payment-method-dialog
      v-if="showPaymentDialog"
      :dialog.sync="showPaymentDialog"
      @closeDialog="closeDialog"
      @confirmRenewal="confirmRenewal"
    >
    </subscription-payment-method-dialog>
    <v-card height="490">
      <v-card-title class="text-h6 font-weight-light pa-5">
        Change Plan
        <v-spacer></v-spacer>
        <span v-if="plan">MVR {{ plan.premium }} / year</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="mt-2">
        <v-select
          class="px-2"
          :items="policies"
          outlined
          return-object
          item-text="name"
          v-model="policy"
          label="Choose Policy"
        >
        </v-select>

        <v-select
          class="px-2"
          :items="policy_plans"
          outlined
          item-text="name"
          return-object
          label="Choose Plan"
          v-model="plan"
        >
        </v-select>

        <v-row class="px-3 mt-1">
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                class="px-2"
                v-model="new_subscription.begin_date"
                label="Effective from"
                outlined
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="new_subscription.begin_date"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
        </v-row>

        <v-list-item two-line class="text-left">
          <v-list-item-content>
            <v-list-item-title>{{
              moment(this.new_subscription.begin_date)
                .add(1, "year")
                .format("MMMM D, YYYY")
            }}</v-list-item-title>
            <v-list-item-subtitle
              class="text-subtitle-1 font-weight-light mx-auto"
              >Expiry date</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-card-text>
      <v-card-actions>
        <v-row justify="end" class="pa-5 pt-0">
          <v-btn
            :disabled="!isSubscriptionExpired() || plan == null"
            class="px-auto white--text"
            tile
            depressed
            large
            color="cyan darken-5"
            height="48px"
            width="160px"
            @click="toPaymentMethods"
          >
            Continue
          </v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>


import moment from "moment";
import SubscriptionPaymentMethodDialog from "../dialogs/SubscriptionPaymentMethodDialog.vue";
export default {
  components: { SubscriptionPaymentMethodDialog },
  props: {
    policies: {
      type: Array,
      required: true,
    },
    plans: {
      type: Array,
      required: true,
    },
    subscriber: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showPaymentDialog: false,
      policy_plans: [],
      plan: null,
      policy: null,
      menu2: false,

      new_subscription: {
        begin_date: moment().format("YYYY-MM-DD"),
        plan_id: "",
        subscriber_id: "",
        payment_method: "",
      },
    };
  },
  watch: {
    policy() {
      this.policy_plans = [];
      // let selectedPolicyIndex = isNaN(this.policy-1) ? 0 : this.policy-1
      // console.log(this.policies.find((policy) => policy.id == 1));
      let selectedPolicyIndex = this.policies.indexOf(this.policy);
      this.policy_plans.push(...this.plans[selectedPolicyIndex]);
    },
    policies() {
      if (!this.policy) {
        this.policy = this.policies[0];
      }
    },
  },
  methods: {
    closeDialog() {
      this.showPaymentDialog = false;
    },

    confirmRenewal(value) {
      this.new_subscription.payment_method = value;
      this.closeDialog();
      this.renewSubscription();
    },

    renewSubscription() {
      this.new_subscription.subscriber_id = this.subscriber.id;
      this.new_subscription.plan_id = this.plan.id;
      // if(!Object.getOwnPropertyDescriptor(this.new_subscription, 'plan_id')){
      //   this.new_subscription.plan_id = this.subscriber.plan.id
      // }

      // if(!Object.getOwnPropertyDescriptor(this.new_subscription, 'subscriber_id')){
      //   this.new_subscription.subscriber_id = this.subscriber.id
      // }
      this.$store
        .dispatch("subscription/update_subscription", {
          id: this.subscriber.subscriptions[0].id,
          data: this.new_subscription,
        })
        .then(() => {
          this.$emit('getSubscriber');
        });
    },

    isSubscriptionExpired() {
      return (
        this.subscriber.subscriptions &&
        moment(this.subscriber.subscriptions[0].expiry_date).format(
          "YYYY-MM-DD"
        ) < moment().format("YYYY-MM-DD")
      );
    },
    toPaymentMethods() {
      this.showPaymentDialog = true;
    },
  },
};
</script>

<style>
</style>