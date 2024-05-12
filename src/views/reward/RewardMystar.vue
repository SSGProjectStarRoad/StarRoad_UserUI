<template>
  <div class="contents">
    <!-- 필요에 따라 back.png 살릴것 -->
    <!-- <img class="backimg" src="@/img/back.png" alt="" /> -->

    <h2>나의 별자리</h2>
    <div class="mystars">
      <div class="mystar" v-for="(star, index) in stars" :key="index">
        <!-- <img :src="star.rewardimg" alt="" /> -->
        <img :src="getCurrentMonthImage()" alt="" />
        <!-- 선택적으로 보상 이름과 개수를 표시할 수 있습니다 -->
        <p>
          {{ star.rewardName }}
          <span class="highlight">{{ star.rewardCount }}</span> 개
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { rewardList } from '@/api/index';
export default {
  data() {
    return {
      stars: [],
    };
  },
  methods: {
    getCurrentMonthImage() {
      const month = new Date().getMonth() + 1; // 현재 월 가져오기
      return require(`@/img/reward/mystar${month}.png`); // 동적으로 이미지 경로 생성
    },
    async getRewardList() {
      try {
        const userId = 1; // 예시 ID, 실제 적용시 적절한 ID 사용
        const response = await rewardList(userId);
        this.stars = response.data.map(item => ({
          rewardName: item.reward_name, // API의 JSON 키와 일치하도록 수정
          rewardCount: item.reward_count, // API의 JSON 키와 일치하도록 수정

          // rewardimg: item.imageUrl, // 이미지 URL은 응답 데이터에 따라 조정
        }));
        console.log('Response:', this.stars);
      } catch (error) {
        console.error('Error:', error);
      }
    },
  },
  mounted() {
    this.getRewardList(); // 컴포넌트 마운트 시 보상 목록을 가져옴
  },
};
</script>

<style scoped>
h2 {
  display: inline-block;
  position: absolute;
  color: rgba(0, 0, 0, 0.7);
  font-size: 25px;
  top: 90px;
  left: 50%; /* 왼쪽으로부터 50%의 위치에 배치 */
  transform: translate(-50%, -50%); /* 위치 보정을 위해 변환 사용 */
  margin: 0 auto;
}
.mystars {
  display: flex;
  flex-wrap: wrap; /* 요소들이 컨테이너 너비를 초과하면 다음 줄로 넘어감 */
  justify-content: flex-start; /* 가로축에서 중앙 정렬 */
  align-items: center; /* 세로축에서 중앙 정렬 */
  position: absolute;
  left: 50%; /* 가로 중앙 정렬을 위한 설정 */
  transform: translateX(-50%);
  top: 200px;
  width: 80%; /* 또는 실제로 필요한 너비를 지정 */
  max-width: 600px; /* 최대 너비를 지정할 수도 있음 */
}
.mystar {
  flex: 1 1 50%; /* 세 개씩 배치하기 위해 베이스 너비를 33.333%로 설정 */
  max-width: 50%; /* 최대 너비도 33.333%로 설정 */
  box-sizing: border-box; /* padding과 border가 너비에 포함되도록 설정 */
  padding: 5px; /* 필요에 따라 padding을 조정 */
  text-align: center;
  margin-bottom: 20px;
}
.highlight {
  color: var(--mint-color);
  font-weight: bold;
}
</style>
