<template>
  <div class="certificates">
    <AppSpinner v-if="!isLoaded" />
    <div v-else class="certificates__list">
      <h1>Мои сертификаты</h1>
      <ol>
        <li v-for="(certificate, key) in signleLanguageCertificates" :key="key">
          <UiLink :href="certificate.url" target="_blank">{{ certificate.course.name }}</UiLink>
        </li>
      </ol>
      <p>
        См. также:
        <UiLink href="https://youtu.be/MBgwkpGwHeE" class="certificates__linkedin">Как добавить дипломы в linkedin</UiLink>
      </p>
    </div>
  </div>
</template>
<script>
import AppSpinner from '@/components/AppSpinner';
import UiLink from '@/components/ui-kit/UiLink';

import axios from '@/api/backend.js';

export default {
  components: {
    AppSpinner,
    UiLink,
  },
  data() {
    return {
      isLoaded: false,
      certificates: [],
    };
  },
  computed: {
    signleLanguageCertificates() {
      return this.certificates.filter((certificate, index) => {
        return this.certificates.findIndex((i) => i.course.name === certificate.course.name) === index;
      });
    },
  },

  async created() {
    this.isLoaded = false;
    const response = await axios.get('/api/v2/diplomas/');
    this.certificates = response.data.results;
    this.isLoaded = true;
  },
};
</script>
<style lang="postcss" scoped>
.certificates {
  &__linkedin {
    opacity: 0.8;
  }
}
</style>
