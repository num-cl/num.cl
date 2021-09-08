<template>
  <v-card class="pb-2">
    <Input
      class="pt-6 mx-4"
      label="Nombre Completo"
      v-model="name"
      required
    />
    <Input
      class="pt-6 mx-4"
      label="Email"
      v-model="email"
      :rules="emailRules"
      type="email"
      required
    />
    <Input
      class="pt-6 mx-4"
      label="RUT"
      hint="Ejemplo: 23153234-2"
      v-model="rut"
      required
    />
    <Input
      class="pt-6 mx-4"
      label="Número de Cuenta"
      v-model="accountNumber"
      required
    />
    <Dropdown
      class="mb-n2 pt-6 mx-4"
      label="Banco"
      :items="banks"
      v-model="bank"
      required
    />
    <Dropdown
      class="mb-n4 pt-6 mx-4"
      label="Tipo de Cuenta"
      :items="accountTypes"
      v-model="accountType"
      required
    />
    <Input
      class="pt-6 mx-4"
      label="Alias para num"
      :hint="aliasHint"
      v-model="alias"
      required
    />
    <v-card-actions class="mt-4">
      <v-spacer />
      <v-btn
        color="primary"
        x-large
      >
        Crear mi num
      </v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script>
import Input from './components/Input';
import Dropdown from './components/Dropdown';

import { BANKS, ACCOUNT_TYPES } from '~/utils/constants';
import { EMAIL_VALIDATION } from '~/utils/validations';

export default {
  data: () => ({
    name: '',
    email: '',
    rut: '',
    accountNumber: '',
    bank: '',
    accountType: '',
    alias: '',
    emailRules: [
      (email) => EMAIL_VALIDATION('Formato de email inválido!')(email),
    ],
  }),
  components: {
    Input,
    Dropdown,
  },
  computed: {
    aliasHint() {
      if (this.alias.trim() !== '') {
        return `Tu num será: https://num.cl/${this.alias}`;
      }
      return 'Elige un alias para tu num!';
    },
    banks() {
      return BANKS;
    },
    accountTypes() {
      return ACCOUNT_TYPES;
    },
  },
  watch: {
    bank() {
      console.log(this.bank);
    }
  },
};
</script>
