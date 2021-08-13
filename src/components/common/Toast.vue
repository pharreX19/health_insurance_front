<template>
  <v-snackbar
    :color="color"
    :timeout="timer"
    :value="showSnackbar"
    bottom
  >
    <v-icon left>{{ icon }}</v-icon
    >{{ message }}
  </v-snackbar>
</template>

<script>
export default {
  name: "vtoast",
  computed: {
    showSnackbar(){
      if(this.$store.state.snackbar.show){
        this.show(this.$store.state.snackbar);
      }
      return this.$store.state.snackbar.show;
    }
  },
  data() {
    return {
      message: null,
      color: null,
      icon: "mdi-exclamation",
      timer: 3000,
    };
  },
  methods: {
    show(data) {
      this.showSnackbar = true;
      this.message = data.message || 'missing "message".';
      this.color = data.color || "success";
      this.timer = data.timer || 3000;
      this.icon = data.icon || "mdi-alert-circle-outline";
    },
  },
};
</script>