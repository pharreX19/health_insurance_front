<template>
  <base-dialog :dialog="dialog" @closeDialog="closeDialog">
    <template #title>
      {{ isEdit ? "Update" : "Create" }} Service Provider
    </template>
    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Service Provider Name*"
          required
          v-model="service_provider.name"
           :error-messages="getErrors('service_provider.name', $v.service_provider.name)"
          @input="$v.service_provider.name.$touch()"
          @blur="$v.service_provider.name.$touch()"           
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="7">
        <v-text-field
          label="Address"
          type="text"
          required
          v-model="service_provider.address"
          :error-messages="getErrors('service_provider.address', $v.service_provider.address)"
          @input="$v.service_provider.address.$touch()"
          @blur="$v.service_provider.address.$touch()"           
        ></v-text-field>
      </v-col>
      <v-col cols="5">
        <v-text-field
          label="Street"
          type="text"
          required
          v-model="service_provider.street"
          :error-messages="getErrors('service_provider.street', $v.service_provider.street)"
          @input="$v.service_provider.street.$touch()"
          @blur="$v.service_provider.street.$touch()"     
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          label="Contact"
          required
          hint="ex: 7654321"
          persistent-hint
          v-model="service_provider.contact"
          :error-messages="getErrors('service_provider.contact', $v.service_provider.contact)"
          @input="$v.service_provider.contact.$touch()"
          @blur="$v.service_provider.contact.$touch()"    
        ></v-text-field>
      </v-col>
    </v-row>
    <template #button>
      <v-btn color="blue darken-1" :disabled="$v.$invalid" text @click="saveProvider"> Save </v-btn>
    </template>
  </base-dialog>
</template>

<script>
import BaseDialog from "../../components/dialogs/BaseDialog.vue";
import validation_mixin from '../../mixins/validation_mixin';
import { required, maxLength, minLength, alphaNum, numeric } from 'vuelidate/lib/validators'

export default {
  components: { BaseDialog },
  mixins: [validation_mixin],
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
      isEdit: {
          type: Boolean,
          required: false,
          default: false
      }
  },
  beforeMount() {
    if(this.isEdit){
      this.service_provider = this.$store.getters["service_provider/serviceProvider"];
    }
  },
  data() {
    return {
      service_provider: {
        id: "",
        name: "",
        contact: "",
        address: "",
        street: "",
      },
    };
  },
   validations() {
    return {
      service_provider: {
        name: {required, minLength: minLength(5), maxLength: maxLength(50), alphaNum},
        contact: {required, minLength: minLength(7), maxLength: maxLength(7), numeric},
        address: {minLength: minLength(5), maxLength: maxLength(50), alphaNum},
        street: {minLength: minLength(5), maxLength: maxLength(50), alphaNum},
      },
    }
   },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },

    saveProvider() {
      if (this.isEdit) {
        this.$store.dispatch(
          "service_provider/update_service_providers",
          this.service_provider
        );
      } else {
        this.$store.dispatch(
          "service_provider/create_service_provider",
          this.service_provider
        );
      }
      this.closeDialog();
      
    },
  },
};
</script>

<style>
</style>