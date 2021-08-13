<template>
     <v-card class="pa-3 pl-5" style="height: 100%">
          <v-row>
            <v-col cols="6" md="7" class="pl-4">
              <div class="text-h6 font-weight-light mb-2">
                {{ subscriber.name }}
              </div>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-body-2 font-weight-light">{{
                    subscriber.policy_number
                  }}</v-list-item-title>
                  <v-list-item-subtitle
                    class="subheading font-weight-light grey--text"
                    >Policy No.</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-body-2 font-weight-light">{{
                    subscriber.national_id
                  }}</v-list-item-title>
                  <v-list-item-subtitle
                    class="subheading font-weight-light grey--text"
                    >National ID</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-body-2 font-weight-light">{{
                    subscriber.passport
                  }}</v-list-item-title>
                  <v-list-item-subtitle
                    class="subheading font-weight-light grey--text"
                    >Passport</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-body-2 font-weight-light">{{
                    subscriber.work_permit
                  }}</v-list-item-title>
                  <v-list-item-subtitle
                    class="subheading font-weight-light grey--text"
                    >Work permit</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="6" md="4" align-self="center">
              <v-avatar size="150" class="text-center">
                <img
                  src="@/assets/profile.svg"
                  :alt="subscriber.name"
                />
              </v-avatar>
            </v-col>
          </v-row>
        </v-card>
</template>

<script>
export default {
    props: {
        subscriber: {
            type: Object,
            required: true
        }
    }

}
</script>

<style>

</style>