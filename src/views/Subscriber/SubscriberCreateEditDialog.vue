<template>
  <v-dialog
    :value="dialog"
    @input="$emit('update:dialog', false)"
    persistent
    max-width="600px"
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">Update subscriber details</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <!-- <v-row>
              <v-col cols="12" md="6">
                <v-text-field label="First Name*" required></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Last Name*" required></v-text-field>
              </v-col>
            </v-row> -->
          <v-row>
            <v-col>
              <v-text-field 
              label="Passport" 
              :value="subscriber.passport"
              required
              :error-messages="getErrors('subscriber.passport', $v.subscriber.passport)"
              @input="$v.subscriber.passport.$touch()"
              @blur="$v.subscriber.passport.$touch()"  
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field 
              label="Work permit" 
              :value="subscriber.work_permit"
              required
               :error-messages="getErrors('subscriber.work_permit', $v.subscriber.work_permit)"
              @input="$v.subscriber.work_permit.$touch()"
              @blur="$v.subscriber.work_permit.$touch()"  
              >
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field 
                label="Contact" 
                :value="subscriber.contact"
                required
                :error-messages="getErrors('subscriber.contact', $v.subscriber.contact)"
                @input="$v.subscriber.contact.$touch()"
                @blur="$v.subscriber.contact.$touch()"  
                >
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>            
            <v-col cols="12" md="6">
              <v-select 
                :items="companies" 
                :item-text="'name'"
                :item-value="'id'"
                label="Company"
                name="company"
                v-model="subscriber.company"
                >
              </v-select>
            </v-col>
          </v-row>

        </v-container>
        <small>*Indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="updateSusbscriber"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import validation_mixin from '../../mixins/validation_mixin';
import { required, maxLength, minLength, numeric } from 'vuelidate/lib/validators';

export default {
  mixins: [validation_mixin],
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  beforeMount(){
    this.$store.dispatch("company/get_models", "companies", false);
    this.subscriber = this.$store.getters["subscriber/model"];
  },
  computed: {
    companies(){
      return this.$store.getters["company/models"];
    }
  },
  watch: {
    companies(){
      this.companies.map((company) => {
        if(company.id === this.subscriber.company_id){
          this.subscriber.company = company;
        }
      });
    }
  },
  data: () => ({
    subscriber: null
    // countries: ["Maldives", "Bangladesh", "India", "Sri Lanka"],
    // companies: ["ABC Company", "XYZ Company", "Undefined PVT LTD"],
  }),
   validations() {
    return {
      subscriber: {
        contact: {required, minLength: minLength(7), maxLength: maxLength(7), numeric},
        passport: {minLength: minLength(5), maxLength: maxLength(50)},
        work_permit: {minLength: minLength(5), maxLength: maxLength(50)},
      },
    }
   },
  methods: {
    closeDialog() {
      this.$emit('closeDialog');
    },
    updateSusbscriber(){
      this.subscriber.company_id = this.subscriber.company.id;
      this.$store.dispatch("subscriber/update_model", {url: 'subscribers', data: [this.subscriber]});
      console.log(this.subscriber);
    }
  },
};
</script>

<style>
</style>