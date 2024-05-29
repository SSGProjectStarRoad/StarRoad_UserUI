<template>
  <div class="wrapper">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
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
      isModalVisible: false,
    };
  },
};
</script>

<style>
/* @import './css/reset.css'; */
@import './css/common.css';
</style>
