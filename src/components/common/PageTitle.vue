<template>
  <v-row>
      <v-col cols="12">
        <v-list-item two-line :class="alignment">
          <v-list-item-content>
            <v-list-item-title>
              <p class="text-h4 font-weight-light">
                {{title}}
              </p>
            </v-list-item-title>
            <v-list-item-subtitle
              class="text-subtitle-1 font-weight-light"
              >{{subtitle}}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        subtitle: {
            type: String,
            required: false,
        },
        alignment: {
          type: String,
          required: false, 
          default: 'text-left'
        }
    }
}
</script>

<style>

</style>