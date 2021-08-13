<template>
  <v-row justify="center">
  <base-dialog :dialog="dialog" @closeDialog="closeDialog">
  <template #title>
      {{ isEdit ? "Update" : "Create" }} Role
    </template>
    <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Role*"
                  required
                  v-model="role.name"
                  :error-messages="getErrors('role.name', $v.role.name)"
                  @input="$v.role.name.$touch()"
                  @blur="$v.role.name.$touch()"     
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <template #button>
      <v-btn color="blue darken-1" :disabled="$v.$invalid" text @click="saveRole"> Save </v-btn>
    </template>

    </base-dialog>
  </v-row>
</template>

<script>
import { required, maxLength, minLength } from 'vuelidate/lib/validators';
import BaseDialog from '../../components/dialogs/BaseDialog.vue';
import validation_mixin from '../../mixins/validation_mixin';
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
    if (this.isEdit) {
      this.role =
        this.$store.getters["role_permission/role"];
        console.log(this.role);
    }
  },

  data() {
    return {
      role: {
        id: "",  
        name: "",
      },
    };
  },
  validations() {
    return {
      role: {
        name: {required, minLength: minLength(5), maxLength: maxLength(50)},
      },
    }
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog", this.company);
    },

    saveRole() {
      if (this.isEdit) {
        this.$store.dispatch("role_permission/update_role", this.role);
      } else {
        this.$store.dispatch("role_permission/create_role", this.role);
      }
      this.closeDialog();
    },
  },
};
</script>

<style>
</style>