<template>
  <v-container fluid>
    <page-title title="Wola, Let's know what to do" alignment="text-center" subtitle="Please tap on an option you prefer"></page-title>
    <v-row align="center" justify="center" style="height:60vh">
      <v-col cols="12" class="d-flex justify-center">
        <card-buttons
          title="New"
          subtitle="Create a subscription"
          image="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          :handleClick="createSubscription"
        ></card-buttons>

        <div class="px-4">
          <card-buttons
          title="Renew"
          subtitle="Renew an existing subscription"
          image="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          :handleClick="renewSubscription"
        ></card-buttons>
        </div>

        <card-buttons
          title="View"
          subtitle="View an existing subscription"
          image="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          :handleClick="viewSubscription"
        ></card-buttons>

        <div class="px-4">
          <card-buttons
          title="Request Service"
          subtitle="Request for a service"
          image="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          :handleClick="requestService"
        ></card-buttons>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PageTitle from '../../components/common/PageTitle.vue';
import CardButtons from "./components/CardButtons.vue";
export default {
  components: { CardButtons, PageTitle },
  data: () => ({
    search_value: "",
  }),

  methods: {
    createSubscription: function(){
      this.$router.push({name: 'subscription-policy-select'});
    },
    renewSubscription: function(){
      this.$router.push({name: 'subscriber-search', params: {type: 'edit'}});
    },
    viewSubscription: function(){
      this.$router.push({name: 'subscriber-search', params: {type: 'view'}});
    },
    requestService: function(){
      this.$router.push({name: 'subscriber-search', params: {type: 'service'}});
    }
  },
};
</script>

<style>
</style>