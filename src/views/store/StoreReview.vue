<template>
  <div v-if="storeReview" class="contents">
    <img class="store-img" :src="storeReview.imagePath" alt="" />
    <div class="store">
      <h1>{{ storeReview.name }}</h1>
      <div class="store-detail">
        <a :href="'tel:' + storeReview.contactNumber" class="store-phone">
          <img src="@/img/phone.png" alt="전화 걸기" />
        </a>
        <img
          class="store-location"
          src="@/img/location.png"
          alt=""
          @click="goToguide"
        />
        <br />
      </div>
    </div>
    <div class="store-introduce">
      {{ storeReview.contents }}
    </div>
    <p :style="{ 'margin-bottom': '5px', 'padding-left': '10px' }">
      매장위치 <span class="span-style"> {{ storeReview.floor }}층</span>
    </p>
    <p :style="{ margin: '0px', 'padding-left': '10px' }">
      영업시간 <span class="span-style">{{ storeReview.operatingTime }}</span>
    </p>
    <div class="store-review">
      <p class="keyword">이런점이 좋았어요!!</p>
      <div class="c-key">
        <ProgressBar
          :progress="(storeReview.revisitCount / totalReviewCount) * 100"
          @filter="filterReviews"
          :isClicked="selectedButton === '재방문 하고 싶어요'"
        >
          <template v-slot:text>재방문 하고 싶어요</template>
          <template v-slot:number>{{ storeReview.revisitCount }}</template>
        </ProgressBar>
        <ProgressBar
          :progress="
            (storeReview.serviceSatisfactionCount / totalReviewCount) * 100
          "
          @filter="filterReviews"
          :isClicked="selectedButton === '서비스가 마음에 들어요'"
        >
          <template v-slot:text>서비스가 마음에 들어요</template>
          <template v-slot:number>{{
            storeReview.serviceSatisfactionCount
          }}</template>
        </ProgressBar>
        <ProgressBar
          :progress="
            (storeReview.reasonablePriceCount / totalReviewCount) * 100
          "
          @filter="filterReviews"
          :isClicked="selectedButton === '가격이 합리적입니다'"
        >
          <template v-slot:text>가격이 합리적입니다</template>
          <template v-slot:number>{{
            storeReview.reasonablePriceCount
          }}</template>
        </ProgressBar>
        <ProgressBar
          :progress="(storeReview.cleanlinessCount / totalReviewCount) * 100"
          @filter="filterReviews"
          :isClicked="selectedButton === '매장이 청결합니다'"
        >
          <template v-slot:text>매장이 청결합니다</template>
          <template v-slot:number>{{ storeReview.cleanlinessCount }}</template>
        </ProgressBar>
      </div>
    </div>
    <div class="section"></div>
    <div class="s-key">
      <p class="s-key-title">
        리뷰 {{ totalReviewCount ? totalReviewCount : 0 }} (선택지 검색)
      </p>
      <div>
        <div class="slide">
          <swiper
            v-if="buttons.length > 0"
            ref="reviewSwiper"
            :options="swiperOptions"
            :slidesPerView="'auto'"
            :spaceBetween="10"
            :freeMode="true"
            :freeModeSticky="true"
            :grabCursor="true"
            :resistanceRatio="0.6"
          >
            <swiper-slide
              v-for="button in buttons"
              :key="button"
              style="width: auto"
            >
              <button
                class="d-button"
                :class="{ active: selectedButton === button }"
                @click="filterReviews(button)"
              >
                {{ button }}
              </button>
            </swiper-slide>
          </swiper>
        </div>

        <div class="slide">
          <swiper
            v-if="keywords.length > 0"
            ref="keywordSwiper"
            :options="swiperOptions"
            :slidesPerView="'auto'"
            :spaceBetween="10"
            :freeMode="true"
            :freeModeSticky="true"
            :grabCursor="true"
            :resistanceRatio="0.6"
          >
            <swiper-slide
              v-for="keyword in keywords"
              :key="keyword"
              style="width: auto"
            >
              <button
                class="d-button"
                :class="{ active: selectedKeyword === keyword }"
                @click="filterKeyword(keyword)"
              >
                {{ keyword }}
              </button>
            </swiper-slide>
          </swiper>
        </div>

        <div class="sort">
          <p>
            <input
              type="radio"
              id="latest"
              value="latest"
              v-model="selectedSort"
              @change="changeSort"
            />
            <label for="latest"></label>&nbsp;최신순
            <input
              type="radio"
              id="likes"
              value="likes"
              v-model="selectedSort"
              @change="changeSort"
            />
            <label for="likes"></label>&nbsp;좋아요 순
          </p>
        </div>

   <reviewcard
      v-for="(review, index) in filteredReviews.reviews"
      :key="review.id"
      :review="review"
      @like-review="likeReviewHandler"
      :user-email="userEmail"
      :likeReview="likeReview"
      :selected-keyword="selectedKeyword"
      :follow="follow"
    />
      </div>
    </div>
    <reviewbutton />
    <scrollToTopButton v-show="showScrollToTopButton" @click="scrollToTop" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { addFollowUser,likeReview, selectStore, getStoreKeywords } from '@/api/index.js';
