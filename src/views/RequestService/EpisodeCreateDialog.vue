<template>
  <v-row justify="center">
    <base-dialog :dialog="dialog" @closeDialog="closeDialog">
      <template #title> Create Episode </template>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Memo number*"
              required
              v-model="episode.memo_number"
              :error-messages="getErrors('episode.memo_number', $v.episode.memo_number)"
              @input="$v.episode.memo_number.$touch()"
              @blur="$v.episode.memo_number.$touch()"     
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <template #button>
        <v-btn color="blue darken-1" text @click="saveEpisode" :disabled="$v.$invalid"> Save </v-btn>
      </template>
    </base-dialog>
    <!-- <v-dialog :value="dialog" @input="$emit('update:dialog', false)" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Create Consultation</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            
            
          </v-container>
          <small>*Indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close_dialog">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="save_episode">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </v-row>
</template>

<script>
import BaseDialog from "../../components/dialogs/BaseDialog.vue";
import validation_mixin from "../../mixins/validation_mixin";
import { required, maxLength, minLength} from 'vuelidate/lib/validators';

export default {
  components: { BaseDialog },
  mixins: [validation_mixin],
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      episode: {
        memo_numer: "",
      },
    };
  },
  validations() {
    return {
      episode: {
        memo_number: {required, minLength: minLength(3), maxLength: maxLength(20)},
      },
    }
  },
  
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    saveEpisode() {
      this.episode.subscriber_id = this.$route.params.id;
      this.episode.service_provider_id = 1;
      this.$store.dispatch("episode/create_episode", this.episode);
      // this.$emit('closeDialog', this.episode);
      this.closeDialog();
      Object.getOwnPropertyNames(this.episode).forEach((prop) => {
        this.episode[prop] = "";
      });
    },
  },
};
</script>

<style>
</style>