<template>
  <base-dialog
    :dialog="dialog"
    @closeDialog="closeDialog"
    @confirmDelete="confirm"
  >
    <template #title> Are you sure you want to delete? </template>
    <template #button>
      <v-btn color="blue darken-1" text @click="confirm"> Confirm </v-btn>
    </template>
  </base-dialog>
</template>

<script>
import BaseDialog from "./BaseDialog.vue";
export default {
  components: { BaseDialog },
  props: {
    dialog: {
      BaseDialogtype: Boolean,
      default: false,
    },
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },

    confirm() {
      this.$emit("confirmDelete");
    },
  },
};
</script>

<style>
</style>