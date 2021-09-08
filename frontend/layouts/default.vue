<template>
  <v-app dark>
    <v-main>
      <Header class="mb-4" />
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from '~/components/Header.vue';

export default {
  data: () => ({
    items: [
      {
        name: 'index',
        path: '/',
        component: 'pages/index.vue',
      },
      {
        name: 'validation-pending',
        path: '/validation/pending',
        component: 'pages/validation/pending.vue',
      },
      {
        name: 'user-data',
        path: '/:username',
        component: 'pages/_username.vue'
      },
    ],
  }),
  components: {
    Header,
  },
};
</script>

<style>
html {
  overflow-y: auto;
}
</style>
