<template>
  <v-dialog
    :value="dialog"
    @input="$emit('update:dialog', false)"
    persistent
    max-width="600"
  >
    <v-card class="text-center pa-3">
      <v-card-title
        ><span class="text-title font-weight-light"
          ><slot name="title"></slot></span
      ></v-card-title>
      <v-card-text>
          <slot></slot>
          <v-row>
            <v-col class="text-left">
              <small>*Indicates required field</small>
            </v-col>
          </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <slot name="button"></slot>
        <v-btn color="blue darken-1" text @click="closeDialog"> Close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
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
  },
};
</script>

<style>
</style>