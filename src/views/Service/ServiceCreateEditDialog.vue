<template>
  <base-dialog :dialog="dialog" @closeDialog="closeDialog">
    <template #title> {{ isEdit ? "Update" : "Create" }} Service </template>
    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Service Name*"
          required
          v-model="service.name"
          :error-messages="getErrors('service.name', $v.service.name)"
          @input="$v.service.name.$touch()"
          @blur="$v.service.name.$touch()"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Description"
          type="text"
          required
          v-model="service.description"
          :error-messages="getErrors('service.description', $v.service.description)"
          @input="$v.service.description.$touch()"
          @blur="$v.service.description.$touch()"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
       <v-col cols="6">
        <v-select
          placeholder="Service Type*"
          :items="service_types"
          item-text="name"
          return-object
          label="Service type"
          v-model="service.service_type"
          :error-messages="getErrors('service.service_type', $v.service.service_type)"
          @input="$v.service.service_type.$touch()"
          @blur="$v.service.service_type.$touch()"
          >
        </v-select>
      </v-col>
      
      <v-col cols="12" md="6">
        <v-select
          placeholder="Service Limit Group*"
          :items="service_limit_group"
          item-text="name"
          return-object
          label="Service limit group"
          v-model="service.service_limit_group"
          :error-messages="getErrors('service.service_limit_group', $v.service.service_limit_group)"
          @input="$v.service.service_limit_group.$touch()"
          @blur="$v.service.service_limit_group.$touch()"
          >
        </v-select>
      </v-col>
    </v-row>

    <template #button>
      <v-btn
        color="blue darken-1"
        :disabled="$v.$invalid"
        text
        @click="saveProvider"
      >
        Save
      </v-btn>
    </template>
  </base-dialog>
</template>

<script>
import BaseDialog from "../../components/dialogs/BaseDialog.vue";
import validation_mixin from "../../mixins/validation_mixin";
import {
  required,
  maxLength,
  minLength,
  alphaNum,
} from "vuelidate/lib/validators";

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
      default: false,
    },
  },
  beforeMount() {
    this.$store.dispatch("serviceType/get_service_types", false);
    this.$store.dispatch("serviceLimitGroup/get_service_limit_groups", false);
    this.service = this.$store.getters["service/service"];
  },
  computed: {
    service_types() {
      return this.$store.getters["serviceType/serviceTypes"];
    },

    service_limit_group() {
      return this.$store.getters["serviceLimitGroup/serviceLimitGroups"];
    },
  },
  data() {
    return {
      service: {
        id: "",
        name: "",
        description: "",
        service_type: "",
        service_limit_group: "",
        is_active: true,
      },
    };
  },
  validations() {
    return {
      service: {
        name: {
          required,
          minLength: minLength(5),
          maxLength: maxLength(50),
          alphaNum,
        },
        description: { maxLength: maxLength(255), alphaNum },
        service_type: {required},
        service_limit_group: {required}
      },
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },

    saveProvider() {
      console.log(this.service);
      if (this.isEdit) {
        this.$store.dispatch("service/update_service", this.service);
      } else {
        this.$store.dispatch("service/create_service", this.service);
      }
      this.closeDialog();
    },
  },
};
</script>

<style>
</style>