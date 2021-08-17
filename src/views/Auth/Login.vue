<template>
  <v-container> 
    <service-provider-select-dialog
      v-if="selectProviderDialog"
      :dialog.sync="selectProviderDialog"
      @closeDialog="closeDialog"
      @reLogin="reLogin"
      :serviceProviders="serviceProviders"
    ></service-provider-select-dialog>
    <v-row align="center" justify="center">
      <v-col>
        <div class="text-h4 font-weight-light text-center">
          Sign in
        </div>
      </v-col>
    </v-row>
    <v-row align="center" justify="center" style="height:70vh">
      <v-col cols="4">
        <v-img
        src="@/assets/personalization.svg"
        ></v-img>
      </v-col>
      <v-col cols="12" md="4" align-self="center" class="ml-10">
        <!-- <v-card class="pa-10" flat>
          <v-card-title>User login</v-card-title> -->
          <div>
            <v-text-field
            label="Email"
            type="email"
            v-model="email"
            prepend-inner-icon="mdi-email"
            :error-messages="getErrors('email', $v.email)"
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          ></v-text-field>
          </div>

          <div class="mt-5">
            <v-text-field
            label="Password"
            type="password"
            v-model="password"
            prepend-inner-icon="mdi-key"
           :error-messages="getErrors('password', $v.password)"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
          ></v-text-field>
          </div>
            
          <!-- <v-card-actions> -->
            <v-spacer></v-spacer>
            <v-btn
            block
            rounded
            class="mt-5"
            @click="login"
            width="120px"
            :disabled="$v.password.$invalid || $v.email.$invalid"
          >
            Login
          </v-btn>
          <v-col class="text-right pa-1">
              <small class="font-weight-regular blue--text" style="cursor:pointer">Forgot password?</small>
            </v-col>
          <!-- </v-card-actions> -->
        <!-- </v-card> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { store } from "../../store";
import { required, minLength, email } from "vuelidate/lib/validators";
import validation_mixin from '../../mixins/validation_mixin';
import ServiceProviderSelectDialog from './ServiceProviderSelectDialog.vue';
export default {
  components: { ServiceProviderSelectDialog },
  mixins:[validation_mixin],
  data() {
    return {
      email: null,
      password: null,
      selectProviderDialog: false,
    };
  },
  validations() {
    return {
      email: { required, email },
      password: { required, minLength: minLength(5) },
      service_provider_id: null,
      serviceProviders: [],
    };
  },
  methods: {
    login() {
      this.$auth
        .login({ email: this.email, password: this.password, service_provider_id: this.service_provider_id })
        .then((response) => {
          store.commit("set_user", response);
        }).catch((error) => {
          if(error.response.data.errors.status === 409){
            this.serviceProviders = error.response.data.errors.message.service_providers;
            this.selectProviderDialog = true;
          }
        });
      // this.$store.dispatch('auth/login', {email: this.email, password: this.password});
    },
  closeDialog(){
    this.selectProviderDialog = false;
  },
  reLogin(value){
    this.service_provider_id = value;
    this.closeDialog();
    this.login();
  }
  },
};
</script>

<style>
</style>