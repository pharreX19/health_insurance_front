<template>
  <v-card class="pa-3" style="height: 93%">
    <!-- <v-sheet
            class="v-sheet--offset mx-auto"
            color="cyan"
            elevation="12"
            max-width="30px"
          >
            <v-sparkline
              color="white"
              line-width="2"
              padding="16"
            ></v-sparkline>
          </v-sheet> -->

    <v-card-text class="pt-0">
      <div class="text-h6 font-weight-regular mb-2">
        {{ subscriber.plan.name }}
      </div>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            class="text-body-2 font-weight-bold"
            :class="[
              subscriber.subscriptions[0].plan_remaining > 0
                ? 'green--text'
                : 'red--text',
            ]"
          >
            MVR
            {{ subscriber.subscriptions[0].plan_remaining }}</v-list-item-title
          >
          <v-list-item-subtitle class="subheading font-weight-light grey--text"
            >Plan Remaining</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-body-2 font-weight-light">
            MVR {{ subscriber.plan.limit_total }}</v-list-item-title
          >
          <v-list-item-subtitle class="subheading font-weight-light grey--text"
            >Plan limit</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-body-2 font-weight-light">
            {{
              moment(subscriber.subscriptions[0].expiry_date).format(
                "MM-DD-YYYY"
              )
            }}
          </v-list-item-title>
          <v-list-item-subtitle class="subheading font-weight-light grey--text"
            >Expiry date</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
    </v-card-text>
  </v-card>
</template>

<script>
// import moment from "moment";
export default {
  props: {
    subscriber: {
      type: Object,
      required: true,
    },
  },
  methods: {
    
  },
};
</script>

<style>
</style>