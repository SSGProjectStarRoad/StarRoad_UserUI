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
          <div v-for="event in events" :key="event.id">
            <a @click.prevent="openModal(event.id)">
              <img :src="event.content" alt="Event Image" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <reviewbutton />
    <!-- <button class="review_button">
      <div><img src="@/img/review/pencil.png" alt="Pencil Logo" /></div>
      <div class="review_text">Write a Review</div>
    </button> -->

    <!-- 모달 구조 -->
    <div v-if="isModalVisible" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeModal">X</button>
        <img :src="modalImageUrl" alt="Event Detail Image" />
      </div>
    </div>
  </div>
</template>

<script>
import ProgressBar from '@/components/store/ProgressBar.vue';
import { mypageData, getEventList, getEventDetail } from '@/api/index';
import { mapState, mapGetters } from 'vuex';
import reviewbutton from '@/components/review/ReviewButton.vue';
export default {
  data() {
    return {
      mydata: [],
      events: [],
      isModalVisible: false,
      modalImageUrl: '',
    };
  },
  methods: {
    async getMydata() {
      try {
        // const userId = 1; // 예시 ID, 실제 적용시 적절한 ID 사용
        const response = await mypageData(this.email);
        console.log('Response:', response.data);
        this.mydata = response.data;
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async getEvents() {
      try {
        const list = await getEventList();
        this.events = list.data;
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async openModal(eventId) {
      try {
        const response = await getEventDetail(eventId);
        this.modalImageUrl = response.data.imagePath;
        console.log(this.modalImageUrl);
        this.isModalVisible = true;
        this.$emit('open-modal');
      } catch (error) {
        console.error('Error:', error);
      }
    },
    closeModal() {
      this.isModalVisible = false;
      this.modalImageUrl = '';
      this.$emit('close-modal');
    },
  },
  computed: {
    ...mapState(['email']),
    ...mapGetters(['isLogin']),
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
    this.getEvents();
  },
  components: {
    ProgressBar,
    reviewbutton,
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
  color: var(--mint-color);
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

.event_list div img {
  text-align: center;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
  background-color: var(--navy-color);
}

.review_button {
  position: fixed;
  right: calc(55% - 270px);
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
  align-items: center;
  text-align: center;
}

.review_button div {
  font-size: 15px;
}
.review_button div:first-child {
  margin-right: 0px;
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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 460px;
  max-height: 750px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow-y: auto; /* 스크롤 추가 */
}
.modal-content img {
  max-width: 460px;
  max-height: 750px;
}

.modal-body {
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-body img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 8px;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
}
</style>
