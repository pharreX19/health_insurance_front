<template>
  <v-container>
      <v-card height="490">
    <v-card-title class="text-h6 font-weight-light pa-5"
      >Current Plan
      <v-spacer></v-spacer>
      MVR {{ subscriber.plan.premium }} / year
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-list-item two-line class="text-left">
        <v-list-item-content>
          <v-list-item-title> {{ subscriber.name }}</v-list-item-title>
          <v-list-item-subtitle
            class="text-subtitle-1 font-weight-light mx-auto"
            >Subscriber</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line class="text-left">
        <v-list-item-content>
          <v-list-item-title> {{ subscriber.policy_number }}</v-list-item-title>
          <v-list-item-subtitle
            class="text-subtitle-1 font-weight-light mx-auto"
            >Policy ID</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line class="text-left">
        <v-list-item-content>
          <v-list-item-title> {{ subscriber.plan.name }}</v-list-item-title>
          <v-list-item-subtitle
            class="text-subtitle-1 font-weight-light mx-auto"
            >Plan</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line class="text-left mb-2">
        <v-list-item-content>
          <v-list-item-title :class="[isSubscriptionExpired() ? 'isExpired' : 'isNotExpired']">{{
            moment(subscriber.subscriptions[0].expiry_date).format(
              "MMMM D, YYYY"
            )
          }}</v-list-item-title>
          <v-list-item-subtitle
            class="text-subtitle-1 font-weight-light mx-auto"
            >Expiry date</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line class="text-left">
        <v-list-item-content>
          <v-list-item-title
            >MVR
            {{ subscriber.subscriptions[0].plan_remaining }}</v-list-item-title
          >
          <v-list-item-subtitle
            class="text-subtitle-1 font-weight-light mx-auto"
            >Plan remaining</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-spacer></v-spacer>
        <small
          class="font-weight-bold"
          :class="[isSubscriptionExpired() ? 'isExpired' : 'isNotExpired']"
        >
          <i>Due {{ dueIn() }}</i></small
        >
      </v-list-item>
    </v-card-text>
  </v-card>
  </v-container>
</template>

<script>
import moment from "moment";
export default {
  props: {
    subscriber: {
      required: true,
      type: Object,
    },
  },
  methods: {
    isSubscriptionExpired() {
      return (
        moment(this.subscriber.subscriptions[0].expiry_date).format(
          "YYYY-MM-DD"
        ) < moment().format("YYYY-MM-DD")
      );
    },
     dueIn() {
      return moment(
        this.subscriber.subscriptions[0].expiry_date,
        "YYYY-MM-DD"
      ).fromNow();
    },
  },
};
</script>

<style scoped>
.isExpired {
  color: red;
}

.isNotExpired {
  color: green;
}
</style>