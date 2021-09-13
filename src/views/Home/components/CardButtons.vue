
<template>
  <v-card
  class="py-5 px-3 mx-2"
    height="230"
    style="cursor: pointer"
    width="250"
    flat
    @mouseover="is_active = !is_active"
    @mouseout="is_active = !is_active"
    @click="handleClick"
    :elevation="is_active ? 1 : 0"
  >
    <v-img width="150" :src="image" class="mx-auto"></v-img>
    <v-card-text class="text-center">
      <div class="text-h6 font-weight-light mb-2">{{ title }}</div>
      <div class="subheading font-weight-light grey--text">
        {{ subtitle }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    handleClick: {
      type: Function,
      required: true,
    },
  },
  data: () => ({
    is_active: false,
  }),
};
</script>

<style scoped>
</style>