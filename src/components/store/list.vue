<template>
  <div class="list">
    <div class="store" v-for="(store, index) in filteredStores" :key="index">
      <div class="store-header">
        <img
          class="store-img"
          :src="store.imagePath"
          alt=""
          @click="$emit('store-click', store.id)"
        />
        <span class="store-name" @click="$emit('store-click', store.id)">{{
          store.name
        }}</span>
        <div class="store-icons">
          <!-- 추가 -->
          <a :href="'tel:' + store.contactNumber" class="store-phone">
            <img src="@/img/phone.png" alt="전화 걸기" />
          </a>
          <img
            class="store-location"
            src="@/img/location.png"
            alt="위치"
            @click="storeguide(store.id)"
          />
        </div>
        <!-- 추가 -->
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'; // axios 라이브러리를 가져옵니다.

import { fetchStoreList } from '@/api/index.js'; // '@/api/index.js'에서 fetchStoreList 함수를 가져옵니다.
import { storeguide } from '@/api/index.js'; // '@/api/index.js'에서 storeguide 함수를 가져옵니다.

export default {
  components: {},
  name: 'StoreList',
  props: {
    selectedCategory: {
      type: String,
      default: '',
    },
    selectedFloor: {
      type: String,
      default: '',
    },
    searchKeyword: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      storeList: [], // 매장 목록을 저장하는 배열입니다.
    };
  },
  computed: {
    filteredStores() {
      let filtered = this.storeList; // 필터링된 결과를 저장할 변수를 초기화합니다.

      if (this.selectedCategory !== '') {
        // 선택된 카테고리가 있는 경우
        filtered = filtered.filter(
          store => store.storeType === this.selectedCategory,
        ); // 선택된 카테고리와 일치하는 매장만 필터링합니다.
      }

      if (this.selectedFloor !== '') {
        // 선택된 층이 있는 경우
        filtered = filtered.filter(store => store.floor === this.selectedFloor); // 선택된 층과 일치하는 매장만 필터링합니다.
      }

      if (this.searchKeyword !== '') {
        // 검색 키워드가 있는 경우
        const keyword = this.searchKeyword.toLowerCase(); // 검색 키워드를 소문자로 변환합니다.
        filtered = filtered.filter(store =>
          store.name.toLowerCase().includes(keyword),
        ); // 매장 이름에 검색 키워드가 포함된 매장만 필터링합니다.
      }

      return filtered; // 필터링된 매장 목록을 반환합니다.
    },
  },
  watch: {
    selectedCategory() {
      this.getStoreList(); // selectedCategory의 변경을 감시하여 매장 목록을 다시 가져옵니다.
    },
    selectedFloor() {
      this.getStoreList(); // selectedFloor의 변경을 감시하여 매장 목록을 다시 가져옵니다.
    },
    searchKeyword() {
      // 검색 키워드가 변경되었을 때 추가적인 동작을 수행할 수 있습니다.
      // 예를 들어, 검색 결과를 서버에서 다시 가져오는 등의 작업을 할 수 있습니다.
      // this.getStoreList();
    },
  },
  created() {
    this.getStoreList(); // 컴포넌트가 생성될 때 매장 목록을 가져오는 함수를 호출합니다.
  },
  methods: {
    async getStoreList() {
      try {
        this.storeList = await fetchStoreList(); // 매장 목록을 가져와 storeList에 저장합니다.
        console.log(this.storeList); // 가져온 매장 목록을 콘솔에 출력합니다.
      } catch (error) {
        console.error(error); // 에러가 발생한 경우 콘솔에 에러를 출력합니다.
      }
    },
    async storeguide(storeId) {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}/store/${storeId}/guidemap`,
        );
        console.log('서버 응답:', response.data);
        // 데이터 처리를 완료한 후 페이지를 이동합니다.
        this.$router.push(`/store/${storeId}/guidemap`);
      } catch (error) {
        console.error('오류:', error);
      }
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
  width: 100%;
  max-width: 400px;
}

/* 매장 헤더 부분의 스타일입니다. */
.store-header {
  display: flex;
  margin-top: 10px;
  align-items: center; /* 요소들을 수직으로 정렬 */
  cursor: pointer; /* 포인터 커서 설정 */
  justify-content: space-between;
}

/* 매장 이미지의 스타일입니다. */
.store-img {
  width: 55px;
  height: 40px;
  border-radius: 20px;
  box-shadow: 0px 0px 3px var(--navy-color);
  flex-shrink: 0; /* 이미지 크기를 고정 */
}

/* 매장 이름의 스타일입니다. */
.store-name {
  font-size: 16px;
  margin-left: 30px;
  font-weight: bold;
  margin-right: auto;
  flex-shrink: 1; /* 텍스트가 줄어들 수 있음 */
  overflow: hidden;
  white-space: normal;
}

.store-name:hover {
  color: var(--navy-color);
}

/* 전화 걸기 및 위치 아이콘의 스타일입니다. */
.store-phone,
.store-location {
  margin-left: 10px; /* 왼쪽 여백 설정 */
  width: 20px; /* 너비 설정 */
  height: 20px; /* 높이 설정 */
}
.store-icons {
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
