<template>
  <v-card>
    <v-card-title>Subscription history</v-card-title>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Date</th>
            <th class="text-left">Plan</th>

            <th class="text-left">Amount</th>

            <th class="text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="subscription in subscriber.subscriptions"
            :key="subscription.id"
          >
            <td>
              {{ moment(subscription.begin_date).format("MMMM D, YYYY") }}
            </td>
            <td>{{ subscriber.plan.name }}</td>
            <td>MVR {{ subscriber.plan.premium }}/ year</td>
            <td v-if="subscription.is_active">
              <v-chip dark close-icon="mdi-close-outline" small color="green"
                >active</v-chip
              >
            </td>
            <td v-else>
              <v-chip dark close-icon="mdi-close-outline" small color="red"
                >inactive</v-chip
              >
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
export default {
  props: {
    subscriber: {
      required: true,
      type: Object,
    },
  },
};
</script>

<style>
</style>