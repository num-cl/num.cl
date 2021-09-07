<template>
  <v-card>
    <Input
      class="pt-6 mx-4"
      label="Nombre Completo"
    />
    <Input
      class="pt-6 mx-4"
      label="Email"
    />
    <Input
      class="pt-6 mx-4"
      label="RUT"
    />
    <Input
      class="pt-6 mx-4"
      label="Número de Cuenta"
    />




    <Input
      class="pt-6 mx-4"
      label="Alias para num"
      :hint="numHint"
      v-model="alias"
      required
    />
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="primary"
        nuxt
        to="/inspire"
      >
        Continue
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Input from '~/components/Input';

export default {
  data: () => ({
    alias: '',
  }),
  components: {
    Input,
  },
  computed: {
    numHint() {
      if (this.alias.trim() !== '') {
        return `Tu num será: https://num.cl/${this.alias}`;
      }
      return 'Elige un alias para tu num!';
    },
  },
};
</script>
