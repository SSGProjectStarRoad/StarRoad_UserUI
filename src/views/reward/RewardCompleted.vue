<template>
  <div class="contents">
    <img src="@/img/telescope_big.png" alt="" />
    <h2>탐색 완료</h2>
    <h3 class="mystar" @click="goToMyStar">나의 별자리</h3>
  </div>
</template>

<script>
export default {
  methods: {
    goToMyStar() {
      this.$router.push('/reward/mystar');
    },
  },
};
</script>

<style scoped>
img {
  position: absolute;
  top: 190px;
  left: 50%; /* 왼쪽으로부터 50%의 위치에 배치 */
  transform: translate(-50%, -50%); /* 위치 보정을 위해 변환 사용 */
  margin: 0 auto;
}
h2 {
  display: block;
  position: absolute;
  top: 400px;
  left: 50%; /* 왼쪽으로부터 50%의 위치에 배치 */
  transform: translate(-50%, -50%); /* 위치 보정을 위해 변환 사용 */
  margin: 0 auto;
}

h3 {
  color: var(--navy-color);
  font-weight: 900;
  position: absolute;
  top: 450px;
  right: 40px;
  cursor: pointer;
  border-radius: 10px;
  padding: 8px;
  box-shadow: 0px 0px 2px var(--dgray-color);
}
</style>
