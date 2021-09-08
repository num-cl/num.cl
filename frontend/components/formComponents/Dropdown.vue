<template>
  <v-select
    :label="label"
    :items="items"
    :rules="computedRules"
    v-model="value"
  />
</template>

<script>
export default {
  data: () => ({
    value: '',
  }),
  props: {
    label: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedRules() {
      if (this.required) {
        return [(value) => !!value || 'Este campo debe ser llenado!'];
      }
      return [];
    },
  },
  watch: {
    value(value) {
      this.$emit('input', value);
    },
  },
};
</script>
