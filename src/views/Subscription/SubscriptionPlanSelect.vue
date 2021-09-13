<template>
  <v-container>
    <page-title
      title="Let's create a new policy"
      subtitle="Please tap on an option you prefer"
    ></page-title>
    <v-row align="center" justify="center">
      <template v-if="policy.plans.length > 0">
        <v-col cols="10" v-for="plan in policy.plans" :key="plan.id">
        <plan-card :plan="plan" @selectPlan="selectPlan(plan)"></plan-card>
      </v-col>
      </template>
      <template v-else>
        <v-row align="center" style="height:60vh" justify="center">
          <v-col>
            <p class="text-h5 font-weight-light grey--text text-center">No active plans found for this policy</p>
          </v-col>
        </v-row>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import PageTitle from "../../components/common/PageTitle.vue";
import { store } from "../../store";
import PlanCard from "./components/PlanCard.vue";
export default {
  components: { PageTitle, PlanCard },
  mounted() {
    this.$store.dispatch("policy/get_model", `policies/${this.$route.params.id}?include=plans`);
  },
  computed: {
    policy() {
      return this.$store.getters["policy/model"];
    },
  },
  watch: {
    policy(){
      if(this.policy.plans.length === 1){ 
        this.selectPlan(this.policy.plans[0]);
      }
    }
  },
  methods: {
    selectPlan(plan) {
      store.commit("policy/SET_PLAN", plan);
      this.$router.push({ name: "subscriptions-create" });
    },
  },
};
</script>

<style>
</style>