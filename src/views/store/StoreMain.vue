<template>
  <div class="parent-with-scroll">
    <div class="fix">
      <h2 class="info">STORE INFO</h2>
      <h2 class="info">매장안내</h2>
      <div class="center-item">
        <p></p>
        <div class="search">
          <img class="searchimg" src="@/img/search.png" alt="" />
          <input
            class="search-input"
            type="text"
            placeholder="매장명 검색"
            @input="searchStore"
            @keyup.enter="searchStore"
          />
        </div>
      </div>

      <div class="category">
        <button id="categoryButton" class="button">카테고리별</button>
        <div class="category-slide" ref="categorySlide">
          <Swiper
            ref="categorySwiper"
            :slidesPerView="'auto'"
            :spaceBetween="10"
            :freeMode="true"
            :loop="false"
            :grabCursor="true"
          >
            <SwiperSlide v-for="(category, index) in categories" :key="index">
              <button
                class="d-button"
                :class="{ active: selectedCategory === category }"
                @click="handleClick(category, 'category')"
              >
                {{ category }}
              </button>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div class="category">
        <button id="floorButton" class="button">층별</button>
        <div class="floor-slide" ref="floorSlide">
          <Swiper
            ref="floorSwiper"
            :slidesPerView="'auto'"
            :spaceBetween="10"
            :freeMode="true"
            :loop="false"
            :grabCursor="true"
            @touchStart="onTouchStart"
            @touchMove="onTouchMove"
            @touchEnd="onTouchEnd"
            @transitionEnd="onTransitionEnd"
          >
            <SwiperSlide v-for="(floor, index) in floor" :key="index">
              <button
                class="d-button"
                :class="{ active: selectedFloor === floor }"
                @click="handleClick(floor, 'floor')"
                @mousedown="onMouseDown"
                @mousemove="onMouseMove"
                @mouseup="onMouseUp"
              >
                {{ floor }}
              </button>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  </div>
  <div class="contents">
    <list
      :selected-category="selectedCategory"
      :selected-floor="selectedFloor"
      :search-keyword="searchKeyword"
      :stores="filteredStores"
      @store-click="goToStoreReview"
    />
    <!-- <ReviewCard v-if="selectedStoreId" :store-id="selectedStoreId" /> -->
  </div>
</template>

<script>
import search from '@/components/store/Search.vue';
import list from '@/components/store/list.vue';
import ReviewCard from '@/components/store/ReviewCard';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { EventBus } from '@/eventBus';
import 'swiper/css';

export default {
  components: {
    ReviewCard,
    search,
    list,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      searchKeyword: '',
      categories: [
        '식당&카페',
        '뷰티',
        '의류',
        '엔터테인먼트',
        '마트',
        '홈퍼니싱',
        '라이프스타일',
        '키즈',
      ],
      floor: ['B2', 'B1', '1', '2', '3', '4'],
      selectedCategory: '',
      selectedFloor: '',
      stores: [],
      isDragging: false,
      mouseDown: false,
    };
  },
  computed: {
    filteredStores() {
      if (this.searchKeyword === '') {
        return this.stores;
      } else {
        const keyword = this.searchKeyword.toLowerCase();
        return this.stores.filter(store =>
          store.name.toLowerCase().includes(keyword),
        );
      }
    },
  },
  methods: {
    handleClick(item, type) {
      if (!this.isDragging) {
        if (type === 'category') {
          this.toggleCategory(item);
        } else if (type === 'floor') {
          this.toggleFloor(item);
        }
      }
    },
    toggleCategory(category) {
      if (this.selectedCategory === category) {
        this.selectedCategory = '';
      } else {
        this.selectedCategory = category;
      }
      // this.fetchStores();
    },
    toggleFloor(floor) {
      if (this.selectedFloor === floor) {
        this.selectedFloor = '';
      } else {
        this.selectedFloor = floor;
      }
      // this.fetchStores();
    },
    goToStoreReview(storeId) {
      this.$router.push(`/store/${storeId}/reviews`);
    },
    searchStore(event) {
      this.searchKeyword = event.target.value;
    },
    // async fetchStores() {
    //   try {
    //     let url = '/api/stores';
    //     if (this.selectedCategory && this.selectedFloor) {
    //       url += `?category=${this.selectedCategory}&floor=${this.selectedFloor}`;
    //     } else if (this.selectedCategory) {
    //       url += `?category=${this.selectedCategory}`;
    //     } else if (this.selectedFloor) {
    //       url += `?floor=${this.selectedFloor}`;
    //     }
    //     // const response = await fetch(url);
    //     const data = await response.json();
    //     this.stores = data;
    //   } catch (error) {
    //     console.error('Error fetching store data:', error);
    //   }
    // },
  },
  created() {
    EventBus.emit('loading', true);
    // this.fetchStores();
    EventBus.emit('loading', false); // 데이터 로드 완료 후 로딩 상태를 false로 설정합니다.
  },
};
</script>

