<template>
  <v-row justify="center">
    <base-dialog :dialog="dialog" @closeDialog="closeDialog">
      <template #title> {{ isEdit ? "Update" : "Create" }} Policy </template>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Policy name*"
              required
              v-model="policy.name"
              :error-messages="getErrors('policy.name', $v.policy.name)"
              @input="$v.policy.name.$touch()"
              @blur="$v.policy.name.$touch()"    
            ></v-text-field>
          </v-col>
        </v-row>
        <div class="text-body-1 mt-4 text-left">Polciy number format*</div>
        <v-row>
          <v-col cols="3">
            <v-select
              :items="items"
              placeholder="Sequence"
              item-text="item"
              item-value="item"
              v-model="number_format[0]"
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-select
              :items="items"
              item-text="item"
              item-value="item"
              placeholder="Year"
              v-model="number_format[1]"
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-select
              :items="items"
              item-text="item"
              item-value="item"
              placeholder="Month"
              v-model="number_format[2]"
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-select
              :items="items"
              item-text="item"
              item-value="item"
              placeholder="Constant"
              v-model="number_format[3]"
            ></v-select>
          </v-col>
        </v-row>
        <v-row v-if="isConstSelected()">
          <v-col cols="12">
            <v-text-field
              label="Custom Value"
              type="text"
              v-model="format_const"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <template #button>
        <v-btn
          color="blue darken-1"
          :disabled="$v.$invalid"
          text
          @click="savePolicy"
        >
          Save
        </v-btn>
      </template>
    </base-dialog>
  </v-row>

  <!-- <div>
    <v-dialog
      :value="dialog"
      @input="$emit('update:dialog', false)"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Create Policy</span>
        </v-card-title>
        <v-card-text>
          <v-container>
           
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog"> Close </v-btn>
          <v-btn color="blue darken-1" text @click="savePolicy"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div> -->
</template>

<script>
import BaseDialog from "../../components/dialogs/BaseDialog.vue";
import validation_mixin from "../../mixins/validation_mixin";
import { required, maxLength, minLength, alphaNum } from 'vuelidate/lib/validators';

export default {
  components: { BaseDialog },
  mixins: [validation_mixin],
   beforeMount() {
     console.log(this.isEdit);
    if (this.isEdit) {
      let temp =
        this.$store.getters["policy/policy"];
        this.policy = temp;
        temp.number_format.split('_').map((element) => {
          if(this.items.includes(element.toLowerCase())){
            this.number_format.push(element.toLowerCase());
          }else{
            this.number_format.push('const');
            console.log(element);
            this.format_const = element;
          }
        })
    }
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
    }
  },
  data() {
    return {
      items: ["year", "month", "seq", "const"],
      number_format: [],
      format_const: "",
      policy: {
        id: "",
        name: "",
        number_format: "",
      },
    };
  },
  validations() {
    return {
      policy: {
        name: {required, minLength: minLength(5), maxLength: maxLength(50), alphaNum},        
      },
    }
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    savePolicy() {
      if (this.format_const) {
        let index = this.number_format.findIndex((item) => item === "const");
        this.number_format[index] = this.format_const;
      }else{
        this.number_format = ['year', 'month', 'seq'];
      }
      this.policy.number_format = this.number_format.join("_");
      if(this.isEdit){
        this.$store.dispatch("policy/update_policy", this.policy);
      }else{
        this.$store.dispatch("policy/create_policy", this.policy);
      }
      this.closeDialog();
    },
    isConstSelected() {
      return this.number_format.includes("const");
    },
  },
};
</script>

<style>
</style>