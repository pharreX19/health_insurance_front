<template>
  <v-row justify="center">
    <base-dialog :dialog="dialog" @closeDialog="closeDialog">
      <template #title> Select payment method </template>
      <v-select
        class="mt-3"
        :items="payment_methods"
        outlined
        item-value="name"
        item-text="name"
        v-model="payment_method"
        label="Payment method*"
      >
      </v-select>
      <template #button>
        <v-btn color="blue darken-1" text @click="confirmRenewal">
          Confirm
        </v-btn>
      </template>
    </base-dialog>
  </v-row>
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
  },
  data() {
    return {
      payment_method: "Cash",
      payment_methods: [
        "Cash",
        "Credit",
        "Cheque",
        "Credit card",
        "Online payment",
      ],
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },

    confirmRenewal() {
      this.$emit("confirmRenewal", this.payment_method);
    },
  },
};
</script>

<style>
</style>