<style scoped>
@import '@/css/common.css'; /* 공통 CSS 파일을 가져옵니다. */

.parent-with-scroll {
  height: 250px; /* 스크롤 가능한 부모 요소의 높이를 설정합니다. */
  overflow-y: auto; /* 세로 스크롤이 필요한 경우 스크롤이 표시되도록 설정합니다. */
}

.fix {
  padding: 0%; /* 패딩을 초기화합니다. */
  display: flex; /* 플렉스 박스를 사용하여 자식 요소를 정렬합니다. */
  flex-direction: column; /* 수직 방향으로 컬럼 정렬합니다. */
  position: fixed; /* 요소를 화면에 고정합니다. */
  top: 48px; /* 화면의 상단으로부터 고정될 위치를 설정합니다. */
  z-index: 100; /* 요소가 다른 요소 위에 표시되도록 인덱스를 설정합니다. */
  background-color: white; /* 배경색을 흰색으로 설정합니다. */
  box-shadow: 0 4px rgba(0, 0, 0, 0.1); /* 아래 방향으로만 그림자를 적용합니다. */
  width: 100%; /* 화면 너비에 맞게 요소의 너비를 설정합니다. */
  max-width: 400px; /* 요소의 최대 너비를 설정합니다. */
  margin: 0 auto; /* 요소를 가운데 정렬합니다. */
  left: 0; /* 왼쪽에서부터 정렬합니다. */
  right: 0; /* 오른쪽에서부터 정렬합니다. */
}

.center-item {
  background-color: white; /* 배경색을 흰색으로 설정합니다. */
}

.search {
  position: fixed; /* 요소를 화면에 고정합니다. */
  display: flex; /* 플렉스 박스를 사용하여 자식 요소를 정렬합니다. */
  justify-content: center; /* 가로 방향 가운데 정렬합니다. */
  align-items: center; /* 세로 방향 가운데 정렬합니다. */
  background-color: var(--gray-color); /* 배경색을 변수로 설정합니다. */
  border: 1px solid #ccc; /* 테두리를 설정합니다. */
  border-radius: 20px; /* 테두리의 모서리를 둥글게 만듭니다. */
  padding: 5px 10px; /* 안쪽 여백을 설정합니다. */
  box-shadow: 2px 2px 3px #00000033; /* 그림자를 추가합니다. */
}

.search-input {
  width: 300px; /* 너비를 설정합니다. */
  height: 15px; /* 높이를 설정합니다. */
  padding: 3px 5px; /* 안쪽 여백을 설정합니다. */
  font-size: 12px; /* 폰트 크기를 설정합니다. */
  background-color: var(--gray-color); /* 배경색을 변수로 설정합니다. */
  border: none; /* 테두리를 없앱니다. */
  box-sizing: border-box; /* 박스 모델을 설정합니다. */
  vertical-align: middle; /* 수직 정렬을 설정합니다. */
}

.searchimg {
  width: 16px; /* 너비를 설정합니다. */
  height: 16px; /* 높이를 설정합니다. */
  margin-right: 5px; /* 오른쪽 여백을 설정합니다. */
  vertical-align: middle; /* 수직 정렬을 설정합니다. */
}

.d-button {
  padding: 1px 6px; /* 안쪽 여백을 설정합니다. */
  background-color: var(--gray-color); /* 배경색을 변수로 설정합니다. */
  border-radius: 8px; /* 테두리의 모서리를 둥글게 만듭니다. */
  color: white; /* 글자색을 설정합니다. */
  box-shadow: 2px 2px 3px #00000033; /* 그림자를 추가합니다. */
  border: none; /* 테두리를 없앱니다. */
  transition: background-color 0.3s ease; /* 배경색 변경 시 부드러운 전환을 적용합니다. */
  width: fit-content !important; /* 너비를 콘텐츠에 맞게 설정합니다. */
  color: black; /* 글자색을 설정합니다. */
}

