<template>
  <div class="contents">
    <!-- 필요에 따라 back.png 살릴것 -->
    <!-- <img class="backimg" src="@/img/back.png" alt="" /> -->
    <img class="informicon" src="@/img/information.png" alt="" />
    <h1>별자리 찾기</h1>
    <h2>With One Click</h2>
    <img class="start" src="@/img/home_telescope.png" alt="" />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.informicon {
  margin-top: 30px;
  margin-left: 30px;
  width: 40px;
  height: 40px;
}
.contents h1 {
  display: inline-block;
  position: absolute;
  font-size: 40px;
  top: 120px;
  left: 50%; /* 왼쪽으로부터 50%의 위치에 배치 */
  transform: translate(-50%, -50%); /* 위치 보정을 위해 변환 사용 */
  margin: 0 auto;
}

h2 {
  display: inline-block;
  position: absolute;
  color: rgba(0, 0, 0, 0.7);
  font-size: 25px;
  top: 240px;
  left: 50%; /* 왼쪽으로부터 50%의 위치에 배치 */
  transform: translate(-50%, -50%); /* 위치 보정을 위해 변환 사용 */
  margin: 0 auto;
}

.start {
  display: inline-block;
  position: absolute;
  width: 120px;
  top: 380px;
  left: 50%; /* 왼쪽으로부터 50%의 위치에 배치 */
  transform: translate(-50%, -50%); /* 위치 보정을 위해 변환 사용 */
  margin: 0 auto;
}
</style>
