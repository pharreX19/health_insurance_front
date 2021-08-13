<template>
  <v-card
    class="mt-6"
  >
    <v-sheet
      class="v-sheet--offset mx-auto"
      color="cyan"
      elevation="12"
      max-width="calc(100% - 32px)"
    >
      <v-sparkline
        :labels="labels"
        :value="value"
        color="white"
        line-width="2"
        padding="16"
      ></v-sparkline>
    </v-sheet>

  

    <v-card-text class="pt-0">
      <div class="text-h6 font-weight-light mb-2">
        Policy usage
      </div>
      <div class="subheading font-weight-light grey--text">
        Last Campaign Performance
      </div>
      <v-divider class="my-2"></v-divider>
      <v-icon
        class="mr-2"
        small
      >
        mdi-clock
      </v-icon>
      <span class="text-caption grey--text font-weight-light">Last service received on 26 minutes ago</span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
    data: () => ({
      labels: [
        '2021',
        '2020',
        '2019',
        '2018',
        '2017',
      ],
      value: [
        200,
        675,
        410,
        390,
        310,
      ],
    }),
  }
</script>

<style scoped>
.v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>