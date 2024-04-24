<template>
  <div class="contents">
    <img class="store-img" src="@/img/ZARA.png" alt="" />
    <div class="store">
      <h1>자라</h1>
      <div class="store-detail">
        <a :href="'tel:' + phoneNumber" class="store-phone">
          <img src="@/img/phone.png" alt="전화 걸기" />
        </a>
        <img class="store-location" src="@/img/location.png" alt="" />
        <br />
      </div>
    </div>
    <p :style="{ margin: '0px', 'padding-left': '10px' }">1F / 10:00 ~ 20:00</p>
    <div class="store-review">
      <p class="keyword">이런점이 좋았어요!!</p>
      <div class="c-key">
        <ProgressBar :progress="72">
          <template v-slot:text>재방문하고싶어요</template>
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
      </div>
    </div>
    <div class="section"></div>
    <div class="s-key">
      <p class="s-key-title">리뷰 {{review}} (키워드검색)</p>
      <div>
        <div class="slide">
          <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide v-for="button in buttons" :key="button" style="width: auto;">
            <!-- <swiper-slide v-for="button in buttons" :key="button"> -->
              <button class="d-button">{{ button }}</button>
            </swiper-slide>
          </swiper>
        </div>
        <div class="sort">
          <p>
            <input type="radio" id="latest" value="latest" v-model="selectedSort" @change="changeSort">
            <label for="latest"></label>최신순
            <input type="radio" id="likes" value="likes" v-model="selectedSort" @change="changeSort">
            <label for="likes"></label>좋아요 순
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProgressBar from "@/components/store/ProgressBar.vue";
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

export default {
  data() {
    return {
      review: 1520,
      selectedSort: 'latest',
      phoneNumber: '010-1234-5678',
      buttons: ['종류', '매장', '스타일', '재고', '품질', '품질', '품질', '품질2', '품질', '품질', '품질222', '품질222', '품222', '재고3', '품질', '품질', '품질', '품질4', '품질', '품질5', '품질2622', '품질222', '품222', '재고', '품질', '품질', '품질', '품질', '품질', '품질', '품질222', '품질222', '1111111'],
      swiperOptions: {
        slidesPerView: 'auto',
        spaceBetween: 10,
      },
    };
  },
  components: {
    ProgressBar,
    Swiper,
    SwiperSlide,
  },
  methods: {
    changeSort() {
      if (this.selectedSort === 'latest') {
        // 최신순으로 정렬하는 로직
        console.log('최신순으로 정렬');
      } else if (this.selectedSort === 'likes') {
        // 좋아요 순으로 정렬하는 로직
        console.log('좋아요 순으로 정렬');
      }
    },
  },
};
</script>

<style scoped>
.slide {
  position: relative;
  overflow: hidden;
  
}

.swiper-container {
  width: 100%;
  height: 100%;
  
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.d-button {
  margin-right: 10px;
  background-color: var(--gray-color);
  border-radius: 10px;
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

.sort {
  margin: 16px;
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