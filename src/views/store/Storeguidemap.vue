<template>
  <div v-if="store" class="contents">
    <div class="store">
      <div class="store-detail">
        <img class="store-img" :src="store.imagePath" alt="매장로고" @load="onImageLoad">
      </div>
    </div>
    <h3 class="name">{{ store.name }}</h3>
    <p></p>
    <p></p>
    <p></p>
    <img class="guide-img" :src="store.storeGuideMap" alt="매장오시는길" @load="onImageLoad">
    <p>
    </p>
    <h3 class="name">층수 : {{ store.floor }}층</h3>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      store: null // 매장 정보를 저장할 데이터 프로퍼티를 정의합니다.
    };
  },
  mounted() {
    // 라우터 매개변수에서 매장 ID를 가져옵니다.
    const storeId = this.$route.params.storeId;
    // 매장 정보를 서버로부터 요청합니다.
    this.fetchStoreInfo(storeId);
  },
  methods: {
    async fetchStoreInfo(storeId) {
      try {
        // Axios를 사용하여 매장 정보를 서버로부터 요청합니다.
        const response = await axios.get(`${process.env.VUE_APP_API_URL}store/${storeId}/guidemap`);
        // 서버로부터 받은 매장 정보를 store 데이터 프로퍼티에 할당합니다.
        this.store = response.data;
      } catch (error) {
        console.error('오류:', error);
      }
    },
    onImageLoad(event) {
      event.target.classList.add('loaded');
    }
  }
};
</script>

<style scoped>
@import '@/css/common.css';

.name {
  text-align: center;
}

.store-img {
  width: 50%;
  height: 50%;
  margin: 0 auto;
  display: block;
  border-radius: 10px;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.store-img.loaded {
  opacity: 1;
}

.guide-img {
  max-width: 100%;
  max-height: 120%; 
  margin: 0 auto;
  display: block;
  border-radius: 10px;
  transform: scale(1.2);
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  overflow: hidden;
}

.guide-img.loaded {
  opacity: 1;
}

.store-detail {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>