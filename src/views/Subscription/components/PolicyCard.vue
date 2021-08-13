<template>
  <v-card
    class="mt-4 mx-auto pa-5 pb-0"
    max-width="400"
    height="200"
    style="cursor: pointer"
    @click="hanldeClick(policy)"
    @mouseover="is_active = !is_active"
    @mouseout="is_active = !is_active"
    :elevation="is_active ? 1 : 0"
  >
    <v-card-text>
      <div class="text-h6 font-weight-light mb-2">{{ policy.name }}</div>
      <div class="subheading font-weight-light grey--text">
        Has {{ policy.plans.length }} active plans
      </div>
      <v-divider class="mt-10"></v-divider>
      <v-icon class="mr-2" small> mdi-clock </v-icon>
      <span class="text-caption grey--text font-weight-light"
        >Last updated on
        {{ moment(policy.updated_at).format("DD MM YYYY") }}</span
      >
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    policy: {
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
    hanldeClick(policy) {
      this.$emit("selectPolicy", policy);
    },
  },
};
</script>

<style>
</style>