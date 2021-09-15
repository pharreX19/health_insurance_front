<template>
  <v-container>
    <company-create-edit-dialog
      v-if="showCreateEditDialog"
      :dialog.sync="showCreateEditDialog"
      :registration = registration
      @closeDialog="closeDialog"
    ></company-create-edit-dialog>
    <page-title title="Create subscription" subtitle="Please add the details below to start creating yourinsurance"></page-title>
    <v-stepper v-model="e6" vertical elevation="0" class="pa-5 mt-10">
      <v-stepper-step editable :complete="e6 > 1" step="1">
        Choose policy holder type
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-card flat class="mb-12 pa-3">
          <v-row no-gutters>
            <v-col cols="12" md="7">
              <v-select
                v-model="holder_type"
                :items="holder_types"
                label="Policy holder type"
                outlined
              >
              </v-select>
            </v-col>
            <v-col cols="12" md="4" offset-md="1">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="subscriber.begin_date"
                    label="Effective date"
                    readonly
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="subscriber.begin_date"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-card>
        <v-btn color="primary" @click="e6 = 2"> Continue </v-btn>
      </v-stepper-content>

      <v-stepper-step editable :complete="e6 > 2" step="2">
        Choose or Create Company
        <small v-if="holder_type=='Individual'">Optional</small>
      </v-stepper-step>

      <v-stepper-content step="2">
        <v-card flat class="mb-12">
          <v-col cols="12" md="8">
            <v-combobox
              outlined
              v-model="company"
              :items="companies"
              item-text="registration"
              item-value="id"
              :search-input.sync="search"
              label="Registration*"
              @keyup.enter="showCreateCompanyDialog(search)"
              :error-messages="company_error"
            >
              <template v-slot:no-data>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-regular">
                      No results matching "<strong>{{ search }}</strong
                      >". Press <kbd>enter</kbd> to create a new one
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-combobox>
          </v-col>
        </v-card>
        <v-btn color="primary" @click="e6 = 3" :disabled="company == null"> Continue </v-btn>
      </v-stepper-content>

      <v-stepper-step editable :complete="e6 > 3" step="3">
        <div>
          Add policy holders or <i style="color:blue" onclick="subscribers.click();">upload file
            <span v-if="subscribers_file.name">({{subscribers_file.name}})</span>
          </i>
        </div>
      </v-stepper-step>
      <input type="file" name="subscribers" id="subscribers" @change="uploadSubscribersList" hidden>
      <v-stepper-content step="3" v-if="subscribers_file.name">
        <v-btn color="primary" @click="e6 = 4" :disabled="company==null">Continue </v-btn>
        <v-btn class="ml-2" @click="removeFile">Cancel</v-btn>
        <div class="red--text body-2 mt-2" v-if="company==null"> 
          Company is required.
        </div>
      </v-stepper-content>
      <v-stepper-content step="3" v-else>
        <v-card flat class="mb-12">
          <v-row class="mt-1">
            <v-col cols="12" md="7">
              <v-text-field
                outlined
                class="elevation-0"
                v-model="subscriber.name"
                :counter="50"
                label="Policy holder name*"
                :error-messages="getErrors('subscriber.name', $v.subscriber.name)"
                @input="$v.subscriber.name.$touch()"
                @blur="$v.subscriber.name.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="5">
              <v-text-field
                outlined
                v-model="subscriber.national_id"
                :counter="7"
                label="National ID"
                :error-messages="getErrors('subscriber.national_id', $v.subscriber.national_id)"
                @input="$v.subscriber.national_id.$touch()"
                @blur="$v.subscriber.national_id.$touch()"                
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="5">
              <v-select
                v-model="subscriber.country"
                :items="countries"
                label="Country"
                item-text="name"
                item-value="name"
                outlined
              >
              </v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="5">
              <v-text-field
                outlined
                v-model="subscriber.passport"
                label="Passport"
                :error-messages="getErrors('subscriber.passport', $v.subscriber.passport)"
                @input="$v.subscriber.passport.$touch()"
                @blur="$v.subscriber.passport.$touch()" 
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="5">
              <v-text-field
                outlined
                v-model="subscriber.work_permit"
                label="Work Permit"
                :error-messages="getErrors('subscriber.work_permit', $v.subscriber.work_permit)"
                @input="$v.subscriber.work_permit.$touch()"
                @blur="$v.subscriber.work_permit.$touch()"                 
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="5">
              <v-text-field
                outlined
                v-model="subscriber.contact"
                :counter="7"
                label="Contact no."
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-btn color="primary" @click="e6 = 4"> Continue </v-btn>
        <v-btn class="ml-2" @click="addSubscriber" :disabled="$v.subscriber.$invalid"> Add </v-btn>
      </v-stepper-content>

      <v-stepper-step editable step="4">Payment Details</v-stepper-step>
      <v-stepper-content step="4">
        <v-card flat class="mb-12 pa-1">
          <v-row>
            <v-col cols="12" md="4" class="pa-3" v-for="(method, index) in payment_methods" :key="index">
              <v-card @click="selectPaymentMethod(index)" :color="method === subscriber.payment_method ? 'grey lighten-4' : 'white'">
                <v-card-subtitle>{{ method | capitalize }}</v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-h6 mt-5 font-weight-light">
              Add you credit card details
            </v-col>
          </v-row>
           <v-row>
            <v-col cols="12" md="5">
              <v-text-field
                label="Credited to"
                outlined
                disabled
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-btn color="primary" :disabled="!subscribers_file.name && subscribers.length === 0 || company == null" @click="create_subscription">Save</v-btn>
      </v-stepper-content>
    </v-stepper>
    <v-card flat class="mt-5 pa-3" min-height="55px">
      <v-card-title class="font-weight-light pa-0"
        >Policy holder details</v-card-title
      >
      <v-row
        v-for="subscriber in subscribers"
        :key="subscriber.name"
        no-gutters
      >
        <v-col cols="3">
          <p class="text-center text-body-2">{{ subscriber.name }}</p>
        </v-col>
        <v-col cols="2">
          <p class="text-center text-body-2">{{ subscriber.national_id }}</p>
        </v-col>
        <v-col cols="2">
          <p class="text-center text-body-2">{{ subscriber.passport }}</p>
        </v-col>
        <v-col cols="2">
          <p class="text-center text-body-2">{{ subscriber.work_permit }}</p>
        </v-col>
        <v-col cols="2">
          <p class="text-center text-body-2">{{ subscriber.country }}</p>
        </v-col>
        <v-col cols="1">
          <v-btn icon @click="removeSubscriber(subscriber)"><v-icon small color="red darken-2"> mdi-close-circle-outline </v-icon></v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import moment from 'moment';
