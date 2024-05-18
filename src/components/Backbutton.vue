<template>
  <button @click="goBack" class="back-button">
    <img src="@/img/back.png" alt="뒤로가기" />
  </button>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.back-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px;
  width: 36px;
  height: 36px;
}
.back-button img {
  width: 36px;
  height: 36px;
}
</style>
