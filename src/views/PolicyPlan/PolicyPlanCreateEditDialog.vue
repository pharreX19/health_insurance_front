<template>
  <v-row justify="center">
    <base-dialog :dialog="dialog" @closeDialog="closeDialog">
      <template #title> {{ isEdit ? "Update" : "Create" }} Policy </template>
      <v-container>
        {{ plan }}
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Plan name*"
              required
              v-model="plan.name"
              :error-messages="getErrors('plan.name', $v.plan.name)"
              @input="$v.plan.name.$touch()"
              @blur="$v.plan.name.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Plan premium*"
              type="number"
              v-model="plan.premium"
              required
              prefix="MVR"
              :error-messages="getErrors('plan.premium', $v.plan.premium)"
              @input="$v.plan.premium.$touch()"
              @blur="$v.plan.premium.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Plan limit total*"
              type="number"
              v-model="plan.limit_total"
              prefix="MVR"
              required
              :error-messages="
                getErrors('plan.limit_total', $v.plan.limit_total)
              "
              @input="$v.plan.limit_total.$touch()"
              @blur="$v.plan.limit_total.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <div class="text-left font-weight-bold">
              Service limit groups limit total*
            </div>
          </v-col>
        </v-row>
        <v-row
          v-for="serviceLimitGroup in serviceLimitGroups"
          :key="serviceLimitGroup.id"
        >
          <v-col cols="7">
            <v-subheader>{{ serviceLimitGroup.name }}*</v-subheader>
          </v-col>
          <v-col cols="5">
            <v-text-field
              v-if="isEdit"
              type="number"
              min="1"
              @blur="handleChange(serviceLimitGroup)"
              label="Amount"
              prefix="MVR"
              :value="serviceLimitGroup.pivot.limit_total"
            ></v-text-field>

            <v-text-field
              v-else
              type="number"
              min="1"
              @blur="handleChange(serviceLimitGroup)"
              label="Amount"
              prefix="MVR"
              placeholder="100.0"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <template #button>
        <v-btn
          color="blue darken-1"
          :disabled="$v.$invalid"
          text
          @click="savePlan"
        >
          Save
        </v-btn>
      </template>
    </base-dialog>
  </v-row>
</template>

<script>
import BaseDialog from "../../components/dialogs/BaseDialog.vue";
import validation_mixin from "../../mixins/validation_mixin";
import {
  required,
  maxLength,
  minLength,
  minValue,
  maxValue,
  alphaNum,
  decimal,
} from "vuelidate/lib/validators";

export default {
  components: { BaseDialog },
  mixins: [validation_mixin],
  beforeMount() {
    console.log(this.isEdit);
    this.$store.dispatch("serviceLimitGroup/get_service_limit_groups", true);

    if (this.isEdit) {
      this.plan = this.$store.getters["plan/model"];
    }
  },
  computed: {
    serviceLimitGroups() {
      if (this.isEdit) {
        return this.plan.service_limit_groups;
        //   let temp = this.plan.service_limit_groups.map((limitGroup) => {
        //     return limitGroup.pivot;
        //   });
        //   console.log(temp);
        //   return temp;
      } else {
        return this.$store.getters["serviceLimitGroup/serviceLimitGroups"];
      }
    },
  },
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    isEdit: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      limit_total: 0.0,
      planServiceLimitGroups: [],

      plan: {
        id: "",
        name: "",
        premium: 100.0,
        limit_total: 100.0,
      },
    };
  },
  validations() {
    return {
      // limit_total: {
      //   required,
      //   minValue: minValue(100),
      //   maxValue: maxValue(99999999.99),
      //   decimal,
      // },
      plan: {
        name: {
          required,
          minLength: minLength(5),
          maxLength: maxLength(50),
          alphaNum,
        },
        premium: {
          required,
          minValue: minValue(100),
          maxValue: maxValue(99999999.99),
          decimal,
        },
        limit_total: {
          required,
          minValue: minValue(100),
          maxValue: maxValue(99999999.99),
          decimal,
        },
      },
    };
  },
  methods: {
    handleChange(limitGroup) {
      console.log(this.plan.id);
      let temp = this.planServiceLimitGroups.filter((item) => {
        return item.service_limit_group_id != limitGroup.id;
      });
      this.planServiceLimitGroups = temp;

      this.planServiceLimitGroups.push({
        service_limit_group_id: limitGroup.id,
        limit_total: parseFloat(event.target.value),
      });
    },
    closeDialog() {
      this.$emit("closeDialog");
    },
    savePlan() {
      this.plan["policy_id"] = this.$route.params.id;
      if (this.isEdit) {
        this.$store
          .dispatch("plan/update_model", {
            url: "/plans",
            id: this.plan.id,
            data: this.plan,
          })
          .then(() => {
            this.savePlanServiceLimitGroup(this.plan.id);
          });
      } else {
        this.$store
          .dispatch("plan/create_model", { url: "/plans", data: this.plan })
          .then((response) => {
            // console.log(response);
            this.savePlanServiceLimitGroup(response.data.data.id);
          });
      }
    },

    savePlanServiceLimitGroup(plan_id) {
      if (this.isEdit) {
        this.$store
          .dispatch("plan/add_plan_service_limit_groups", {
            url: `/plans/${plan_id}/service-limit-groups`,
            data: this.planServiceLimitGroups,
          })
          .then(() => this.fetchPolicyPlans());
      } else {
        this.$store.dispatch("plan/add_plan_service_limit_groups", {
          url: `/plans/${plan_id}/service-limit-groups`,
          data: this.planServiceLimitGroups,
        }).then(() => this.fetchPolicyPlans());
      }
      this.closeDialog();
    },

    fetchPolicyPlans() {
      console.log('====> REFETCHING');
      this.$store.dispatch(
        "plan/get_models",
        `policies/${this.$route.params.id}?include=plans.serviceLimitGroups`,
        true
      );
    },
  },
};
</script>

<style>
</style>