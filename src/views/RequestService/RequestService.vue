<template>
  <v-container>
    <episode-create-dialog
      v-if="showEpisodeDialog"
      :dialog.sync="showEpisodeDialog"
      @closeDialog="closeDialog"
    ></episode-create-dialog>

    <episode-service-add-dialog
      v-if="showEpisodeServiceAddDialog"
      :episode="episode"
      :subscriber="subscriber"
      :dialog.sync="showEpisodeServiceAddDialog"
      @closeDialog="closeDialog"
    ></episode-service-add-dialog>
    <v-row style="height: 20%">
      <v-col cols="12" md="7">
        <subscriber-details :subscriber="subscriber"></subscriber-details>
      </v-col>
      <v-col cols="12" md="5">
        <subscriber-policy :subscriber="subscriber"></subscriber-policy>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card flat class="px-5 py-3">
          <v-card-title class="font-weight-light text-h5"
            >Recent Episodes
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="subscriber.episodes"
            item-key="id"
            :sort-desc="sortDesc"
            sort-by="activity_at"
            :items-per-page="5"
            loading-text="Loading...please wait"
            class="elevation-0 row-pointer"
            :single-expand="singleExpand"
            :expanded.sync="expanded"
            show-expand
          >
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length" class="py-5">
                <template v-if="item.services && item.services.length > 0">
                  <v-row
                    class="text-center"
                    v-for="(service, index) in item.services"
                    :key="index"
                  >
                    <v-col cols="3">{{ service.name }}</v-col>
                    <v-col cols="2">{{
                      service.pivot.insurance_covered_limit
                    }}</v-col>
                    <v-col cols="2">{{
                      service.pivot.aasandha_covered_limit
                    }}</v-col>
                    <v-col cols="2">{{
                      service.pivot.self_covered_limit
                    }}</v-col>
                    <v-col cols="3">{{
                      moment(service.pivot.created_at).format("YYYY-MM-DD")
                    }}</v-col>
                  </v-row>
                </template>
                <template v-else>
                  <v-row class="text-center">
                    <v-col style="color: red">
                      No service attached to this episode
                    </v-col>
                  </v-row>
                </template>
              </td>
            </template>
            <template v-slot:item.activity_at="{ item }">
              {{ moment(item.activity_at).format("MMMM D, YYYY") }}
            </template>
            <template v-slot:item.add_service="{ item }">
              <v-icon small class="ml-4" @click="addServiceToEpisode(item)">
                mdi-pencil
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-fab-transition>
      <v-btn
        class="pa-8 mb-5 mr-5 fab-container"
        color="cyan darken-3"
        dark
        fab
        @click="createEpisode"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script>
// import moment from "moment";
import EpisodeCreateDialog from "./EpisodeCreateDialog.vue";
import EpisodeServiceAddDialog from "./EpisodeServiceAddDialog.vue";
import SubscriberDetails from "../../components/common/SubscriberDetails.vue";
import SubscriberPolicy from "../../components/SubscriberPolicy.vue";

export default {
  components: {
    EpisodeCreateDialog,
    EpisodeServiceAddDialog,
    SubscriberDetails,
    SubscriberPolicy,
  },
  mounted() {
    this.getSubscriber();
  },
  computed: {
    subscriber() {
      return this.$store.getters["subscriber/model"];
    },
  },
  data() {
    return {
      expanded: [],
      singleExpand: false,
      sortDesc: true,
      tab: null,
      showEpisodeDialog: false,
      showEpisodeServiceAddDialog: false,
      episode: null,
      items: ["previous episodes"],
      headers: [
        { text: "Memo Number", value: "memo_number" },
        { text: "Service Provider", value: "service_provider.name" },
        { text: "Activity at", value: "activity_at" },
        { text: "Add Service", value: "add_service", sortable: false },
        { text: "", value: "data-table-expand" },
      ],
    };
  },
  methods: {
    getSubscriber() {
      this.$store.dispatch(
        "subscriber/get_model",
        `subscribers/${this.$route.params.id}?include=plan.services,episodes.serviceProvider,episodes.services,subscriptions`
      ); //subscriptions,company,episodes.services,episodes.serviceProvider,subscriptions'});
    },

    createEpisode() {
      console.log("OK");
      this.showEpisodeDialog = true;
    },
    addServiceToEpisode(item) {
      this.episode = item;
      this.showEpisodeServiceAddDialog = true;
    },
    closeDialog(services = null) {
      if (this.showEpisodeDialog) {
        this.showEpisodeDialog = false;
      } else {
        if (!this.$store.state.episode_service.error && services) {
          console.log(
            "SHOULD BE ADDED",
            !this.$store.state.episode_service.error
          );
          services.forEach((service) => {
            this.episode.services.push({
              name: service.name,
              pivot: {
                insurance_covered_limit: service.insurance_covered_limit,
                aasandha_covered_limit: service.aasandha_covered_limit,
                self_covered_limit: service.self_covered_limit,
              },
            });
          });
          this.getSubscriber();
        }
        this.showEpisodeServiceAddDialog = false;
      }
    },
  },
};
</script>
<style scoped>
.v-list-item {
  padding-left: 0px !important;
}
.fab-container {
  position: fixed;
  bottom: 0;
  right: 0;
  padding-right: 5%;
}
</style>