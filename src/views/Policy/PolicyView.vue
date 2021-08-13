<template>
  <v-container>
      <add-limit-group-calculation-type :dialog="showLimitCalcTypeDialog" @closeDialog="closeDialog"></add-limit-group-calculation-type>
    <page-title :title="policy.name"></page-title>
    <v-simple-table class="pa-5">
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
    </v-simple-table>
  </v-container>
</template>

<script>
import PageTitle from "../../components/common/PageTitle.vue";
import AddLimitGroupCalculationType from './addLimitGroupCalculationType.vue';
export default {
  components: { PageTitle, AddLimitGroupCalculationType },
  mounted() {
    this.$store.dispatch("policy/get_policy", this.$route.params.id);
    this.$store.dispatch("service/get_services");
  },
  computed: {
    services() {
      console.log(this.$store.getters["service/services"]);
      return this.$store.getters["service/services"];
    },
    policy() {
      return this.$store.getters["policy/policy"];
      // console.log(policy);
      // return policy.find((item) => item.id === this.$route.params.id);
    },
  },
  data(){
      return{
          showLimitCalcTypeDialog: false,
          calculation_type: '',
          selectedIndex: null,
          selectedService: null
      }
  },
  methods: {
      serviceExistsInPlan(index, service){
          let plan = this.policy.plans[index];
          return  plan.services.find((planService) => planService && planService.id === service.id) ? true : false;
        //   console.log(service, plan);

      },
      removeServiceFromPlan(index, service){
          let plan = this.policy.plans[index];
          this.$store.dispatch('policy/remove_service_from_plan', {planId: plan.id, serviceId: service.id});
      },
      
      showDialog(index, service){
        this.showLimitCalcTypeDialog = true;
        this.selectedIndex = index;
        this.selectedService = service;
      },

      addServiceToPlan(index, service){
          let plan = this.policy.plans[index];
          this.$store.dispatch('policy/add_service_to_plan', {planId: plan.id, service: service, calculation_type: this.calculation_type});
      },
      closeDialog(value = null){
          if(value){
              this.calculation_type = value;
              this.addServiceToPlan(this.selectedIndex, this.selectedService)
          }
          this.showLimitCalcTypeDialog = false;
      }
  }
};
</script>

<style>
</style>