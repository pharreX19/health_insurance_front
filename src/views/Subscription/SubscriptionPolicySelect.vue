<template>
  <v-container>
    <page-title title="Choose a policy"></page-title>
    <v-row style="height: 60vh" justify="center" align="center">
      <v-col cols="12" md="4" v-for="policy in policies" :key="policy.id">
        <policy-card @selectPolicy='selectPolicy(policy)' :policy="policy"></policy-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PageTitle from "../../components/common/PageTitle.vue";
import PolicyCard from './components/PolicyCard.vue';
export default {
  components: { PageTitle, PolicyCard },

  mounted() {
    this.$store.dispatch("policy/get_policies", true);
  },
  computed: {
    policies() {
      return this.$store.getters["policy/policies"];
    },
  },
  data() {
    return {
      policy: {},
    };
  },
  methods: {
    selectPolicy(policy) {
      this.policy = policy;
      this.$router.push({
        name: "subscription-plan-select",
        params: { id: this.policy.id },
      });
    },
  },
};
</script>

<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>