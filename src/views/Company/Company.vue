<template>
  <v-container>
    <v-layout>
      <v-row>
        <v-col cols="12" sm="6">
          <v-card class="pa-3" flat>
            <v-layout>
              <v-row>
                <v-col>
                  <v-card-title>ABC Company</v-card-title>
                  <v-card-subtitle>32 Subscribers</v-card-subtitle>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Address One</v-list-item-title>
                      <v-list-item-subtitle>Address</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Street One</v-list-item-title>
                      <v-list-item-subtitle>Street</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>+960 7654321</v-list-item-title>
                      <v-list-item-subtitle>Contact</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col class="edit text-right">
                  <company-dialog></company-dialog>
                </v-col>
              </v-row>
            </v-layout>
          </v-card>
        </v-col>
      </v-row>
    </v-layout>
    <v-layout class="mt-5">
      <v-row>
        <v-col cols="12">
          <v-card flat>
            <v-tabs v-model="tab" class="white black--text">
              <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
              <v-tab-item v-for="(item, index) in items" :key="item.tab">
                <v-card flat class="pa-5">
                  <v-card-text v-if="index === 0">
                      <company-summary></company-summary>
                    </v-card-text>
                    <v-card-text v-if="index === 1">
                      <company-episodes></company-episodes>
                    </v-card-text>
                    <v-card-text v-if="index === 2">
                      <company-subscribers></company-subscribers>
                    </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import CompanyEpisodes from './CompanyEpisodes.vue';
import CompanySubscribers from './CompanySubscribers.vue';
import CompanySummary from './CompanySummary.vue';
import CompanyDialog from './CompanyDialog.vue';
export default {
  components: { CompanySubscribers, CompanyEpisodes, CompanySummary, CompanyDialog },
  data() {
    return {    
      tab: null,
      items: ["summary", "episodes", "subscribers"],
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      
    };
  },
};
</script>

<style>
</style>