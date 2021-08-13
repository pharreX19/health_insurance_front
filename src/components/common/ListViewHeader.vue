<template>
  <v-row>
      <v-col cols="12" md="8">
        <p class="headline font-weight-light grey--text">{{title}}</p>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          filled
          rounded
          dense
          v-model="search"
          @input="onSearch"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          class="mx-5 white"
        ></v-text-field>
      </v-col>
    </v-row>
</template>

<script>
export default {
    props: {
      title: {
        required: true,
        type: String
      }
    },
    data: () => ({
        search: "",
    }),
    methods: {
        onSearch: function(value){
            this.$emit("search", value)
        }
    }
}
</script>

<style>

</style>