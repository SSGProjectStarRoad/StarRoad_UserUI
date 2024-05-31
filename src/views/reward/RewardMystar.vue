<template>
  <div class="contents">
    <h2>나의 별자리</h2>
    <div class="mystars">
      <div class="mystar" v-for="(star, index) in stars" :key="index">
        <!-- <img :src="star.rewardimg" alt="" /> -->
        <img :src="star.rewardImagePath" alt="보상 이미지" />
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
import { mapState, mapGetters } from 'vuex';
export default {
  data() {
    return {
      stars: [],
    };
  },
  computed: {
    ...mapState(['email']),
    ...mapGetters(['isLogin']),
  },
  methods: {
    // getImageUrl(rewardId) {
    //   // rewardName을 기반으로 이미지 경로를 동적으로 생성
    //   const imageName = rewardId; // 공백 제거 및 소문자로 변환
    //   return require(`@/img/reward/mystar${imageName}.png`);
    // },
    async getRewardList() {
      try {
        // const userId = 1; // 예시 ID, 실제 적용시 적절한 ID 사용
        const response = await rewardList(this.email);
        this.stars = response.data.map(item => ({
          rewardId: item.reward_id,
          rewardName: item.reward_name, // API의 JSON 키와 일치하도록 수정
          rewardCount: item.reward_count, // API의 JSON 키와 일치하도록 수정
          rewardImagePath: item.reward_image_path,

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
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 200px;
  width: 80%;
  max-width: 600px;
  padding-bottom: 100px;
}
.mystar {
  flex: 1 1 50%;
  max-width: 40%;
  box-sizing: border-box;
  padding: 10px;
  text-align: center;
  margin: auto;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.5s;
}

.mystar:hover {
  transform: translateY(-5px); /* 호버 시 약간 위로 움직임 */
}

.mystar img {
  max-width: 90%;
  height: auto;
  padding-top: 3px;
  border: 3px solid var(--dgray-color);
  border-radius: 50%;
  box-sizing: border-box;
}
.highlight {
  color: var(--mint-color);
  font-weight: bold;
}
</style>
