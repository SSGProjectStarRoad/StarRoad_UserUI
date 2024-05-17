<template>
  <div class="contents">
    <img class="search-img" src="@/img/spaceman_big.png" alt="" />
    <h2>탐색 중</h2>
    <h3>쿠폰을 사용하여 탐색을 완료해 보세요</h3>
  </div>
</template>

<script>
export default {
  methods: {
    // confirmUse() {
    //   this.$router.push('/reward/select?modal=true'); // 쿼리 파라미터로 모달 상태 전달
    // },
    confirmgetstar() {
      this.$router.push('/reward/getstar'); // 쿼리 파라미터로 모달 상태 전달
    },
  },
};
</script>

<style scoped>
.search-img {
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0px 0px 20px var(--mint-color);
}
img {
  position: absolute;
  width: 200px;
  height: 200px;
  top: 200px;
  left: 50%; /* 왼쪽으로부터 50%의 위치에 배치 */
  transform: translate(-50%, -50%); /* 위치 보정을 위해 변환 사용 */
  margin: 0 auto;
}
h2 {
  display: block;
  position: absolute;
  top: 380px;
  left: 50%; /* 왼쪽으로부터 50%의 위치에 배치 */
  transform: translate(-50%, -50%); /* 위치 보정을 위해 변환 사용 */
  margin: 0 auto;
  color: var(--mint-color);
}
h3 {
  display: block;
  position: absolute;
  width: 300px;
  top: 440px;
  left: 50%; /* 왼쪽으로부터 50%의 위치에 배치 */
  transform: translate(-50%, -50%); /* 위치 보정을 위해 변환 사용 */
  margin: 0 auto;
  color: black;
  text-align: center;
}
</style>
