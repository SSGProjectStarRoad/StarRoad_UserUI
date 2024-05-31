<template>
  <div class="contents">
    <div class="mystar">
      <img :src="getCurrentMonthImage()" alt="" />
    </div>
    <h2>별자리 획득</h2>
  </div>
</template>

<script>
import { rewardAdd } from '@/api/index';
import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      // cardImageUrl: mystar1,
    };
  },
  mounted() {
    this.getReward(); // 페이지 로드 시 getReward 메서드 호출
    setTimeout(() => {
      this.redirectToCompleted();
    }, 2000);
  },
  computed: {
    ...mapState(['email']),
    ...mapGetters(['isLogin']),
  },
  methods: {
    getCurrentMonthImage() {
      const month = new Date().getMonth() + 1; // 현재 월 가져오기
      return `https://kr.object.ncloudstorage.com/ssg-starroad/ssg/starroad/rewards/mystar${month}.png`;
    },
    async getReward() {
      // const userId = 1;
      try {
        const response = await rewardAdd(this.email);
        console.log('Response:', response);
      } catch (error) {
        console.error('Error:', error);
      }
    },

    redirectToCompleted() {
      window.location.href = '/reward/completed';
    },
  },
};
</script>

<style scoped>
h2 {
  display: inline-block;
  position: absolute;
  color: var(--dgray-color);
  font-size: 25px;
  top: 350px;
  left: 50%; /* 왼쪽으로부터 50%의 위치에 배치 */
  transform: translate(-50%, -50%); /* 위치 보정을 위해 변환 사용 */
  margin: 0 auto;
}

.mystar {
  position: absolute;
  border-radius: 50%;
  padding: 20px;
  box-shadow: 0px 0px 30px var(--navy-color);
  top: 180px;
  left: 50%; /* 왼쪽으로부터 50%의 위치에 배치 */
  transform: translate(-50%, -50%); /* 위치 보정을 위해 변환 사용 */
}
img {
  width: 200px;
}
</style>
