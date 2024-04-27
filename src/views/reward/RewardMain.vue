<template>
  <div class="contents">
    <!-- 필요에 따라 back.png 살릴것 -->
    <!-- <img class="backimg" src="@/img/back.png" alt="" /> -->
    <img class="informicon" src="@/img/information.png" alt="" />
    <h1>별자리 찾기</h1>
    <h2>With One Click</h2>
    <img
      class="start"
      src="@/img/home_telescope.png"
      alt=""
      @click="goToSelect"
    />
    <h3 class="mystar textshadow" @click="goToMyStar">나의 별자리</h3>
    <h3 class="mycoupon textshadow" @click="goToMyCoupons">나의 쿠폰 보기</h3>
  </div>
</template>

<script>
export default {
  methods: {
    goToSelect() {
      this.$router.push('/reward/select');
    },
    goToMyStar() {
      this.$router.push('/reward/mystar');
    },
    goToMyCoupons() {
      // 'mycoupons' 경로가 있다고 가정하고, 없으면 실제 경로에 맞게 수정하세요.
      this.$router.push('/reward/mycoupons');
    },
  },
};
</script>

<style scoped>
.contents {
  height: 100vh;
}
.informicon {
  margin-top: 60px;
  margin-left: 30px;
  width: 40px;
  height: 40px;
  cursor: pointer;
}
.contents h1 {
  display: inline-block;
  position: absolute;
  font-size: 40px;
  top: 150px;
  left: 50%; /* 왼쪽으로부터 50%의 위치에 배치 */
  transform: translate(-50%, -50%); /* 위치 보정을 위해 변환 사용 */
  margin: 0 auto;
}

h2 {
  display: inline-block;
  position: absolute;
  color: rgba(0, 0, 0, 0.7);
  font-size: 25px;
  top: 270px;
  left: 50%; /* 왼쪽으로부터 50%의 위치에 배치 */
  transform: translate(-50%, -50%); /* 위치 보정을 위해 변환 사용 */
  margin: 0 auto;
}

h3 {
  color: var(--navy-color);
  font-weight: 900;
  position: absolute;
  top: 530px;
  right: 40px;
  cursor: pointer;
}

.mycoupon {
  top: 580px;
  right: 30px;
  cursor: pointer;
}

.start {
  display: inline-block;
  position: absolute;
  width: 120px;
  top: 410px;
  left: 50%; /* 왼쪽으로부터 50%의 위치에 배치 */
  transform: translate(-50%, -50%); /* 위치 보정을 위해 변환 사용 */
  margin: 0 auto;
  cursor: pointer;
}
.informicon:hover,
.start:hover,
.mystar:hover,
.mycoupon:hover {
  border: 4px solid var(--mint-color); /* 회색 테두리 추가 */
  border-radius: 8px; /* 테두리 둥글게 처리 */
}
</style>
