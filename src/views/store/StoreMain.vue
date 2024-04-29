<template>
  <div class="parent-with-scroll">
    <div class="fix">
      <div class="center-item">
        <p></p>
        <div class="search">
          <img class="searchimg" src="@/img/search.png" alt="" />
          <input class="search-input" type="text" placeholder="매장명 검색" />
        </div>
      </div>

      <h2 class="info">STORE INFO</h2>
      <h2 class="info">매장안내</h2>
      <div class="category">
        <button id="categoryButton" class="button">카테고리별</button>
        <div class="category-slide" ref="categorySlide">
          <Swiper
            :slidesPerView="'auto'"
            :spaceBetween="10"
            :freeMode="true"
            :freeModeSticky="true"
            :grabCursor="true"
            :resistanceRatio="0.6"
          >
            <SwiperSlide v-for="(category, index) in categories" :key="index">
              <button class="d-button">{{ category }}</button>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div class="category">
        <button id="floorButton" class="button">층별</button>
        <div class="floor-slide" ref="floorSlide">
          <Swiper
            :slidesPerView="'auto'"
            :spaceBetween="10"
            :freeMode="true"
            :freeModeSticky="true"
            :grabCursor="true"
            :resistanceRatio="0"
          >
            <SwiperSlide v-for="(floor, index) in floors" :key="index">
              <button class="d-button">{{ floor }}</button>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  </div>
  <div class="contents">
    <list />
  </div>
</template>
<script>
import search from '@/components/store/Search.vue';
import list from '@/components/store/list.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
export default {
  components: {
    search,
    list,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      categories: [
        '레스토랑&카페',
        '뷰티',
        '의류',
        '엔터테인먼트',
        '트레이더스',
        '홈퍼니싱',
        '라이프스타일',
        '키즈',
      ],
      floors: ['1층', '2층', '3층', '4층', 'B1', 'B2'],
      categorySwiper: null,
      floorSwiper: null,
    };
  },
};
</script>
<style scoped>
@import '@/css/common.css';
.parent-with-scroll {
  height: 250px; /* 부모 요소의 높이를 설정하여 스크롤이 가능하도록 함 */
  overflow-y: auto; /* 세로 스크롤이 필요한 경우 스크롤이 표시되도록 함 */
}

.fix {
  padding: 0%;
  display: flex;
  flex-direction: column;
  position: fixed; /* .fix 요소를 화면에 고정 */
  top: 48px; /* 화면의 상단에 고정 */
  z-index: 100; /* 다른 요소 위에 표시 */
  background-color: white; /* 배경색 설정 */
  /* border-bottom: solid 7px var(--gray-color); */
  box-shadow: 0 4px rgba(0, 0, 0, 0.1); /* 아래 방향으로만 그림자 적용 */

  width: 100%; /* 화면 너비에 맞게 설정 */
  max-width: 480px; /* 최대 너비 설정 */
  margin: 0 auto; /* 가운데 정렬 */
  left: 0; /* 화면 왼쪽에 정렬 */
  right: 0; /* 화면 오른쪽에 정렬 */
}
.center-item {
  background-color: white;
}

.search {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--gray-color);
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 5px 10px;
  box-shadow: 2px 2px 3px #00000033;
}
.search-input {
  width: 300px;
  height: 15px;
  padding: 3px 5px;
  font-size: 12px;
  background-color: var(--gray-color);
  border: none;
  box-sizing: border-box;
  vertical-align: middle; /* 추가 */
}
.searchimg {
  width: 16px;
  height: 16px;
  margin-right: 5px;
  vertical-align: middle; /* 추가 */
}
.d-button {
  padding: 1px 6px;
  background-color: var(--gray-color);
  border-radius: 8px;
  color: white;
  box-shadow: 2px 2px 3px #00000033;
  border: none;
  transition: background-color 0.3s ease;
  width: fit-content !important;
  color: black;
}
.d-button:hover {
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
  height: 24px;
  font-size: 24px;
  margin: 0;
  margin-bottom: 5px;
  align-items: center;
  display: flex;
  flex-direction: column;
}
.contents {
  margin: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.center-item {
  height: 32px;
  margin-top: 5%;
  display: flex;
  background-color: white;
  justify-content: center;
  align-items: center;
  position: sticky; /* 고정된 위치로 설정 */
  top: 0; /* 상단에 고정 */
  z-index: 1; /* 다른 요소 위에 보이도록 설정 */
}

.category {
  margin: 5px;
  display: flex;
  gap: 10px;
  justify-content: flex-start !important;
  align-self: flex-start !important;
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

.button {
  background-color: var(--navy-color);
  border-radius: 8px;
  color: white;
  box-shadow: 2px 2px 3px #00000033;
  border: none;
  transition: background-color 0.3s ease;
}
.category-slide-item,
.floor-slide-item {
  width: auto !important;
}
.swiper-slide {
  margin-bottom: 10px;
  width: auto;
}
</style>
