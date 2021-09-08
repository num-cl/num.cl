<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>
        {{ data }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ label }}
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-icon>
      <v-btn @click="copy">
        Copiar
        <v-icon right>mdi-content-copy</v-icon>
      </v-btn>
    </v-list-item-icon>
  </v-list-item>
</template>

<script>
export default {
  props: {
    data: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  methods: {
    copy() {
      this.$clipboard(this.data);
      this.$emit("copy-callback", this.label, this.data);
    }
  },
};
</script>