import reviewcard from '@/components/store/ReviewCard.vue';
import ProgressBar from '@/components/store/ProgressBar.vue';
import reviewbutton from '@/components/review/ReviewButton.vue';
import scrollToTopButton from '@/components/store/ScrollToTopButton.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { EventBus } from '@/eventBus';
import 'swiper/css';

export default {
  data() {
    return {
      storeReview: { reviews: [], commonReviewStats: {} },
      filteredReviews: { reviews: [], commonReviewStats: {} },
      selectedSort: 'latest',
      selectedButton: null,
      selectedKeyword: null,
      likeReview,
      
      keywords: [],
      buttons: [
        '재방문 하고 싶어요',
        '서비스가 마음에 들어요',
        '가격이 합리적입니다',
        '매장이 청결합니다',
      ],
      swiperOptions: {
        slidesPerView: 'auto',
        spaceBetween: 5,
        loop: false,
      },
      showScrollToTopButton: false,
      currentPage: 0,
      pageSize: 10,
      hasNextPage: true,
      loading: false,
    };
  },
  computed: {
    ...mapState(['email']),
    ...mapGetters(['isLogin']),
    userEmail() {
      return this.email;
    },
    storeId() {
      return this.$route.params.storeId;
    },
  },
  async created() {
    EventBus.emit('loading', true);
    try {
      await this.loadReviews();
      await this.loadKeywords(); // 키워드 불러오기
    } catch (error) {
      console.error('Error fetching store review:', error);
    } finally {
      EventBus.emit('loading', false); // 데이터 로드 완료 후 로딩 상태를 false로 설정합니다.
    }
  },
  components: {
    reviewcard,
    ProgressBar,
    Swiper,
    SwiperSlide,
    reviewbutton,
    scrollToTopButton,
  },
  methods: {
    
    
     async follow(username) {
      try {
        const response = await addFollowUser(username, this.userEmail);
        if (response.status === 200) {
          console.log(username + '님을 팔로우했습니다.');
        }
      } catch (error) {
        console.error('팔로우 중 오류가 발생했습니다:', error);
      }
    },
    async loadKeywords() {
      try {
        const response = await getStoreKeywords(this.storeId);
        this.keywords = response.data.map(keyword => keyword.name);
      } catch (error) {
        console.error('Error loading keywords:', error);
      }
    },
    goToguide() {
      this.$router.push(`/store/${this.storeReview.id}/guidemap`);
    },
    changeSort() {
      this.currentPage = 0;
      this.loadReviews(); // 정렬 방식을 변경하면 리뷰를 다시 불러옵니다.
    },
    async filterReviews(button) {
    if (this.selectedButton === button) {
      // 버튼을 재클릭하면 필터링을 해제하고 원래 데이터를 복구합니다.
      this.selectedButton = null;
    } else {
      // 다른 필터가 선택되면 키워드를 초기화합니다.
      this.selectedKeyword = null;
      this.selectedButton = button;
    }
    this.currentPage = 0;
    await this.loadReviews(); // 필터링된 데이터를 로드합니다.
  },
  async filterKeyword(keyword) {
    if (this.selectedKeyword === keyword) {
      // 키워드를 재클릭하면 필터링을 해제하고 원래 데이터를 복구합니다.
      this.selectedKeyword = null;
    } else {
      // 다른 키워드가 선택되면 필터를 초기화합니다.
      this.selectedButton = null;
      this.selectedKeyword = keyword;
    }
    this.currentPage = 0;
    await this.loadReviews(); // 필터링된 데이터를 로드합니다.
  },
    async loadReviews() {
      this.loading = true;
      try {
        const response = await selectStore(
          this.storeId,
          this.userEmail,
          this.currentPage,
          this.pageSize,
          this.selectedButton,
          this.selectedSort,
          this.selectedKeyword // 키워드 필터를 추가

        );
        if (this.currentPage === 0) {
          this.storeReview = response;
          this.filteredReviews = response; // 초기에는 모든 리뷰를 표시합니다.
        } else {
          this.storeReview.reviews = [
            ...this.storeReview.reviews,
            ...response.reviews,
          ];
          this.filteredReviews.reviews = [
            ...this.filteredReviews.reviews,
            ...response.reviews,
          ];
        }
        this.hasNextPage = response.hasNext;
        this.totalReviewCount = response.totalReviewCount || 0;
      } catch (error) {
        console.error('Error loading more reviews:', error);
      } finally {
        this.loading = false;
      }
    },
    async likeReviewHandler(reviewId) {
      try {
        await this.likeReview(reviewId, this.userEmail); // 좋아요 API 호출
        await this.loadReviews(); // 좋아요 이후 리뷰 리스트를 다시 로드
      } catch (error) {
        console.error('Error liking the review:', error);
      }
    },
    handleScroll() {
      const scrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition + windowHeight >= documentHeight - 100) {
        this.loadMoreReviews();
      }

      this.showScrollToTopButton = scrollPosition > 100;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    async loadMoreReviews() {
      if (this.loading || !this.hasNextPage) return;

      this.loading = true;
      try {
        this.currentPage += 1;
        await this.loadReviews();
      } catch (error) {
        console.error('Error loading more reviews:', error);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style scoped>
@import '@/css/common.css';
.span-style {
  margin-left: 10px;
  color: var(--navy-color);
}
.store-introduce {
  color: var(--dgray-color);
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
}
.store-review {
  margin-top: 40px;
}
.review-body {
  margin-top: 4%;
  background-image: url('https://picsum.photos/600?random=0');
  height: 450px;
  background-position: center;
  background-size: cover;
}
.review-content {
  padding-left: 15px;
  padding-right: 15px;
  font-size: 14px;
}
.review-date {
  font-size: 13px;
  color: grey;
  margin-top: -8px;
}
.user-header {
  height: 30px;
  padding: 10px;
}
.review-Data {
  width: 100%;
  height: 100%;
  margin: 10px;
  margin-top: 30px;
  background-color: rgb(206, 184, 184);
  margin-bottom: 1%;
  margin-top: 1%;
}
.review-data::before {
  background-color: var(--gray-color);
}
.review-content {
}
.user-profile {
  background-image: url('https://picsum.photos/100?random=0');
  width: 50px;
  height: 50px;
  background-size: 50%;
  border-radius: 50%;
  float: left;
}
.user-name {
  display: block;
  padding-left: 15%;
  padding-top: 0px;
  font-size: 16px;
  font-weight: bold;
}
.review-count {
  padding-top: 0.7%;
  padding-left: 15%;
  display: block;
  color: gray;
  font-weight: 400;
}
.contents {
  overflow: hidden;
  position: relative;
  /* min-height: 100vh; */
  margin-top: 40px;
}
.slide {
  width: auto;
  position: relative;
  overflow: hidden;
}
.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-slide {
  width: 80px;
  text-align: center;
  height: 60px;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.d-button {
  margin-right: 10px;
  padding: 5px;
  background-color: var(--gray-color);
  border-radius: 8px;
  color: white;
  box-shadow: 2px 2px 3px #00000033;
  border: none;
  transition: background-color 0.3s ease;
  width: fit-content;
  color: black;
  white-space: nowrap;
}
.d-button.active {
  background-color: var(--mint-color);
  color: black;
}
input[type='radio'] {
  display: none;
}
label {
  display: inline-block;
  width: 3px;
  height: 3px;
  padding: 3px 3px;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 5px;
}
input[type='radio']:checked + label {
  background-color: var(--navy-color);
}
.s-key-title {
  font-weight: bold;
}
.s-key {
  margin: 16px;
  margin-top: 30px;
}
.section {
  margin-top: 30px;
}
.section::before {
  content: '';
  display: block;
  height: 8px;
  width: 100%;
  background-color: var(--gray-color);
}
.c-key {
  margin-left: 10px;
  margin-right: 10px;
}
.keyword {
  font-weight: bold;
  margin-left: 10px;
}
.store-img {
  width: 50%;
  height: 50%;
  margin: 0 auto;
  display: block;
  border-radius: 10px;
}
.store {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  border-radius: 10px;
  height: 50px;
  padding-top: 30px;
  padding-left: 10px;
  padding-right: 10px;
}
.store-detail {
  display: flex;
  align-items: center;
  margin-left: auto;
}
.store-phone,
.store-location {
  width: 20px;
  height: 20px;
  padding: 8px;
  margin-left: 20px;
  border-radius: 50%;
  box-shadow: 0 0 8px var(--dgray-color);
  cursor: pointer;
}
.store-phone img {
  width: 100%;
  height: 100%;
}
</style>