.d-button.active {
  background-color: var(--mint-color);
}

.c-list,
.f-list {
  margin: 0; /* 바깥쪽 여백을 초기화합니다. */
  margin-top: 2px; /* 위쪽 여백을 설정합니다. */
  white-space: nowrap; /* 줄 바꿈을 방지합니다. */
  overflow: hidden; /* 내용이 넘칠 때 숨깁니다. */
  text-overflow: ellipsis; /* 넘치는 텍스트를 생략 부호(...)로 표시합니다. */
}

.info {
  height: 24px; /* 높이를 설정합니다. */
  font-size: 24px; /* 폰트 크기를 설정합니다. */
  margin: 0; /* 바깥쪽 여백을 초기화합니다. */
  margin-bottom: 5px; /* 아래쪽 여백을 설정합니다. */
  align-items: center; /* 세로 방향 가운데 정렬합니다. */
  display: flex; /* 플렉스 박스를 사용하여 자식 요소를 정렬합니다. */
  flex-direction: column; /* 수직 방향으로 컬럼 정렬합니다. */
}

.contents {
  margin: 0; /* 바깥쪽 여백을 초기화합니다. */
  top: 10px;
  display: flex; /* 플렉스 박스를 사용하여 자식 요소를 수직으로 정렬합니다. */
  flex-direction: column; /* 수직 방향으로 컬럼 정렬합니다. */
  overflow: hidden; /* 내용이 넘칠 때 숨깁니다. */
}

.center-item {
  height: 32px; /* 높이를 설정합니다. */
  margin-top: 5%; /* 위쪽 여백을 설정합니다. */
  margin-bottom: 20px;
  display: flex; /* 플렉스 박스를 사용하여 자식 요소를 정렬합니다. */
  background-color: white; /* 배경색을 흰색으로 설정합니다. */
  justify-content: center; /* 가로 방향 가운데 정렬합니다. */
  align-items: center; /* 세로 방향 가운데 정렬합니다. */
  position: sticky; /* 고정된 위치로 설정합니다. */
  top: 0; /* 상단에 고정될 위치를 설정합니다. */
  z-index: 1; /* 다른 요소 위에 표시되도록 인덱스를 설정합니다. */
}

.category {
  margin: 5px; /* 바깥쪽 여백을 설정합니다. */
  display: flex; /* 플렉스 박스를 사용하여 자식 요소를 정렬합니다. */
  gap: 10px; /* 간격을 설정합니다. */
  justify-content: flex-start !important; /* 가로 방향으로 왼쪽 정렬합니다. */
  align-self: flex-start !important; /* 자신을 가로 방향으로 왼쪽 정렬합니다. */
}

.category-slide,
.floor-slide {
  margin-left: 10px; /* 왼쪽 여백을 설정합니다. */
  width: calc(100% - 110px); /* 너비를 계산하여 설정합니다. */
  overflow: hidden; /* 내용이 넘칠 때 숨깁니다. */
}

.floor-slide .swiper-slide .d-button {
  width: 30px !important; /* 고정된 버튼 너비를 설정합니다. 원하는 너비로 조정하세요. */
  height: 30px !important; /* 고정된 버튼 높이를 설정합니다. 원하는 높이로 조정하세요. */
}

.category button {
  width: 100px; /* 너비를 설정합니다. */
  height: 30px; /* 높이를 설정합니다. */
  font-size: 16px; /* 폰트 크기를 설정합니다. */
}

.button {
  background-color: var(--navy-color); /* 배경색을 변수로 설정합니다. */
  border-radius: 8px; /* 테두리의 모서리를 둥글게 만듭니다. */
  color: white; /* 글자색을 설정합니다. */
  box-shadow: 2px 2px 3px #00000033; /* 그림자를 추가합니다. */
  border: none; /* 테두리를 없앱니다. */
  transition: background-color 0.3s ease; /* 배경색 변경 시 부드러운 전환을 적용합니다. */
}

.category-slide-item,
.floor-slide-item {
  width: auto !important; /* 너비를 자동으로 설정합니다. */
}

.swiper-slide {
  margin-bottom: 10px; /* 아래쪽 여백을 설정합니다. */
  width: auto; /* 너비를 자동으로 설정합니다. */
}
</style>