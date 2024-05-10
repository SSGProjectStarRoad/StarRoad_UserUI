<template>
  <div class="list">
    <div class="store" v-for="(store, index) in filteredStores" :key="index">
      <div class="store-header" @click="goToStoreReview(store.id)">
        <img class="store-img" :src="store.imagePath" alt="" />
        <span class="store-name">{{ store.name }}</span>
        <div class="store-icons"> <!-- 추가 -->
          <a :href="'tel:' + store.contactNumber" class="store-phone">
            <img src="@/img/phone.png" alt="전화 걸기" />
          </a>
          <img class="store-location" src="@/img/location.png" alt="위치" />
        </div> <!-- 추가 -->
      </div>
    </div>
  </div>
</template>

<script>
import { fetchStoreList } from '@/api/index.js'; // '@/api/index.js'에서 fetchStoreList 함수를 가져옵니다.

export default {
  name: 'StoreList', // StoreList 컴포넌트를 정의합니다.
  props: { // 부모 컴포넌트로부터 전달받는 props를 정의합니다.
    selectedCategory: { // 선택된 카테고리를 나타내는 props입니다.
      type: String, // 문자열 타입입니다.
      default: '', // 기본값은 빈 문자열입니다.
    },
    selectedFloor: { // 선택된 층을 나타내는 props입니다.
      type: String, // 문자열 타입입니다.
      default: '', // 기본값은 빈 문자열입니다.
    },
    searchKeyword: { // 검색 키워드를 나타내는 props입니다.
      type: String, // 문자열 타입입니다.
      default: '', // 기본값은 빈 문자열입니다.
    },
  },
  data() { // 컴포넌트의 데이터를 정의합니다.
    return {
      storeList: [], // 매장 목록을 저장하는 배열입니다.
    };
  },
  computed: { // 계산된 속성을 정의합니다.
    filteredStores() { // 필터링된 매장 목록을 반환하는 함수입니다.
      let filtered = this.storeList; // 필터링된 결과를 저장할 변수를 초기화합니다.

      if (this.selectedCategory !== '') { // 선택된 카테고리가 있는 경우
        filtered = filtered.filter(store => store.storeType === this.selectedCategory); // 선택된 카테고리와 일치하는 매장만 필터링합니다.
      }

      if (this.selectedFloor !== '') { // 선택된 층이 있는 경우
        filtered = filtered.filter(store => store.floor === this.selectedFloor); // 선택된 층과 일치하는 매장만 필터링합니다.
      }

      if (this.searchKeyword !== '') { // 검색 키워드가 있는 경우
        const keyword = this.searchKeyword.toLowerCase(); // 검색 키워드를 소문자로 변환합니다.
        filtered = filtered.filter(store => store.name.toLowerCase().includes(keyword)); // 매장 이름에 검색 키워드가 포함된 매장만 필터링합니다.
      }

      return filtered; // 필터링된 매장 목록을 반환합니다.
    },
  },
  watch: { // 감시자(watch)를 정의합니다.
    selectedCategory() { // selectedCategory의 변경을 감시합니다.
      this.getStoreList(); // 매장 목록을 다시 가져오는 함수를 호출합니다.
    },
    selectedFloor() { // selectedFloor의 변경을 감시합니다.
      this.getStoreList(); // 매장 목록을 다시 가져오는 함수를 호출합니다.
    },
    searchKeyword() { // searchKeyword의 변경을 감시합니다.
      // 검색어가 변경되었을 때 추가적인 동작을 수행할 수 있습니다.
      // 예를 들어, 검색 결과를 서버에서 다시 가져오는 등의 작업을 할 수 있습니다.
      // this.getStoreList();
    },
  },
  created() { // 컴포넌트가 생성될 때 실행되는 라이프사이클 훅입니다.
    this.getStoreList(); // 매장 목록을 가져오는 함수를 호출합니다.
  },
  methods: { // 컴포넌트의 메서드를 정의합니다.
    async getStoreList() { // 매장 목록을 가져오는 비동기 함수입니다.
      try {
        this.storeList = await fetchStoreList(); // 매장 목록을 가져와 storeList에 저장합니다.
        console.log(this.storeList); // 가져온 매장 목록을 콘솔에 출력합니다.
      } catch (error) {
        console.error(error); // 에러가 발생한 경우 콘솔에 에러를 출력합니다.
      }
    },
    goToStoreReview(storeId) { // 매장 리뷰 페이지로 이동하는 함수입니다.
      this.$router.push(`/store/${storeId}/review`); // 매장 리뷰 페이지로 라우팅합니다.
    },
  },
};
</script>
<style scoped>
@import '@/css/common.css'; /* 공통 스타일 시트를 가져옵니다. */

/* 매장 목록을 나타내는 요소의 스타일입니다. */
.list {
  margin-top: 10px;
  margin: 30px; /* 여백 설정 */
  margin-right: 0px;
  display: flex; /* 플렉스 박스로 배치 */
  flex-direction: column;
  align-items: center;
}

/* 각 매장을 나타내는 요소의 스타일입니다. */
.store {
  margin-bottom: 20px; /* 하단 여백 설정 */
  width:100%;
  max-width:400px;
}

/* 매장 헤더 부분의 스타일입니다. */
.store-header {
  display: flex; /* 플렉스 박스로 배치 */
  align-items: center; /* 요소들을 수직으로 정렬 */
  cursor: pointer; /* 포인터 커서 설정 */
  justify-content: space-between;
  
}

/* 매장 이미지의 스타일입니다. */
.store-img {
  width: 80px;
  height: 40px;
  border-radius: 10px;
  flex-shrink: 0; /* 이미지 크기를 고정 */
}

/* 매장 이름의 스타일입니다. */
.store-name {
  font-size: 16px;
  margin-left: 10px;
  font-weight: bold;
  margin-right: auto;
  flex-shrink: 1; /* 텍스트가 줄어들 수 있음 */
  overflow: hidden;
  white-space: normal;


}

/* 전화 걸기 및 위치 아이콘의 스타일입니다. */
.store-phone,
.store-location {
  margin-left: 10px; /* 왼쪽 여백 설정 */
  width: 20px; /* 너비 설정 */
  height: 20px; /* 높이 설정 */
}
.store-icons{
  display: flex;
  align-items: center;
}
/* 전화 걸기 및 위치 아이콘 이미지의 스타일입니다. */
.store-phone img,
.store-location img {
  width: 100%; /* 이미지 너비를 부모 요소에 맞게 설정 */
  height: 100%; /* 이미지 높이를 부모 요소에 맞게 설정 */
}
</style>
