<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <h1 class="text-h4 text-md-h3 text-center mb-2">Registra tu cuenta y comparte los datos</h1>
      <h3 class="text-h7 text-md-h6 text-center mb-2 font-weight-light">
        Al registrarte obtendrás un <span class="font-weight-bold">enlace único</span> que luego podrás compartir con quien quieras.
      </h3>
      <new-user-form />
    </v-col>
  </v-row>
</template>

<script>
import NewUserForm from '~/components/forms/NewUser';

export default {
  components: {
    NewUserForm,
  },
};
</script>
