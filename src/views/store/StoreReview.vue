<template>
  <div v-if="storeReview" class="contents">
    <!-- @@@@이 부분 로고 오는 데이터로 바꿔야함@@@@ -->
    <img class="store-img" :src="storeReview.imagePath" alt="" /> 
    <div class="store">
      <h1>{{storeReview.name}}</h1>
      <div class="store-detail">
        <a :href="'tel:' + storeReview.contactNumber" class="store-phone">
          <img src="@/img/phone.png" alt="전화 걸기" />
        </a>

      <!-- @@  로케이션 여기도 바꿔야함 @@ -->
        <img class="store-location" src="@/img/location.png" alt="" />
        <br />
      </div>
    </div>
    <div class="store-introduce">
      {{storeReview.contents}}
    </div>
    <p :style="{ margin: '0px', 'padding-left': '10px' }">{{storeReview.floor}} 층 / 영업시간 : {{storeReview.operatingTime}}</p>
    <div class="store-review">
      <p class="keyword">이런점이 좋았어요!!</p>
      <div class="c-key">
        <ProgressBar :progress="72">
          <template v-slot:text>재방문 하고 싶어요</template>
          <template v-slot:number>723</template>
        </ProgressBar>
        <ProgressBar :progress="42.3">
          <template v-slot:text>서비스가 마음에 들어요</template>
          <template v-slot:number>423</template>
        </ProgressBar>
        <ProgressBar :progress="82">
          <template v-slot:text>가격이 합리적입니다</template>
          <template v-slot:number>823</template>
        </ProgressBar>
        <ProgressBar :progress="5">
          <template v-slot:text>매장이 청결합니다</template>
          <template v-slot:number>5</template>
        </ProgressBar>
        {{storeReview.Array}}
      </div>
    </div>
    <div class="section"></div>
    <div class="s-key">
      <p class="s-key-title">리뷰 {{ review }} (선택지 검색)</p>
      <div>
        <div class="slide">
          <swiper
            v-if="buttons.length > 0"
            ref="mySwiper"
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
              <!-- <swiper-slide v-for="button in buttons" :key="button"> -->
              <button class="d-button">{{ button }}</button>
            </swiper-slide>
          </swiper>
          
        </div>
        <div class="slide">
          <swiper
            v-if="buttons.length > 0"
            ref="mySwiper"
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
              <!-- <swiper-slide v-for="button in buttons" :key="button"> -->
              <button class="d-button">{{ button }}</button>
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
            <label for="latest"></label>최신순
            <input
              type="radio"
              id="likes"
              value="likes"
              v-model="selectedSort"
              @change="changeSort"
            />
            <label for="likes"></label>좋아요 순
          </p>
        </div>
        <reviewcard :storeReview="storeReview" />
      </div>
    </div>
    <reviewbutton/>
    <scrollToTopButton v-show="showScrollToTopButton" @click="scrollToTop"/>
  </div>
</template>
<script>
import { selectStore } from '@/api/index.js';
import data from '@/components/review/data.js';
import reviewcard from "@/components/store/ReviewCard.vue";
import ProgressBar from "@/components/store/ProgressBar.vue";
import reviewbutton from "@/components/review/ReviewButton.vue";
import scrollToTopButton from "@/components/store/ScrollToTopButton.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

export default {

 data() {
   const postData = data.timelinePost;
   console.log('postData:', postData); // 데이터를 콘솔에 출력합니다.
   return {
     storeReview: null,
     postData,
     review: 1520,
     selectedSort: "latest",
     phoneNumber: "010-1234-5678",
     buttons: [
       "재방문 하고 싶어요","서비스가 마음에 들어요"
       ,"가격이 합리적입니다"
       ,"매장이 청결합니다"
     ],
     swiperOptions: {
       slidesPerView: "auto",
       spaceBetween: 5,
       loop: false,
     },
     showScrollToTopButton: false,
   };
 },
 computed: {
   storeId() {
     return this.$route.params.storeId;
   }
 },
 async created() {
   try {
     this.storeReview = await selectStore(this.storeId);
     
   } catch (error) {
     console.error('Error fetching store review:', error);
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
 mounted() {
   window.addEventListener('scroll', this.handleScroll);
 },
 beforeUnmount() {
   window.removeEventListener('scroll', this.handleScroll);
 },
 methods: {
  changeSort() {
    if (this.selectedSort === "latest") {
      // 날짜별 최신순으로 정렬
      this.storeReview.reviews.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
    } else if (this.selectedSort === "likes") {
      // 좋아요순으로 정렬
      this.storeReview.reviews.sort((a, b) => b.likeCount - a.likeCount);
    }
  },
   handleScroll() {
     const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
     this.showScrollToTopButton = scrollPosition > 100;
   },
   scrollToTop() {
     window.scrollTo({
       top: 0,
       behavior: 'smooth'
     });
   }
 }
};
</script>

<style scoped>
@import "@/css/common.css";
.store-introduce{
  padding-left:10px;
  padding-right: 10px;
  margin-bottom: 10px;
  margin-top:10px;
}

.review-body {
  margin-top: 4%;
  background-image: url("https://picsum.photos/600?random=0");
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
  background-image: url("https://picsum.photos/100?random=0");
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

.d-button:hover {
  background-color: var(--mint-color);
}

input[type="radio"] {
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

input[type="radio"]:checked + label {
  background-color: var(--navy-color);
}

.s-key-title {
  font-weight: bold;
}

.s-key {
  margin: 16px;
}

.section {
  margin-top: 10px;
}

.section::before {
  content: "";
  display: block;
  height: 10px;
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
  margin-left: 10px;
}

.store-phone img {
  width: 100%;
  height: 100%;
}
</style>
