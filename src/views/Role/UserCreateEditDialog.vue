<template>
  <v-row justify="center">
    <base-dialog :dialog="dialog" @closeDialog="closeDialog">
      <template #title> {{ isEdit ? "Update" : "Create" }} User</template>
      <v-container>
        <v-row>
          <v-col cols="12" md="8">
            <v-text-field
              label="Name*"
              required
              v-model="user.name"
              :error-messages="getErrors('user.name', $v.user.name)"
              @input="$v.user.name.$touch()"
              @blur="$v.user.name.$touch()"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-select 
              :items="genders"
              v-model="user.gender"
              item-text="name"
              item-value="name"
              label="Gender*"
            >
            </v-select>
          </v-col>
        </v-row>
         <v-row>
          <v-col cols="12" md="7">
            <v-text-field
              label="Email*"
              required
              v-model="user.email"
              :error-messages="getErrors('user.email', $v.user.email)"
              @input="$v.user.email.$touch()"
              @blur="$v.user.email.$touch()"
            ></v-text-field>
          </v-col>     
          <v-col cols="12" md="5">
            <v-text-field
              label="Contact*"
              required
              v-model="user.contact"
              :error-messages="getErrors('user.contact', $v.user.contact)"
              @input="$v.user.contact.$touch()"
              @blur="$v.user.contact.$touch()"
            ></v-text-field>
          </v-col>     
        </v-row>
        <v-row>
          <v-col cols="12" md="7">
            <v-select 
              :items="roles"
              v-model="user.role_id"
              item-text="name"
              item-value="id"
              label="Role*"
              :error-messages="getErrors('user.role_id', $v.user.role_id)"
              @input="$v.user.role_id.$touch()"
              @blur="$v.user.role_id.$touch()"
            >
            </v-select>
          </v-col>     
        </v-row>
        <v-row>
          <v-col cols="12" md="5">
            <v-text-field
              type="number"
              step="1.0"
              min="1.0"
              max="9999"
              label="Topup amount"
              required
              v-model="user.amount"
              prefix="MVR"
            ></v-text-field>
          </v-col>     
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-autocomplete
              v-model="user.service_provider_id"
              :items="serviceProviders"
              item-text="name"
              item-value="id"
              auto-select-first
              chips
              deletable-chips
              multiple
              label="Service providers"
              :error-messages="getErrors('user.service_provider_id', $v.user.service_provider_id)"
              @input="$v.user.service_provider_id.$touch()"
              @blur="$v.user.service_provider_id.$touch()"
            ></v-autocomplete>
          </v-col>     
        </v-row>
      </v-container>
      <template #button>
        <v-btn
          color="blue darken-1"
          :disabled="$v.$invalid"
          text
          @click="saveUser"
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
  numeric,
  email,
} from "vuelidate/lib/validators";
import BaseDialog from "../../components/dialogs/BaseDialog.vue";
import validation_mixin from "../../mixins/validation_mixin";
export default {
  components: { BaseDialog },
  mixins: [validation_mixin],
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      required: false,
    },
    isEdit: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  beforeMount() {
    if (this.isEdit) {
      this.user = this.$store.getters["role_permission/user"];
    }
    if(this.$store.getters["role_permission/roles"].length == 0){
        this.$store.dispatch("role_permission/get_roles", false);
      }
    this.$store.dispatch('service_provider/get_service_providers');
  },
  computed: {
    roles() {      
      return this.$store.getters["role_permission/roles"];
    },
    serviceProviders(){
      return this.$store.getters["service_provider/serviceProviders"];
    }
  },
  data() {
    return {
      genders: ["Male", "Female"],
      user: {
        name: "",
        email: "",
        gender: 'Male',
        contact: "",
        amount: 100.0,
        role_id: this.$route.params.id,
        service_provider_id: null,
      },
    };
  },
  validations() {
    return {
      user: {
        name: {
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
        email: {
          required,
          email,
        },
         role_id: {
          required
        },
        service_provider_id: {
          required
        }
      },
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog", this.company);
    },

    saveUser() {
      // this.company.registration = this.reg_number;
      if (this.isEdit) {
        this.$store.dispatch("role_permission/update_user", this.user);
      } else {
        this.$store.dispatch("role_permission/create_user", this.user);
      }
      this.closeDialog();
    },
  },
};
</script>

<style>
</style>