<template>
  <v-data-table
    :headers="headers"
    :items="service_providers"
    :items-per-page="10"
    loading-text="Loading...please wait"
    class="elevation-0 row-pointer"
    show-select
    @click:row="handleClick"
  >
  </v-data-table>
</template>

<script>
export default {
    data(){
        return {
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
        }
    }
};
</script>

<style>
</style>