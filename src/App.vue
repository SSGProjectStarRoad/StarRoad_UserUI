<template>
  <div class="wrapper">
    <Header v-if="showHeaderFooter" />
    <loading-spinner v-if="loading" />
    <router-view />
    <Footer v-if="showHeaderFooter" />
  </div>
</template>

<script>
import Header from '@/views/Header.vue';
import Footer from '@/views/Footer.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { EventBus } from '@/eventBus';

export default {
  components: {
    Header,
    Footer,
    LoadingSpinner,
  },
  data() {
    return {
      showHeaderFooter: true,
      loading: false,
    };
  },
  watch: {
    $route(to) {
      this.checkRoute(to);
    },
  },
  created() {
    this.checkRoute(this.$route);
    EventBus.on('loading', status => {
      this.loading = status;
    });
  },
  methods: {
    checkRoute(route) {
      const noHeaderFooterRoutes = [
        '/login',
        '/login/register',
        '/login/forgotpw',
      ];
      this.showHeaderFooter = !noHeaderFooterRoutes.includes(route.path);
    },
  },
  beforeUnmount() {
    EventBus.off('loading');
  },
};
</script>

<style>
@import './css/common.css';
</style>
