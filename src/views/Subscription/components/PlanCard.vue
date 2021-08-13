<template>
  <v-card
    flat
    class="pa-8"
    style="cursor: pointer"
    @mouseover="is_active = !is_active"
    @mouseout="is_active = !is_active"
    :elevation="is_active ? 1 : 0"
    @click="hanldeClick(plan)"
  >
    <v-row>
      <v-col class="font-weight-light text-h6">
        {{ plan.name }}
      </v-col>

      <v-col class="font-weight-light text-h6">
        <span class="font-weight-light text-body-1">starts from MVR</span>
        {{ plan.premium }}
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    plan: {
      type: Object,
      required: true,
    },
  },
    data() {
    return {
      is_active: false,
    };
  },
  methods: {
    hanldeClick(plan) {
      this.$emit("selectPlan", plan);
    },
  },
};
</script>

<style>
</style>