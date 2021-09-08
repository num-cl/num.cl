<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>
        {{ title }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ subtitle }}
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
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
  },
  methods: {
    copy() {
      this.$emit("copy-callback", this.subtitle, this.title);
    }
  },
};
</script>
