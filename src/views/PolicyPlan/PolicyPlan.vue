<template>
  <v-container>
    <add-limit-group-calculation-type
      v-if="showLimitCalcTypeDialog"
      :dialog="showLimitCalcTypeDialog"
      @closeDialog="closeDialog"
    ></add-limit-group-calculation-type>
    <page-title title="Add services to policy"></page-title>
    <!-- {{selectedPlan.services}} -->
    <v-row justify="center">
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          :items="policy.plans"
          label="Policy plan"
          item-text="name"
          item-value="id"
          v-model="selectedPlan"
          return-object
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="mx-auto px-2">
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text-h6">
                  Available services
                </v-list-item-title>
                <v-list-item-subtitle
                  >Services currently availabe in the
                  system</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list>
            <v-subheader>REPORTS</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="service in services"
                :key="service.id"
                @click="showDialog(service)"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="service.name"></v-list-item-title>
                  <v-list-item-subtitle
                    v-text="service.service_limit_group.name"
                  ></v-list-item-subtitle>
                </v-list-item-content>
                <!-- <v-list-item-icon>
                  <v-icon>mdi-plus</v-icon>
                </v-list-item-icon> -->
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="mx-auto px-2" tile v-if="!selectedPlan">
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text-h6 red--text">
                  No plan selected
                </v-list-item-title>
                <v-list-item-subtitle
                  >Please select a plan to display
                  services</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
        <v-card class="mx-auto px-2" tile v-else>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text-h6">
                  Policy Services
                </v-list-item-title>
                <v-list-item-subtitle
                  >Services selected for this policy
                  system</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list>
            <v-subheader>REPORTS</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="service in selectedPlan.services"
                :key="service.id"
                v-show="serviceExistsInPlan(service)"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="service.name"></v-list-item-title>
                  <v-list-item-subtitle
                    >{{ service.pivot.limit_calculator }} - MVR
                    {{ service.pivot.limit_total }}</v-list-item-subtitle
                  >
                </v-list-item-content>
                <!-- <v-list-item-icon>
                  <v-icon>mdi-minus</v-icon>
                </v-list-item-icon> -->
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <!-- <v-simple-table class="pa-5">
      <template v-slot:default>
        <thead>
          <tr>
            <th></th>
            <th class="text-left" v-for="plan in policy.plans" :key="plan.id">
                <div class="text-body-2 pt-3">{{plan.name}}</div>
                <div class="text-h5 font-weight-bold pt-1 pb-3"><span class="font-weight-light text-subtitle-1">MVR</span> {{plan.premium}}</div>
            </th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(service) in services" :key="service.id">
                <td>{{service.name}}</td>
                <td v-for ="(plan, index) in policy.plans" :key="plan.id">
                   <v-icon class="ml-3" style="cursor:pointer; color:green" @click="removeServiceFromPlan(index, service)" v-if="serviceExistsInPlan(index, service)">mdi-check</v-icon>
                   <v-icon class="ml-3" style="cursor:pointer; color:red" @click="showDialog(index, service)" v-else>mdi-close</v-icon>
                </td>
            </tr>
        </tbody>
      </template>
    </v-simple-table> -->
  </v-container>
</template>

<script>
import PageTitle from "../../components/common/PageTitle.vue";
// import { policy } from '../../store/modules/policy';
import AddLimitGroupCalculationType from "./addLimitGroupCalculationType.vue";
export default {
  components: { PageTitle, AddLimitGroupCalculationType },
  mounted() {
    this.getPolicy();
    this.$store.dispatch("service/get_services");
  },
  computed: {
    services() {
      console.log(this.$store.getters["service/services"]);
      return this.$store.getters["service/services"];
    },
    policy() {
      return this.$store.getters["policy/model"];
      // console.log(policy);
      // return policy.find((item) => item.id === this.$route.params.id);
    },
    watch: {
      policy(){
        console.log('=========');
        this.selectedPlan = this.policy.plans[0];
      }
    }
  },
  data() {
    return {
      showLimitCalcTypeDialog: false,
      calculation: "",
      selectedIndex: null,
      selectedService: null,
      selectedPlan: null,
    };
  },
  methods: {
    getPolicy() {
      this.$store.dispatch(
        "policy/get_model",
        `policies/${this.$route.params.policy_id}?include=plans.services`
      );
    },
    serviceExistsInPlan(service) {
      let plan = this.selectedPlan; //this.policy.plans[index];
      return plan.services.find(
        (planService) => planService && planService.id === service.id
      )
        ? true
        : false;
      //   console.log(service, plan);
    },
    removeServiceFromPlan(index, service) {
      let plan = this.policy.plans[index];
      this.$store.dispatch("policy/remove_service_from_plan", {
        planId: plan.id,
        serviceId: service.id,
      });
    },

    showDialog(service) {
      if (this.selectedPlan) {
        if (this.serviceExistsInPlan(service)) {
          this.$store.dispatch("show_snackbar", {
            msg: "Service exists on the selected plan.",
          });
        } else {
          this.showLimitCalcTypeDialog = true;
          // this.selectedIndex = index;
          this.selectedService = service;
        }
      }
    },

    addServiceToPlan(service) {
      let plan = this.selectedPlan; //this.policy.plans[index];
      console.log(plan);
      this.$store.dispatch("policy/add_service_to_plan", {
        planId: plan.id,
        service: service,
        calculation_type: this.calculation.calculation_type,
        limit_total: this.calculation.limit_total,
      }).then(() => this.getPolicy());
    },
    closeDialog(value = null) {
      if (value) {
        this.calculation = value;
        this.addServiceToPlan(this.selectedService);
      }
      this.showLimitCalcTypeDialog = false;
    },
  },
};
</script>

<style>
</style>