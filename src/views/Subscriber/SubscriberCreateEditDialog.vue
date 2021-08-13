<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-fab-transition>
          <slot>
            <v-btn
              color="cyan"
              dark
              absolute
              bottom
              right
              fab
              class="mb-12 mr-3"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </slot>
        </v-fab-transition>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Add Subscriber</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field label="First Name*" required></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Last Name*" required></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field label="National ID*" required></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Passport"
                  required
                  hint="AB012122"
                  persistent-hint
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field label="Work permit" required></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="6">
                <v-select :items="countries" label="Country"></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-select :items="companies" label="Company"></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="6">
                <v-text-field label="Contact" required></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="Address"
                  type="text"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Street"
                  type="text"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*Indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    countries: ["Maldives", "Bangladesh", "India", "Sri Lanka"],
    companies: ["ABC Company", "XYZ Company", "Undefined PVT LTD"],
  }),
};
</script>

<style>
</style>