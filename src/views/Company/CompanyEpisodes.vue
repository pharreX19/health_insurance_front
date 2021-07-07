<template>
  <v-data-table
    :headers="headers"
    :items="services"
    :items-per-page="10"
    loading-text="Loading...please wait"
    class="elevation-0 row-pointer"
    show-select
    @click:row="handleClick"
  >
  </v-data-table>
</template>

<script>
export default {
    data(){
        return {
            headers: [
        { text: "Subscriber", value: "subscriber" },
        { text: "Service Provider", value: "service_provider" },
        { text: "Service", value: "service" },
        { text: "Activity at", value: "activity_at" },
      ],
      services: [
        {
          id: 1,
          subscriber: "ABC Company",
          service_provider: "ADK Hospital",
          service: "Service One",
          activity_at: "20 May, 2021",
        },

        {
          id: 2,
          subscriber: "XYZ Company",
          service_provider: "ADK Hospital",
          service: "Service One",
          activity_at: "20 October, 2021",
        },

        {
          id: 3,
          subscriber: "One Company",
          service_provider: "IGMH",
          service: "Service One",
          activity_at: "20 June, 2021",
        },
      ],
        }
    }
};
</script>

<style>
</style>