<template>
  <div class="contents">
    <!-- 필요에 따라 back.png 살릴것 -->
    <!-- <img class="backimg" src="@/img/back.png" alt="" /> -->
    <search/>
    <p></p>
    <h4 class="info">STORE INFO</h4>
    <h4 class="info">매장안내</h4>
    <div class="category">
      <div class="dropdown" v-click-outside="closeDropdown">
        <button id="categoryButton" class="button" @click="toggleCategoryDropdown" :style="{ 'margin-right': '80px' }">카테고리별</button>
        <div class="dropdown-content" v-show="showCategoryDropdown">
          <a v-for="(item, index) in category" :key="index" @click="selectCategory(item)">{{ item }}</a>
        </div>
      </div>
      <div class="dropdown" v-click-outside="closeDropdown">
        <button id="floorButton" class="button" @click="toggleFloorDropdown">층별</button>
        <div class="dropdown-content" v-show="showFloorDropdown">
          <a v-for="(item, index) in floor" :key="index" @click="selectFloor(item)">{{ item }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import search from '@/components/store/Search.vue';
import ClickOutside from 'vue-click-outside';

export default {
  data() {
    return {
      category: ['레스토랑&카페', '뷰티', '의류', '엔터테인먼트', '트레이더스', '홈퍼니싱', '라이프스타일', '키즈'],
      floor: ['1층', '2층', '3층', '4층', 'B1', 'B2'],
      showCategoryDropdown: false,
      showFloorDropdown: false,
    };
  },
  components: {
    search,
  },
  methods: {
    toggleCategoryDropdown() {
      this.showCategoryDropdown = !this.showCategoryDropdown;
    },
    toggleFloorDropdown() {
      this.showFloorDropdown = !this.showFloorDropdown;
    },
    selectCategory(item) {
      console.log('Selected Category:', item);
      // 선택한 카테고리에 대한 처리 로직 추가
      this.showCategoryDropdown = false;
    },
    selectFloor(item) {
      console.log('Selected Floor:', item);
      // 선택한 층에 대한 처리 로직 추가
      this.showFloorDropdown = false;
    },
    closeDropdown() {
      this.showCategoryDropdown = false;
      this.showFloorDropdown = false;
    },
  },
  directives: {
    ClickOutside,
  },
};
</script>
<style scoped>
@import '@/css/common.css';

.button {
  background-color: var(--navy-color);
  border-radius: 15px;
  color: white;
  box-shadow: 2px 2px 3px #00000033;
  border: none;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: var(--mint-color);
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
}

.category {
  display: flex;
  gap: 10px;
}

.category button {
  width: 100px;
  height: 30px;
  font-size: 16px;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  text-align: center;
  font-size: small;
  border-radius: 10px;
  display: block;
  position: absolute;
  top: 100%;
  transform: translateX(0%);
  background-color: var(--gray-color);
  min-width: 120px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}

.dropdown-content a {
  border-radius: 10px;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;
  text-align: center;
}

.dropdown-content a:hover {
  background-color: var(--mint-color);
}
</style>