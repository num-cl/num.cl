<template>
  <v-text-field
    :label="label"
    :rules="computedRules"
    :hint="hint"
    v-model="innerValue"
    hide-details="auto"
    persistent-hint
  />
</template>

<script>
export default {
  data: () => ({
    innerValue: '',
  }),
  props: {
    label: {
      type: String,
      required: true,
    },
    hint: {
      type: String,
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
        return [...this.rules, (value) => !!value || 'Este campo debe ser llenado!'];
      }
      return this.rules;
    },
  },
  watch: {
    innerValue(value) {
      this.$emit('input', value);
    },
  },
}
</script>
