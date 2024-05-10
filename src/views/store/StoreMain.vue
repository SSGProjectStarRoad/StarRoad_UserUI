<template>
  <div class="parent-with-scroll">
    <div class="fix">
      <div class="center-item">
        <p></p>
        <div class="search">
          <img class="searchimg" src="@/img/search.png" alt="" />
          <input class="search-input" type="text" placeholder="매장명 검색" @input="searchStore" @keyup.enter="searchStore"/>
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
              <button
                class="d-button"
                :class="{ active: selectedCategory === category }"
                @click="toggleCategory(category)"
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
            :slidesPerView="'auto'"
            :spaceBetween="10"
            :freeMode="true"
            :freeModeSticky="true"
            :grabCursor="true"
            :resistanceRatio="0"
          >
            <SwiperSlide v-for="(floor, index) in floor" :key="index">
              <button
                class="d-button"
                :class="{ active: selectedFloor === floor }"
                @click="toggleFloor(floor)"
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
    <list :selected-category="selectedCategory" 
    :selected-floor="selectedFloor" 
    :search-keyword="searchKeyword" 
    :stores="filteredStores" />
  </div>
</template>
<script>
import search from '@/components/store/Search.vue'; // 검색 컴포넌트를 가져옵니다.
import list from '@/components/store/list.vue'; // 리스트 컴포넌트를 가져옵니다.
import { Swiper, SwiperSlide } from 'swiper/vue'; // Swiper 및 SwiperSlide 컴포넌트를 가져옵니다.
import 'swiper/css'; // Swiper의 CSS를 가져옵니다.

export default {
  components: {
    search, // 검색 컴포넌트를 등록합니다.
    list, // 리스트 컴포넌트를 등록합니다.
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      searchKeyword: '', // 검색어를 저장하는 데이터입니다.
      categories: ['식당&카페', '뷰티', '의류', '엔터테인먼트', '마트', '홈퍼니싱', '라이프스타일', '키즈'], // 카테고리 목록을 정의합니다.
      floor: [-2,-1,1,2,3,4], // 층별 목록을 정의합니다.
      selectedCategory: '', // 선택된 카테고리를 저장하는 데이터입니다.
      selectedFloor: '', // 선택된 층을 저장하는 데이터입니다.
      stores: [], // 매장 목록을 저장하는 데이터입니다.
    };
  },
  computed: {
    // 검색어에 따라 필터링된 매장 목록을 계산하는 계산된 속성입니다.
    filteredStores() {
      if (this.searchKeyword === '') {
        return this.stores; // 검색어가 없으면 전체 매장 목록을 반환합니다.
      } else {
        const keyword = this.searchKeyword.toLowerCase();
        // 검색어를 포함하는 매장 목록만 반환합니다.
        return this.stores.filter(store => store.name.toLowerCase().includes(keyword));
      }
    },
  },
  methods: {
    // 검색어를 입력할 때 호출되는 메서드입니다.
    searchStore(event) {
      this.searchKeyword = event.target.value; // 검색어를 업데이트합니다.
    },
    // 카테고리를 토글하는 메서드입니다.
    toggleCategory(category) {
      if (this.selectedCategory === category) {
        this.selectedCategory = ''; // 선택된 카테고리를 해제합니다.
      } else {
        this.selectedCategory = category; // 선택된 카테고리를 설정합니다.
      }
      this.fetchStores(); // 매장 목록을 업데이트합니다.
    },
    // 층을 토글하는 메서드입니다.
    toggleFloor(floor) {
      if (this.selectedFloor === floor) {
        this.selectedFloor = ''; // 선택된 층을 해제합니다.
      } else {
        this.selectedFloor = floor; // 선택된 층을 설정합니다.
      }
      this.fetchStores(); // 매장 목록을 업데이트합니다.
    },
    // 매장 목록을 가져오는 비동기 메서드입니다.
    async fetchStores() {
      try {
        let url = '/api/stores'; // 매장 목록을 가져올 API 엔드포인트 URL입니다.
        // 선택된 카테고리 및 층에 따라 URL을 동적으로 생성합니다.
        if (this.selectedCategory && this.selectedFloor) {
          url += `?category=${this.selectedCategory}&floor=${this.selectedFloor}`;
        } else if (this.selectedCategory) {
          url += `?category=${this.selectedCategory}`;
        } else if (this.selectedFloor) {
          url += `?floor=${this.selectedFloor}`;
        }
        // API를 호출하여 매장 목록을 가져옵니다.
        const response = await fetch(url);
        const data = await response.json();
        this.stores = data; // 가져온 매장 목록을 저장합니다.
      } catch (error) {
        console.error('Error fetching store data:', error); // 오류가 발생하면 콘솔에 오류를 기록합니다.
      }
    },
  },
  created() {
    this.fetchStores(); // 컴포넌트가 생성될 때 매장 목록을 가져옵니다.
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
  background-color: var(--mint-color); /* 활성 상태일 때 배경색을 변수로 설정합니다. */
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
  display: flex; /* 플렉스 박스를 사용하여 자식 요소를 수직으로 정렬합니다. */
  flex-direction: column; /* 수직 방향으로 컬럼 정렬합니다. */
  overflow: hidden; /* 내용이 넘칠 때 숨깁니다. */
}

.center-item {
  height: 32px; /* 높이를 설정합니다. */
  margin-top: 5%; /* 위쪽 여백을 설정합니다. */
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
