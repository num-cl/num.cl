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

      <h2 class="text-h4 text-center mt-16 mb-4">
        ¿Acabas de conocer num.cl?
      </h2>
      <h3 class="text-h7 text-md-h6 text-center mb-2 font-weight-light">
        ¡Te invitamos a <nuxt-link to="/">registrarte</nuxt-link>! Enviar tus datos bancarios
        nunca había sido tan fácil.
      </h3>

      <h2 class="text-h4 text-center mt-16 mb-4">
        ¿Tus datos están incorrectos?
      </h2>
      <h3 class="text-h7 text-md-h6 text-center mb-2 font-weight-light">
        Simplemente <nuxt-link to="/">vuelve a registrarte</nuxt-link> con tu mismo email :)
      </h3>
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
  async asyncData({ params, $axios, $firebase }) {
    const userData = USERS[params.username];
    return { userData }
  },
  head() {
    return {
      title: `num.cl - ${this.userData.name}`,
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: `${this.userData.name} | ${this.userData.rut}`,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: `${this.userData.bank} | ${this.userData.accountType} | ${this.userData.accountNumber} | ${this.userData.email}`,
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: `https://num.cl/${this.username}`,
        },
        {
          hid: 'fb:app_id',
          name: 'fb:app_id',
          content: '921373517372',
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'website',
        },
        {
          hid: 'og:locale',
          name: 'og:locale',
          content: 'es_LA',
        },
      ],
    };
  },
};
</script>
