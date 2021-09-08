<template>
  <v-text-field
    :label="label"
    :rules="computedRules"
    :hint="hint"
    v-model="value"
    :type="type"
    hide-details="auto"
    persistent-hint
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
    hint: {
      type: String,
    },
    type: {
      type: String,
      default: 'text',
    },
    required: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    computedRules() {
      if (this.required) {
        return [(value) => !!value || 'Este campo debe ser llenado!', ...this.rules];
      }
      return this.rules;
    },
  },
  watch: {
    value(value) {
      this.$emit('input', value);
    },
  },
}
</script>
