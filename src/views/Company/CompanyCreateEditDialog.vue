<template>
  <v-row justify="center">
    <base-dialog :dialog="dialog" @closeDialog="closeDialog">
      <template #title> {{ isEdit ? "Update" : "Create" }} Company </template>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Company Name*"
              required
              v-model="company.name"
              :error-messages="getErrors('company.name', $v.company.name)"
              @input="$v.company.name.$touch()"
              @blur="$v.company.name.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="8">
            <v-text-field
              label="Registration*"
              required
              v-model="company.registration"
              :error-messages="
                getErrors('company.registration', $v.company.registration)
              "
              @input="$v.company.registration.$touch()"
              @blur="$v.company.registration.$touch()"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              label="Contact"
              required
              hint="+(960) 7654321"
              prefix="+(960)"
              persistent-hint
              v-model="company.contact"
              :error-messages="getErrors('company.contact', $v.company.contact)"
              @input="$v.company.contact.$touch()"
              @blur="$v.company.contact.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Email"
              required
              v-model="company.email"
              :error-messages="getErrors('company.email', $v.company.email)"
              @input="$v.company.email.$touch()"
              @blur="$v.company.email.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              label="Address"
              type="text"
              required
              v-model="company.address"
              :error-messages="getErrors('company.address', $v.company.address)"
              @input="$v.company.address.$touch()"
              @blur="$v.company.address.$touch()"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="Street"
              type="text"
              required
              v-model="company.street"
              :error-messages="getErrors('company.street', $v.company.street)"
              @input="$v.company.street.$touch()"
              @blur="$v.company.street.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <template #button>
        <v-btn
          color="blue darken-1"
          :disabled="$v.$invalid"
          text
          @click="saveCompany"
        >
          Save
        </v-btn>
      </template>
    </base-dialog>
  </v-row>
</template>

<script>
import {
  required,
  maxLength,
  minLength,
  alphaNum,
  numeric,
  email,
} from "vuelidate/lib/validators";
import BaseDialog from "../../components/dialogs/BaseDialog.vue";
import validation_mixin from "../../mixins/validation_mixin";
import * as endpoints from '../../constants/api_end_points';

export default {
  components: { BaseDialog },
  mixins: [validation_mixin],
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    registration: {
      type: String,
      required: false,
      default: "",
    },
    isEdit: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  beforeMount() {
    console.log("====> ", this.registration);
    if (this.isEdit) {
      this.company = this.$store.getters["company/model"];
    }
  },
  computed: {
    reg_number() {
      return this.registration;
    },
  },
  data() {
    return {
      company: {
        registration: this.registration,
        name: "",
        contact: "",
        email: "",
        address: "",
        street: "",
      },
    };
  },
  validations() {
    return {
      company: {
        name: {
          required,
          minLength: minLength(5),
          maxLength: maxLength(50),
          alphaNum,
        },
        registration: {
          required,
          minLength: minLength(5),
          maxLength: maxLength(50),
        },
        contact: {
          required,
          minLength: minLength(7),
          maxLength: maxLength(7),
          numeric,
        },
        address: { minLength: minLength(5), maxLength: maxLength(50) },
        street: { minLength: minLength(5), maxLength: maxLength(50) },
        email: { email },
      },
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog", this.company);
    },

    saveCompany() {
      // this.company.registration = this.reg_number;
      console.log("company is", this.company);
      if (this.isEdit) {
        this.$store.dispatch("company/update_model", {url: endpoints.companies, data: this.company});
      } else {
        this.$store.dispatch("company/create_model",{url: endpoints.companies, data: this.company});
      }
      this.closeDialog();
    },
  },
};
</script>

<style>
</style>