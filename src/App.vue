<template>
  <div class="wrapper">
    <Header v-if="showHeaderFooter"></Header>
    <router-view></router-view>
    <Footer v-if="showHeaderFooter"></Footer>
  </div>
</template>

<script>
import Header from '@/views/Header.vue';
import Footer from '@/views/Footer.vue';

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      showHeaderFooter: true,
    };
  },
  watch: {
    $route(to) {
      this.checkRoute(to);
    },
  },
  created() {
    this.checkRoute(this.$route);
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
};
</script>

<style>
@import './css/common.css';
</style>
