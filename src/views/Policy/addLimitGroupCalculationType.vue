<template>
  <v-row justify="center">
    <v-dialog :value="dialog" @input="$emit('update:dialog', false)" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Limit calculation type</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                    placeholder="Limit Calculation Type*"
                    :items="calculation_types"
                    item-text="name"
                    item-value="id"
                    v-model="calculation_type"
                >
                </v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-text-field
                    placeholder="Service coverage limit"
                    v-model="limit_total"
                >
                </v-text-field>
              </v-col>
            </v-row>
            
          </v-container>
          <small>*Indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close_dialog">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="select_calculation_type">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
    props: {
      dialog: {
        type: Boolean,
        default: false
      }
    },
    mounted(){
        this.$store.dispatch('calculation_type/get_calculation_types');
    },
    computed: {
        calculation_types(){
            return this.$store.getters['calculation_type/calculationTypes']
        }
    },
    data(){
      return{
        calculation_type: '',
        limit_total: ''
      }
    },
    methods: {
      close_dialog(){
        this.$emit('closeDialog');
      },
      select_calculation_type(){
        this.$emit('closeDialog', this.calculation_type);
      }
    }
};
</script>

<style>
</style>