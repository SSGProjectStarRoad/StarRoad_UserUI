<template>
  <div class="contents">
    <!-- ... -->
    <search/>
    <p></p>
    <h4 class="info">STORE INFO</h4>
    <h4 class="info">매장안내</h4>
    <div class="category">
      <button id="categoryButton" class="button">카테고리별</button>
      <div class="category-slide" ref="categorySlide">
        <div class="category-slide-container" ref="categorySlideContainer">
          <div v-for="(category, index) in categories" :key="index">
            <button class="d-button">{{ category }}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="category">
      <button id="floorButton" class="button">층별</button>
      <div class="floor-slide" ref="floorSlide">
        <div class="floor-slide-container" ref="floorSlideContainer">
          <div v-for="(floor, index) in floors" :key="index">
            <button class="d-button">{{ floor }}</button>
          </div>
        </div>
      </div>
    </div>
    <h1>사진</h1>
    <h1>층수</h1>
    <h1>이름</h1>
    <h1>데이터</h1>
 </div>
</template>
<script>
import search from '@/components/store/Search.vue';
import Swiper from 'swiper';
import 'swiper/css';
export default {
  components: {
    search,
  },
  data() {
    return {
      categories: ['레스토랑&카페', '뷰티', '의류', '엔터테인먼트', '트레이더스', '홈퍼니싱', '라이프스타일', '키즈'],
      floors: ['1층', '2층', '3층', '4층', 'B1', 'B2'],
      categorySwiper: null,
      floorSwiper: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.checkSlideOverflow('category');
      this.checkSlideOverflow('floor');
    });
  },
  methods: {
    checkSlideOverflow(type) {
      const slideContainer = this.$refs[`${type}SlideContainer`];
      const slideContent = slideContainer.firstElementChild;
      const isOverflown = slideContent.scrollWidth > slideContainer.clientWidth;
      if (isOverflown) {
        this.initializeSwiper(type);
      }
    },
    initializeSwiper(type) {
      if (type === 'category') {
        this.categorySwiper = new Swiper(this.$refs.categorySlide, {
          slidesPerView: 'auto',
          spaceBetween: 10,
          freeMode: true,
          freeModeSticky: true,
          grabCursor: true,
          resistanceRatio: 0,
        });
      } else if (type === 'floor') {
        this.floorSwiper = new Swiper(this.$refs.floorSlide, {
          slidesPerView: 'auto',
          spaceBetween: 10,
          freeMode: true,
          freeModeSticky: true,
          grabCursor: true,
          resistanceRatio: 0,
        });
      }
    },
  },
};
</script>
<style scoped>
@import '@/css/common.css';
.d-button{
  background-color: var(--gray-color);
  border-radius: 10px;
  color: white;
  box-shadow: 2px 2px 3px #00000033;
  border: none;
  transition: background-color 0.3s ease;
  width:fit-content !important;
  color:black;
}
.d-button:hover{
  background-color: var(--mint-color);
}
.c-list,
.f-list {
  margin: 0;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.info {
  margin: 0;
  margin-bottom: 5px;
}
.contents {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}
.category {
  margin: 5px;
  display: flex;
  gap: 10px;
  justify-content: flex-start !important;
  align-self: flex-start !important;
}
.category-slide-container,
.floor-slide-container {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 3px;
}
.category-slide,
.floor-slide {
  margin-left: 10px;
  width: calc(100% - 110px);
  overflow: hidden;
}
.category button {
  width: 100px;
  height: 30px;
  font-size: 16px;
}
.category-slide-container > div,
.floor-slide-container > div {
  flex: 0 0 auto;
  margin-right: 10px;
}
.button {
  background-color: var(--navy-color);
  border-radius: 15px;
  color: white;
  box-shadow: 2px 2px 3px #00000033;
  border: none;
  transition: background-color 0.3s ease;
}
</style>