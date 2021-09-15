<template>
  <v-container>
    <v-row style="height:65vh" justify="center" align="center">
      <v-col>
        <page-title
          title="Search subscription"
          alignment="text-center"
          subtitle="You may search existing subscriptions either by the national id, passport or work permit"
        ></page-title>

        <v-row no-gutters class="mt-6" justify="center">
          <v-col cols="12" md="6">
            <v-text-field
              placeholder="Identification"
              v-model="identification"
              solo
              flat
              style="border-radius: 0"
              prepend-inner-icon="mdi-magnify"
            >
              <template v-slot:append-outer>
                <v-btn
                  @click="searchSubscriber"
                  tile
                  depressed
                  large
                  dark
                  height="48px"
                >
                  Search
                </v-btn>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PageTitle from "../../components/common/PageTitle.vue";
export default {
  components: { PageTitle },
  data() {
    return {
      identification: null,
    };
  },
  watch: {
    subscriber() {
      if (this.$route.params.type === "edit") {
        this.$router.push({
          name: "subscriptions-edit",
          params: { id: this.subscriber.id },
        });
      } else if (this.$route.params.type === "view") {
        this.$router.push({
          name: "subscriber",
          params: { id: this.subscriber.id },
        });
      } else {
        this.$router.push({
          name: "request-service",
          params: { id: this.subscriber.id },
        });
      }
    },
  },
  methods: {
    searchSubscriber() {
      this.$store.dispatch("subscriber/search_model", {url: "subscribers/search", data: this.identification});
    },
  },
  computed: {
    subscriber() {
      return this.$store.getters["subscriber/model"];
    },
  },
};
</script>

<style>
.v-input__append-outer {
  margin: 0 !important;
}
</style>

