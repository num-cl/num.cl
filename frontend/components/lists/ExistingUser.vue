<template>
  <v-card class="pb-1">
    <v-list>
      <list-element
        :title="data.name"
        subtitle="Nombre"
        @copy-callback="attributeCopied"
      />
      <v-divider />
      <list-element
        :title="data.rut"
        subtitle="RUT"
        @copy-callback="attributeCopied"
      />
      <v-divider />
      <list-element
        :title="data.bank"
        subtitle="Banco"
        @copy-callback="attributeCopied"
      />
      <v-divider />
      <list-element
        :title="data.accountType"
        subtitle="Tipo de Cuenta"
        @copy-callback="attributeCopied"
      />
      <v-divider />
      <list-element
        :title="data.accountNumber"
        subtitle="Número de Cuenta"
        @copy-callback="attributeCopied"
      />
      <v-divider />
      <list-element
        :title="data.email"
        subtitle="Email"
        @copy-callback="attributeCopied"
      />
    </v-list>
    <v-divider />
    <v-card-actions class="mt-4">
      <v-spacer />
        <v-btn
          color="primary"
          x-large
          @click="copyAll"
        >
          Copiar todos los datos
        </v-btn>
      <v-spacer />
    </v-card-actions>
    <snackbar
      :active="snackbarActive"
      :text="snackbarText"
      button-text="Cerrar"
      @button-click="closeSnackbar"
      @close="closeSnackbar"
    />
  </v-card>
</template>

<script>
import ListElement from './components/ListElement.vue';
import Snackbar from '~/components/Snackbar';

export default {
  data: () => ({
    snackbarActive: false,
    snackbarText: '',
  }),
  components: {
    ListElement,
    Snackbar,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    attributeCopied(attribute) {
      const text = `Se copió el ${attribute.toLowerCase()} al portapapeles.`;
      this.openSnackbar(text);
    },
    copyAll() {
      const text = 'Todos los atributos fueron copiados al portapapeles.';
      this.openSnackbar(text);
    },
    openSnackbar(text) {
      this.snackbarText = text;
      this.snackbarActive = true;
    },
    closeSnackbar() {
      this.snackbarActive = false;
    },
  },
};
</script>
