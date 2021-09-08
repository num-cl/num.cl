<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <h1 class="text-h3 text-center mb-2">
        {{ userData.name }}
      </h1>
      <h3 class="text-h7 text-md-h6 text-center mb-2 font-weight-light">
        Mis datos bancarios son:
      </h3>
      <existing-user-list :data="userData" />
    </v-col>
  </v-row>
</template>

<script>
import ExistingUserList from '~/components/lists/ExistingUser.vue';

const USERS = {
  dani: {
    name: 'Daniel Leal',
    rut: '23153234-2',
    bank: 'Banco de Crédito e Inversiones (Bci)',
    accountType: 'Cuenta Corriente',
    accountNumber: '56445416',
    email: 'daniel@fintoc.com',
  },
};

export default {
  head() {
    return {
      title: `num.cl - ${this.userData?.name || 'Loading...'}`,
    };
  },
  data: () => ({
    userData: null,
  }),
  components: {
    ExistingUserList,
  },
  computed: {
    username() {
      return this.$route.params.username;
    },
  },
  async fetch() {
    this.userData = USERS[this.username];
  },
};
</script>
