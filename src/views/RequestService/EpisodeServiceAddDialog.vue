<template>
  <v-row justify="center">
    <v-dialog
      :value="dialog"
      :subscriber="subscriber"
      :episode = "episode"
      @input="$emit('update:dialog', false)"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Add Service</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  :items="services"
                  :filter="customFilter"
                  item-text="name"
                  item-value="id"
                  v-model="service.service_id"
                  @change="getServiceCoveredLimit"
                  placeholder="Service*"
                  :error-messages="getErrors('service.service_id', $v.service.service_id)"
                  @input="$v.service.service_id.$touch()"
                  @blur="$v.service.service_id.$touch()"     
                ></v-autocomplete>
                   <v-progress-circular v-if="isLoading"
                    indeterminate
                    color="cyan darken-3"                    
                  ></v-progress-circular>
                  <template v-else>
                    <v-list-item-content class="text-left" v-if="service_insurance_details.service_limit_group_total">
                    <v-list-item-subtitle>
                      <i>Service limit group total: {{service_insurance_details.service_limit_group_total}}</i>
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="mt-1">
                      <i>Service limit calculation type: {{service_insurance_details.service_calculation_type}}</i>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-content v-if="!service_insurance_details.service_limit_group_total && service.service_id">
                    <v-list-item-subtitle style="color:red">
                      <i class="text-subtitle-2">Service is not covered under this policy.</i>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  </template>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                    dense
                  type="number"
                  label="Service price*"
                  v-model="service.limit_total"
                  prefix="MVR"
                  :error-messages="getErrors('service.limit_total', $v.service.limit_total)"
                  @input="$v.service.limit_total.$touch()"
                  @blur="$v.service.limit_total.$touch()"     

                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  dense
                  type="number"
                  label="Insurance"
                  disabled
                  prefix="MVR"
                  v-model="service_insurance_details.insurance_covered_limit"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                dense
                  class="mx-4"
                  type="number"
                  label="Aasandha"
                  prefix="MVR"
                  v-model="service.aasandha_covered_limit"
                  :disabled="parseFloat(service.limit_total) < parseFloat(service_insurance_details.insurance_covered_limit) + parseFloat(service.self_covered_limit)"                  
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                dense
                  type="number"
                  label="Self"
                  prefix="MVR"
                  v-model="service.self_covered_limit"
                  :disabled="parseFloat(service.limit_total) < parseFloat(service_insurance_details.insurance_covered_limit) + parseFloat(service.aasandha_covered_limit)"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-row class="mx-2 mt-1">
            <small>*Indicates required field</small>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1"  @click="add_service" icon outlined :disabled="!isServiceValidForProcessing()">
            <v-icon>mdi-check</v-icon>
          </v-btn>
          </v-row>
        </v-card-text>
        
        <v-card-title v-if="requested_services.length > 0" class="font-weight-light">Requested Services</v-card-title>
         <v-row class="text-center" v-for="(requested_service, index) in requested_services" :key="index" no-gutters>
          <v-col cols="4">
            {{requested_service.name}}
          </v-col>
          <v-col cols="2">
              {{parseFloat(requested_service.limit_total) - (parseFloat(requested_service.aasandha_covered_limit) + parseFloat(requested_service.self_covered_limit))}} 
          </v-col>
          <v-col cols="2">
            {{requested_service.aasandha_covered_limit}}
          </v-col>
          <v-col cols="2">
            {{requested_service.self_covered_limit}}
          </v-col>
          <v-col cols="2">
            <v-btn icon color="red" @click="remove_service(requested_service)"><v-icon>mdi-close-circle-outline</v-icon></v-btn>
          </v-col>
        </v-row> 
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close_dialog">
            Close
          </v-btn>
          <v-btn color="blue darken-1" :disabled="requested_services.length == 0" text @click="add_service_to_episode"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { required, maxValue, minValue, decimal } from 'vuelidate/lib/validators';
import validation_mixin from '../../mixins/validation_mixin';
export default {
  mixins: [validation_mixin],
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    episode: {
      type: Object,
      required: false,
    },
    subscriber: {
      type: Object,
      required: true,
    },
  },
 
  mounted(){
    this.$store.dispatch('service/get_services', false);
  },
  computed: {
    services() {
      return this.$store.getters['service/services'];//this.subscriber.plan.services;
    },
    service_insurance_details(){
      return this.$store.getters['service/service_insurance_details'];
    }
  },
  data() {
    return {
      isLoading: false,
      requested_services: [],
      service: {
        episode_id: null,
        service_id: null,
        limit_total: null,
        insurance_covered_limit: 0.0,
        aasandha_covered_limit: 0.0,
        self_covered_limit: 0.0,
      },
    };
  },
  validations() {
    return {
      service: {
        service_id: {required},
        limit_total: {required, minValue: minValue(0.0), maxValue: maxValue(99999999.99), decimal},
        insurance_covered_limit: {minValue: minValue(0.0), maxValue: maxValue(99999999.99), decimal},
        aasandha_covered_limit: {minValue: minValue(0.0), maxValue: maxValue(99999999.99), decimal},
        self_covered_limit: {minValue: minValue(0.0), maxValue: maxValue(99999999.99), decimal},
      },
    }
  },
  methods: {
    customFilter(item, queryText) {
      const textOne = item.name.toLowerCase();
      const searchText = queryText.toLowerCase();

      return textOne.indexOf(searchText) > -1;
    },

    close_dialog() {
      this.requested_services = [];
      this.$emit("closeDialog");
    },

    getServiceCoveredLimit(){
      this.isLoading = true;
      this.$store.dispatch("service/get_service_insurance_details", {
        subscriber_id: this.subscriber.id,
        plan_id: this.subscriber.plan.id,
        service_id: this.service.service_id
      }).then(() => {
        this.isLoading = false;
      });
    },
    
    isServiceValidForProcessing(){
      if(this.service.limit_total != null){
        if(parseFloat(this.service.limit_total) <= parseFloat(this.service_insurance_details.insurance_covered_limit)){
          return true;
        }else if(parseFloat(this.service.limit_total) == parseFloat(this.service_insurance_details.insurance_covered_limit) + parseFloat(this.service.aasandha_covered_limit) + parseFloat(this.service.self_covered_limit)){
          return true;
        }
      }
      return false;
      // return this.service.limit_total != null &&  parseFloat(this.service.limit_total) <= parseFloat(this.service_insurance_details.insurance_covered_limit) + parseFloat(this.service.aasandha_covered_limit) + parseFloat(this.service.self_covered_limit);
    },

    add_service() {
      this.service.episode_id = this.episode.id;
      this.service.insurance_covered_limit = this.service_insurance_limit;
      let service = this.services.find((service) => service.id === this.service.service_id);

      let requested_service = JSON.parse(JSON.stringify(this.service));

      // this.servce.insurance_covered_limit = this.service_insurance_limit;
      this.requested_services.push({...requested_service, name: service.name});
      Object.getOwnPropertyNames(this.service).forEach((prop) => {
        this.service[prop] = "";
      });
    },

    remove_service(item){
      this.requested_services = this.requested_services.filter((service) => service !== item);
    },

    add_service_to_episode(){
      this.$store.dispatch("episode_service/add_service_to_episode",this.requested_services).then(() => {
        this.$emit("closeDialog", this.requested_services);
        this.requested_services = [];
      });
    }
  },
};
</script>

<style scoped>
.mdi-close-circle-outline::before{
  padding-bottom: 15px;
}
</style>