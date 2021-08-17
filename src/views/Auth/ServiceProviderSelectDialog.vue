<template>
  <base-dialog :dialog="dialog" @closeDialog="closeDialog">
    <template #title>Select a service provider*</template>
    <v-container class="px-0" fluid>
      <v-radio-group v-model="service_provider_id">
        <v-radio
          v-for="serviceProvider in serviceProviders"
          :key="serviceProvider.id"
          :label="serviceProvider.name"
          :value="serviceProvider.id"
        ></v-radio>
      </v-radio-group>
    </v-container>

    <template #button>
      <v-btn
        color="blue darken-1"
        text
        @click="selectProvider"
      >
        Continue
      </v-btn>
    </template>
  </base-dialog>
</template>

<script>
import BaseDialog from "../../components/dialogs/BaseDialog.vue";

export default {
  components: { BaseDialog },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    serviceProviders: {
        type: Array,
        required: true
    }
  },
  beforeMount() {
     
  },
  data() {
    return {
      'service_provider_id': 1
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },

    selectProvider() {
      this.$emit('reLogin', this.service_provider_id);
    },
  },
};
</script>

<style>
</style>