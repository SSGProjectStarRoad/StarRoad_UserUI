<template>
  <div class="contents">
    <!-- <img class="informicon" src="@/img/information.png" alt="" /> -->
    <h1>별자리 찾기</h1>
    <h2>
      망원경으로 별을 찾고,<br />
      특별한 혜택을 즐기세요
    </h2>
    <img
      class="start"
      src="@/img/home_telescope.png"
      alt=""
      @click="goToSelect"
    />
    <h3 class="mystar textshadow" @click="goToMyStar">나의 별자리</h3>
    <!-- <h3 class="mycoupon textshadow" @click="goToMyCoupons">나의 쿠폰 보기</h3> -->
  </div>
</template>

<script>
import { rewardStart } from '@/api/index';
import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState(['email']),
    ...mapGetters(['isLogin']),
  },
  methods: {
    async goToSelect() {
      try {
        // const userId = 1; // 예시 ID, 실제 적용시 적절한 ID 사용
        const response = await rewardStart(this.email);
        console.log('Response:', response.data);
        this.$router.push('/reward/select');
      } catch (error) {
        console.error('Error:', error);
      }
    },
    goToMyStar() {
      this.$router.push('/reward/mystar');
    },
    goToMyCoupons() {
      this.$router.push('/reward/mycoupons');
    },
  },
};
</script>

<style scoped>
.contents {
  height: 100%;
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
  font-size: 45px;
  color: var(--navy-color);
  top: 90px;
  left: 50%; /* 왼쪽으로부터 50%의 위치에 배치 */
  transform: translate(-50%, -50%); /* 위치 보정을 위해 변환 사용 */
  margin: 0 auto;
}

h2 {
  display: inline-block;
  position: absolute;
  color: rgba(0, 0, 0, 0.7);
  font-size: 16px;
  top: 180px;
  width: auto;
  text-align: center;
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
  width: 80px;
  top: 350px;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  margin: 0 auto;
  cursor: pointer;
  border-radius: 30%;
  box-shadow: 0 0 8px var(--mint-color);
}

.informicon:hover,
.mystar:hover,
.mycoupon:hover {
  transform: scale(1.1);
  transition: 0.5s;
}
.start:hover {
  box-shadow: 0px 0px 30px var(--mint-color);
  transition: 0.5s;
}
</style>
