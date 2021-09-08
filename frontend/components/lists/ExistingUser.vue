<template>
  <v-card class="pb-1">
    <v-list>
      <list-element
        :data="data.name"
        label="Nombre"
        @copy-callback="attributeCopied"
      />
      <v-divider />
      <list-element
        :data="data.rut"
        label="RUT"
        @copy-callback="attributeCopied"
      />
      <v-divider />
      <list-element
        :data="data.bank"
        label="Banco"
        @copy-callback="attributeCopied"
      />
      <v-divider />
      <list-element
        :data="data.accountType"
        label="Tipo de Cuenta"
        @copy-callback="attributeCopied"
      />
      <v-divider />
      <list-element
        :data="data.accountNumber"
        label="Número de Cuenta"
        @copy-callback="attributeCopied"
      />
      <v-divider />
      <list-element
        :data="data.email"
        label="Email"
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
      const copying = [
        this.data.name,
        this.data.rut,
        this.data.bank,
        this.data.accountType,
        this.data.accountNumber,
        this.data.email,
      ].join('\n');
      this.$clipboard(copying);
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
