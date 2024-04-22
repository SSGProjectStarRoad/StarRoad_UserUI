<template>
  <div class="contents">
    <img src="@/img/spaceman_big.png" alt="" />
    <h2>탐색 중</h2>
  </div>
</template>

<script>
export default {};
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
