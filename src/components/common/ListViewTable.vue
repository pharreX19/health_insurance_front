<template>
  <v-row>
    <confirm-dialog
    v-if="showConfirmDialog"
    :dialog.sync="showConfirmDialog"
    @closeDialog="closeDialog"
    @confirmDelete ="confirmDelete"
    >
    </confirm-dialog>
    
    <v-col cols="12">
      <v-card class="pa-5" flat>
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="10"
          :search="search"
          loading-text="Loading...please wait"
          class="elevation-0 row-pointer"
          @click:row="onClick"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click.stop="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click.stop="deleteItem(item)" color="red"> mdi-delete </v-icon>
          </template>
          
          <template v-slot:item.created_at="{ item }">
          {{ moment(item.created_at).format("DD-MM-YYYY") }}
        </template>
        </v-data-table>
      </v-card>
    </v-col>
    <slot></slot>
  </v-row>
</template>

<script>
// import ServiceProviderCreateEditDialog from "../../views/ServiceProviders/ServiceProviderCreateEditDialog.vue";
import ConfirmDialog from '../dialogs/ConfirmDialog.vue';
export default {
  components: {
    // ServiceProviderCreateEditDialog,
    ConfirmDialog,
  },

  props: {
    headers: {
      required: true,
      type: Array,
    },

    items: {
      required: true,
      type: Array,
    },
    search: {
      required: false,
      type: String,
    },
  },
  data() {
    return {
      // showProviderDialog: false,
      showConfirmDialog : false,
      item: null,
    };
  },
  methods: {
    onClick: function (item) {
      // this.$store.commit('service_provider/SET_SERVICE_PROVIDER', value);
      this.$emit("onClick", item);
    },
    editItem(item) {
      // this.$store.commit('service_provider/SET_SERVICE_PROVIDER', item);
      this.$emit('editItem', item);
      // this.showProviderDialog = true;
      // this.$emit('editItem', item);
    },
    deleteItem(item) {
      this.item = item;
      // this.$store.commit('service_provider/SET_SERVICE_PROVIDER', item);
      this.showConfirmDialog = true;
    },
    confirmDelete(){
      this.$emit('deleteItem', this.item);
      // this.$store.dispatch('service_provider/delete_service_providers', this.item.id)
      this.showConfirmDialog = false;

    },
    closeDialog(){
      // this.showProviderDialog = false;
      this.showConfirmDialog = false;
    }
  },
};
</script>

<style scoped>
.row-pointer >>> tbody tr:hover {
  cursor: pointer;
}

.image-circle {
  border-radius: 50%;
}
</style>