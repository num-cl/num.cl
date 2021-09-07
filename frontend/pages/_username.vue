<template>
  <div>
    {{ username }}
  </div>
</template>

<script>
export default {
  computed: {
    username() {
      return this.$route.params.username;
    },
  },
};
</script>
