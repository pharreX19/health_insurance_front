<template>
  <v-data-table
    :headers="headers"
    :items="services"
    item-key="service.item_id"
    :items-per-page="10"
    loading-text="Loading...please wait"
    class="elevation-0 row-pointer"
  >
  <template v-slot:item.pivot.created_at="{ item }">
    <span>{{ moment(item.pivot.create_at).format('DD-MM-YYYY hh:mm') }}</span>
  </template>
  </v-data-table>
    <!-- show-select
    @click:row="handleClick" -->
</template>

<script>
export default {
  props: {
    services: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.services.map((service, index) => {
      service.item_id = index + 1;
    });
  },
  data() {
    return {
      headers: [
        { text: "Service Provider", value: "service_provider" },
        { text: "Service", value: "name" },
        { text: "Activity at", value: "pivot.created_at" },
        { text: "Aasandha", value: "pivot.aasandha_covered_limit" },
        { text: "Insurance", value: "pivot.insurance_covered_limit" },
        { text: "Self", value: "pivot.self_covered_limit" },
      ],
    };
  },
  methods: {
    handleClick() {},
  },
};
</script>

<style>
</style>