<template>
  <div class="contents">
    <img src="@/img/spaceman_big.png" alt="" />
    <h2>탐색 중</h2>
    <!-- 임시태그 -->
    <button @click="confirmUse">쿠폰사용완료</button>
  </div>
</template>

<script>
export default {
  methods: {
    confirmUse() {
      this.$router.push('/reward/select?modal=true'); // 쿼리 파라미터로 모달 상태 전달
    },
  },
};
</script>

<style scoped>
img {
  position: absolute;
  top: 270px;
  left: 50%; /* 왼쪽으로부터 50%의 위치에 배치 */
  transform: translate(-50%, -50%); /* 위치 보정을 위해 변환 사용 */
  margin: 0 auto;
}
h2 {
  display: block;
  position: absolute;
  top: 500px;
  left: 50%; /* 왼쪽으로부터 50%의 위치에 배치 */
  transform: translate(-50%, -50%); /* 위치 보정을 위해 변환 사용 */
  margin: 0 auto;
}
</style>
