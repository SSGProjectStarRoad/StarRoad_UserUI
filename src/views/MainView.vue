<template>
  <div class="contents">
    <!-- <div class="starroad_logo">
      <div class="starroad_logo_img"><img src="@/img/telescope_big.png" /></div>
      <div class="starroad_logo_text">Welcome to Star Road</div>
    </div> -->
    <div class="user_level">
      <div>My Review Level</div>
      <div class="review_gage">
        <div class="user_rank">{{ levelText }}</div>
        <div class="user_exp">
          <ProgressBar class="user_progressbar" :progress="reviewProgress">
            <!-- <template #number>{{ reviewExp }} / 300</template> -->
          </ProgressBar>
        </div>
      </div>
    </div>
    <div class="event_space">
      <div class="event-info">EVENT</div>
      <div>
        <!-- 이벤트 페이지 -->
        <div class="event_list">
          <div>
            <a href="#">
              <img src="@/img/event_test.png" />
            </a>
          </div>
          <div>
            <a href="#"><img src="@/img/event_test.png" /></a>
          </div>
          <div>
            <a href="#"><img src="@/img/event_test.png" /></a>
          </div>
        </div>
      </div>
    </div>
    <button class="review_button">
      <div><img src="@/img/review/pencil.png" alt="Pencil Logo" /></div>
      <div class="review_text">Write a Review</div>
    </button>
  </div>
</template>

<script>
import ProgressBar from '@/components/store/ProgressBar.vue';
import { mypageData } from '@/api/index';

export default {
  data() {
    return {
      mydata: [],
    };
  },
  methods: {
    async getMydata() {
      try {
        const userId = 1; // 예시 ID, 실제 적용시 적절한 ID 사용
        const response = await mypageData(userId);
        console.log('Response:', response.data);
        this.mydata = response.data;
      } catch (error) {
        console.error('Error:', error);
      }
    },
  },
  computed: {
    reviewExp() {
      return this.mydata.reviewExp || 0;
    },
    reviewProgress() {
      return (this.reviewExp / 300) * 100;
    },
    levelText() {
      const reviewExp = this.mydata.reviewExp;
      if (reviewExp >= 300) return 'Green';
      if (reviewExp >= 100) return 'Yellow';
      return 'Blue';
    },
    levelClass() {
      const reviewExp = this.mydata.reviewExp;
      if (reviewExp >= 300) return 'green-level user_rank';
      if (reviewExp >= 100) return 'yellow-level user_rank';
      return 'blue-level user_rank';
    },
  },
  mounted() {
    this.getMydata();
  },
  components: {
    ProgressBar,
  },
};
</script>

<style scoped>
.starroad_logo {
  position: relative;
}

.starroad_logo img {
  width: 6rem;
  margin-left: 10%;
}

.starroad_logo_text {
  position: absolute;
  top: 60%;
  left: 25%;
  font-size: 1rem;
}

.user_level {
  background-color: var(--navy-color);
  padding: 25px;
  border-radius: 20px;
  color: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
}

.user_level > div:first-child {
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: 50;
}

.review_gage {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.user_rank {
  font-size: 24px;
  width: 30%;
  margin-right: 20px;
  font-weight: bold;
}

.user_exp {
  width: 80%;
  padding-bottom: 10px;
}

.user_progressbar.progress-bar {
  background-color: #fff;
}

.event_space {
  margin: 10px 0;
  padding-bottom: 60px;
}

.event-info {
  display: flex;
  flex-basis: 100%;
  align-items: center;
  color: rgba(0, 0, 0, 0.35);
  font-size: 20px;
  margin: 20px 0px;
}

.event-info::before,
.event-info::after {
  content: '';
  flex-grow: 1;
  background: rgba(0, 0, 0, 0.35);
  height: 1px;
  font-size: 0px;
  line-height: 0px;
  margin: 0px 16px;
}

.event_space div {
  margin-bottom: 20px;
}

.event_list div {
  text-align: center;
  border-radius: 20px;
  height: 100%;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
  background-color: var(--navy-color);
}

.event_list div img {
  width: 100%;
}

.review_button {
  position: fixed;
  right: calc(50% - 240px);
  top: calc(100% - 120px);
  background-color: var(--navy-color);
  border-radius: 20px;
  display: flex;
  color: #fff;
  padding: 10px 20px;
  margin: 10px;
  border: none;
  box-shadow: 2px 2px 3px #00000033;
  display: flex;
  justify-content: center;
}

.review_button div {
  font-size: 15px;
}

.review_button:active {
  box-shadow: none;
  color: var(--mint-color);
}

.review_text {
  display: none;
  margin-left: 10px;
  transition: all 0.5s;
}

.review_button:hover .review_text {
  display: block;
}
.blue-level {
  background-color: var(--navy-color);
}

.yellow-level {
  background-color: rgb(235, 235, 0);
}

.green-level {
  background-color: var(--mint-color);
}
.number {
  color: #333;
  font-weight: bold;
  margin-left: auto;
  margin-right: 10px;
  z-index: 1000; /* z-index를 높게 설정 */
}
</style>