import CompanyCreateEditDialog from "../Company/CompanyCreateEditDialog.vue";
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import validation_mixin from '../../mixins/validation_mixin';
import PageTitle from '../../components/common/PageTitle.vue';
// import {useValidate} from '@vuelidate/core';
export default {
  components: { CompanyCreateEditDialog, PageTitle },
  mixins: [validation_mixin],
  mounted() {
    this.$store.dispatch("country/get_countries");
    this.plan_id = (this.$store.getters['plan/model']).id;
    console.log('plan id is => ', this.plan_id);
    // this.$store.dispatch("policy/get_policies");
  },
  data: () => ({
    // v$: useValidate(),
    holder_types: ["Individual", "Corporate"],
    holder_type: "Corporate",
    registration: null,
    company: null,
    subscribers_file: {},
    company_error: null,
    e6: 1,
    payment_methods: ['credit_card','cash', 'cheque', 'credit', 'online_payment'],
    subscriber: {
      payment_method: 'online_payment',
      name: "",
      national_id: "",
      passport: "",
      work_permit: "",
      contact: "",
      company_id: "",
      country: "Bangladesh",
      begin_date: moment().format('YYYY-MM-DD'),
    },
    search: null,
    showCreateEditDialog: false,
    menu2: false,
    plan_id: null,
    subscribers: [],
  }),

  validations() {
    return {
      subscriber: {
        name: {required, minLength: minLength(5), maxLength: maxLength(50)},
        national_id: {required, minLength: minLength(7), maxLength: maxLength(7)},
        passport: {required},
        work_permit: {required},
      },
    }
  },
  watch: {
    search(val) {
      if(!val){
        this.company = null;
      }
      val && val !== this.company && this.querySelections(val);
    },
  },

  methods: {
    querySelections(value) {
       this.registration = value;
       this.company_error = null;

      if (value.length >= 3) {
        this.loading = true;
        console.log('searching .... ', value);
        this.$store.dispatch("company/search_model", {url: 'companies/search', data: value});
      } else {
        this.registration = value;
        this.loading = false;
      }
    },


    showCreateCompanyDialog(search) {
      let result = this.companies.find((company) => company.registration === search);
      if(search.length >= 3 && result === undefined){
        this.showCreateEditDialog = true;
      }
    },

    closeDialog(item) {
      this.showCreateEditDialog = false;
      if(item){
        this.company = item;
      }
      // this.registration = data && data.registration;
    },

    addSubscriber() {
      if(!this.company){
        this.e6 = 2;
        this.company_error = "Company is required";

      }else{
        let data = {
        ...this.subscriber,
        company_id: this.company.id,
      };

      Object.getOwnPropertyNames(this.subscriber).forEach((prop) => {
        this.subscriber[prop] = "";
      });
      this.subscribers.push(data);
      }
    },

    removeSubscriber(value){
      this.subscribers = this.subscribers.filter((subscriber) => subscriber !== value);
    },

    create_subscription() {
      if(this.subscribers_file.name){
        // console.log('PLAN IS IS ', this.plan_id, this.company);
        let importFile = document.querySelector('#subscribers');
        let formData = new FormData();
        formData.append('subscribers', importFile.files[0]);
        formData.append('plan_id', this.plan_id);
        formData.append('company_id', this.company.id);
        formData.append('begin_date', this.subscriber.begin_date);
        this.$store.dispatch('subscriber/import_subscribers', formData);
      }else{
        this.subscribers.forEach((subscriber) => {
        subscriber.plan_id = this.plan_id;
      });
      console.log(this.subscribers);
        
        this.$store.dispatch('subscriber/create_model', { url: 'subscribers', data: this.subscribers}).then(() => {
          this.removeFile();
          this.subscriber = {};
          this.subscribers = [];
        });
      }
    },
    // capitalize(value){
    //   return (value.charAt(0).toUpperCase() + value.slice(1)).replaceAll('_', ' ')
    // },

    uploadSubscribersList(){
      let importFile = document.querySelector('#subscribers');
      this.subscribers_file = importFile.files[0];
      
    },
    removeFile(){
      let importFile = document.querySelector('#subscribers');
      importFile.value = null;
      this.subscribers_file = {};
    },
    selectPaymentMethod(index){
      this.subscriber.payment_method = this.payment_methods[index];
    }
  },

  computed: {
    countries() {
      return this.$store.getters["country/countries"];
    },
    companies() {
      return this.$store.getters["company/model"];
    },
    // policies() {
    //   if (this.plans.length === 0) {
    //     this.$store.getters["policy/policies"].map((policy) => {
    //       this.plans.push(policy.plans);
    //     });
    //   }
    //   return this.$store.getters["policy/policies"];
    // },
    // plan(){
    //   return this.$store.getters['policy/plan'];
    // }
  },
};
</script>


<style scoped>
.v-stepper__header {
  box-shadow: none;
}
</style>