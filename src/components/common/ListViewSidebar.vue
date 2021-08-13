<template>
  <v-col cols="12" md="4">
    <v-card flat class="pa-5">
      <v-row>
        <v-col class="d-flex justify-center align-center">
          <v-avatar>
            <img
              class="image-circle"
              alt="user"
              src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"
            />
          </v-avatar>
        </v-col>
      </v-row>

      <v-col>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="py-0 text-center">{{
              item.name
            }}</v-list-item-title>
            <v-list-item-subtitle class="py-0 text-center">{{
              item.subscription
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>

      <v-col>
        <v-row align="center" justify="center">
          <v-btn icon class="grey lighten-4 mx-3">
            <v-icon color="red">mdi-phone</v-icon>
          </v-btn>
          <v-btn icon class="grey lighten-4 mx-3">
            <v-icon>mdi-email</v-icon>
          </v-btn>
          <v-btn icon class="grey lighten-4 mx-3">
            <v-icon @click="view()">mdi-eye</v-icon>
          </v-btn>
        </v-row>
      </v-col>
      <v-col> </v-col>

      <v-row v-if="item.description">
        <v-col class="py-0">
          <v-card-text>
            <p class="font-weight-medium body-1">About</p>
            <p class="body-2">
              {{ item.description }}
            </p>
          </v-card-text>
        </v-col>
      </v-row>

      <v-row v-else>
        <v-col class="py-0" md="6">
          <v-card-text>
            <p class="font-weight-medium body-1">National ID</p>
            <p class="body-2">
              {{ item.national_id }}
            </p>
          </v-card-text>
        </v-col>
        <v-col class="py-0" md="6">
          <v-card-text>
            <p class="font-weight-medium body-1">Passport</p>
            <p class="body-2">
              {{ item.passport }}
            </p>
          </v-card-text>
        </v-col>
      </v-row>

      <v-row>
        <v-col md="6 py-0" v-if="item.registration">
          <v-card-text>
            <p class="font-weight-medium body-1">Registration</p>
            <p class="body-2">{{ item.registration }}</p>
          </v-card-text>
        </v-col>
        <v-col md="6 py-0">
          <v-card-text>
            <p class="font-weight-medium body-1">Joined at</p>
            <p class="body-2">{{ item.joined_at }}</p>
          </v-card-text>
        </v-col>
      </v-row>

      <v-row>
        <v-col md="12 py-0">
          <v-card-text>
            <p class="font-weight-medium body-1">Documents</p>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    item: {
      required: true,
      type: Object,
    },
    view: {
      required: true,
      type: Function
    }
  },
};
</script>

<style>
</style>