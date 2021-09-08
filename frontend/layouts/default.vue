<template>
  <v-app dark>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
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
};
</script>
