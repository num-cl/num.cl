<template>
  <v-snackbar :value="active" @input="mutate" >
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn
        color="pink"
        text
        v-bind="attrs"
        @click="$emit('button-click')"
      >
        {{ buttonText }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    mutate(value) {
      if (!value) {
        this.$emit('close');
      }
    },
  },
};
</script>
