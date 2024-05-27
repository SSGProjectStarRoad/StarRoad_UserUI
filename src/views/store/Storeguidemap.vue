<template>
  <div v-if="store" class="contents">
    <!-- 매장 로고 -->
    <div class="store">
      <div class="store-detail">
        <img
          class="store-img"
          :src="store.imagePath"
          alt="매장로고"
          @load="onImageLoad"
        />
      </div>
    </div>

    <!-- 매장 이름 -->
    <h3 class="name">{{ store.name }}</h3>

    <!-- 매장 가이드 이미지 -->
    <img
      class="guide-img"
      :src="store.storeGuideMap"
      alt="매장오시는길"
      @load="onImageLoad"
    />

    <!-- 매장 층수 -->
    <h3 class="name">층수 : {{ store.floor }}층</h3>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      store: null, // 매장 정보를 저장할 데이터 프로퍼티를 정의합니다.
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

        const response = await axios.get(`${process.env.VUE_APP_API_URL}/store/${storeId}/guidemap`);

        // 서버로부터 받은 매장 정보를 store 데이터 프로퍼티에 할당합니다.
        this.store = response.data;
      } catch (error) {
        console.error('오류:', error);
      }
    },
    // 이미지 로드 이벤트 처리 함수
    onImageLoad(event) {
      // 이미지 로드가 완료되면 opacity 속성을 1로 변경하여 페이드 인 효과를 적용합니다.
      event.target.classList.add('loaded');
    },
  },
};
</script>

<style scoped>
@import '@/css/common.css';

/* 매장 이름 가운데 정렬 */
.name {
  text-align: center;
}

/* 매장 로고 이미지 스타일 */
.store-img {
  width: 50%; /* 이미지의 너비를 50%로 설정합니다. */
  height: 50%; /* 이미지의 높이를 50%로 설정합니다. */
  margin: 0 auto; /* 가운데 정렬을 위해 좌우 여백을 자동으로 조정합니다. */
  display: block; /* 블록 요소로 설정하여 가로 중앙 정렬을 적용합니다. */
  border-radius: 10px; /* 둥근 테두리를 적용합니다. */
  opacity: 0; /* 초기에는 투명도를 0으로 설정하여 페이드 인 효과를 준비합니다. */
  transition: opacity 0.5s ease-in-out; /* opacity 속성에 대한 전환 효과를 설정합니다. */
}

/* 로고 이미지 로드가 완료되면 투명도를 1로 변경하여 나타내는 효과를 부여합니다. */
.store-img.loaded {
  opacity: 1;
}

/* 가이드 이미지 스타일 */
.guide-img {
  max-width: 100%; /* 이미지의 최대 너비를 100%로 설정합니다. */
  max-height: 100%; /* 이미지의 최대 높이를 100%로 설정합니다. */
  margin: 0 auto; /* 가운데 정렬을 위해 좌우 여백을 자동으로 조정합니다. */
  display: block; /* 블록 요소로 설정하여 가로 중앙 정렬을 적용합니다. */
  border-radius: 10px; /* 둥근 테두리를 적용합니다. */
  opacity: 0; /* 초기에는 투명도를 0으로 설정하여 페이드 인 효과를 준비합니다. */
  transition: opacity 0.5s ease-in-out; /* opacity 속성에 대한 전환 효과를 설정합니다. */
  object-fit: contain; /* 이미지 비율을 유지하면서 컨테이너에 맞게 조정합니다. */
}
/* 가이드 이미지 로드가 완료되면 투명도를 1로 변경하여 나타내는 효과를 부여합니다. */
.guide-img.loaded {
  opacity: 1;
}
/* 가이드 이미지 컨테이너 스타일 */
.guide-img-container {
  width: 100%; /* 컨테이너의 너비를 100%로 설정합니다. */
  height: 0; /* 높이를 0으로 설정하여 패딩 값에 의해 높이가 결정되도록 합니다. */
  padding-bottom: 75%; /* 너비 대비 높이 비율을 75%로 설정합니다. 이미지의 종횡비에 맞게 조정해주세요. */
  position: relative; /* 자식 요소의 위치를 상대적으로 지정하기 위해 설정합니다. */
  overflow: hidden; /* 이미지가 컨테이너를 벗어나지 않도록 설정합니다. */
}
/* 가이드 이미지를 컨테이너 내부에 위치시킵니다. */
.guide-img-container .guide-img {
  position: absolute; /* 컨테이너 내부에서 절대 위치를 지정합니다. */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* 부모 요소인 .store-detail의 스타일 설정 */
.store-detail {
  display: flex; /* 플렉스 박스로 설정하여 내부 요소들을 수평으로 정렬합니다. */
  justify-content: center; /* 가운데 정렬을 위해 수평 정렬 방식을 가운데 정렬로 설정합니다. */
  align-items: center; /* 가운데 정렬을 위해 수직 정렬 방식을 가운데 정렬로 설정합니다. */
}
</style>
