<template>
  <base-dialog :dialog="dialog" @closeDialog="closeDialog">
    <template #title> {{ isEdit ? "Update" : "Create" }} Service Limit Group </template>
    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Service Limit Group Name*"
          required
          v-model="limitGroup.name"
          :error-messages="getErrors('limitGroup.name', $v.limitGroup.name)"
          @input="$v.limitGroup.name.$touch()"
          @blur="$v.limitGroup.name.$touch()"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Description"
          type="text"
          required
          v-model="limitGroup.description"
          :error-messages="getErrors('limitGroup.description', $v.limitGroup.description)"
          @input="$v.limitGroup.description.$touch()"
          @blur="$v.limitGroup.description.$touch()"
        ></v-text-field>
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
    if(this.isEdit){
      this.limitGroup = this.$store.getters["serviceLimitGroup/serviceLimitGroup"];
      console.log(this.limitGroup);
    }
  },
  data() {
    return {
      limitGroup: {
        id: "",
        name: "",
        description: "",
      },
    };
  },
  validations() {
    return {
      limitGroup: {
        name: {
          required,
          minLength: minLength(5),
          maxLength: maxLength(50),
          alphaNum,
        },
        description: { maxLength: maxLength(255), alphaNum },
      },
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },

    saveProvider() {
      if (this.isEdit) {
        this.$store.dispatch("serviceLimitGroup/update_service_limit_group", this.limitGroup);
      } else {
        this.$store.dispatch("serviceLimitGroup/create_service_limit_group", this.limitGroup);
      }
      this.closeDialog();
    },
  },
};
</script>

<style>
</style>