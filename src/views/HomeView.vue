<template><div /></template>
<script>
import { mapGetters } from 'vuex';

export default {
  computed: mapGetters('auth', ['purchasedCourses']),
  mounted() {
    if (!this.purchasedCourses.length) {
      this.$router.push('/profile');
    } else {
      this.$router.push({
        name: 'material',
        params: {
          page: this.purchasedCourses[0].home_page_slug,
        },
      });
    }
  },
};
</script>
