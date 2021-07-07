<template>
  <main class="mx-5">
    <v-layout row wrap class="mt-3 mb-5">
      <v-flex sm12 md9>
        <p class="headline font-weight-light grey--text">
          Companies
        </p>
      </v-flex>
      <v-flex sm12 md3>
        <v-text-field
          filled
          rounded
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          class="mx-5 white"
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 sm4 md3 lg2 v-for="service_provider in service_providers" :key="service_provider.id" class="mt-3">
        <v-card flat class="mx-2 mb-3">
          <v-row class="px-5"  align="center" justify="center">
            <v-col cols="12" sm="3">
              <v-avatar size="56">
                <img
                  alt="user"
                  src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"
                />
              </v-avatar>
            </v-col>
            <v-col cols="12" sm="9">
              <v-list-item>
                <v-list-item-content class="text-center">
                  <v-list-item-title class="font-weight-light">{{service_provider.name}}</v-list-item-title>
                  <v-list-item-subtitle class="py-1">
                    <v-chip small pill dark color="cyan">12 subscribers</v-chip>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-list-item>
                <v-list-item-content class="font-weight-light">
                  <v-list-item-title>{{service_provider.registration}}</v-list-item-title>
                  <v-list-item-subtitle>Registration no.</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content  class="font-weight-light">
                  <v-list-item-title>{{service_provider.contact}}</v-list-item-title>
                  <v-list-item-subtitle>Contact no.</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <!-- <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-light">{{service_provider.address}}</v-list-item-title>
                  <v-list-item-subtitle>Address</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-light">{{service_provider.street}}</v-list-item-title>
                  <v-list-item-subtitle>Street</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item> -->
            </v-col>
          </v-row>
          <v-card-actions>
            <v-btn block depressed @click="view_company(service_provider.id)">View</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- <v-card flat>
      <v-card-title class="subheading grey--text">
        Service Providers
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          class="mx-4"
        ></v-text-field>
      </v-card-title> -->
    <!-- <v-data-table
      :headers="headers"
      :items="service_providers"
      :items-per-page="10"
      :search="search"
      loading-text="Loading...please wait"
      class="elevation-1 row-pointer"
      @click:row="handleClick"
    >
    </v-data-table> -->

    <!-- </v-card> -->
  </main>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "Name", value: "name" },
        { text: "Contact", value: "contact" },
        { text: "Address", value: "address" },
        { text: "Street", value: "street" },
        { text: "Registraion", value: "registration" },
      ],
      service_providers: [
        {
          id: 1,
          name: "ABC Company",
          contact: "+9607654321",
          address: "Adress One",
          street: "Street One",
          registration: "REG-2021-2010",
        },

        {
          id: 2,
          name: "XYZ Company",
          contact: "+9607654321",
          address: "Adress One",
          street: "Street One",
          registration: "REG-2021-2010",
        },

        {
          id: 3,
          name: "One Company",
          contact: "+9607654321",
          address: "Adress One",
          street: "Street One",
          registration: "REG-2021-2010",
        },
      ],
    };
  },
  methods: {
    view_company(value) {
      this.$router.push({
        name: 'company',
        params: {id: value}
      })
    },
  },
};
</script>

<style scoped>
.row-pointer >>> tbody tr:hover {
  cursor: pointer;
}
</style>