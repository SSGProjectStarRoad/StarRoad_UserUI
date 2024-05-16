<template>
  <div class="contents">
    <!-- 모달 배경 -->
    <div class="modal-backdrop" v-if="isModalVisible"></div>

    <!-- 모달 컨텐츠 -->
    <div class="modal" v-if="isModalVisible">
      <h3>쿠폰 사용이 확인되었습니다!</h3>
      <p>리뷰를 작성해주세요</p>
      <a href="/reward/main" @click="closeModal">리뷰쓰기</a>
      <!-- 리뷰쓰기로 나중에 바꿀것 -->
    </div>
    <div class="rewardcard">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide card"
            v-for="(card, index) in cards"
            :key="index"
          >
            <h1>{{ card.title }}</h1>
            <div class="couponimg">
              <img :src="getImagePath(index)" alt="" />
            </div>
            <a
              href="javascript:void(0)"
              class="btn"
              v-if="card.showButton"
              @click="issueCoupon(index)"
              >{{ card.buttonText }}</a
            >
            <p :class="card.fadeClass">{{ card.message }}</p>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import { issueCouponAPI, ReviewCount } from '@/api/index';
export default {
  data() {
    return {
      // 기존 카드 데이터
      isModalVisible: false, // 모달 상태
      cards: [
        {
          title: '첫번째 별',

          message: '',
          showButton: true,
          buttonText: '의류쿠폰받기',
          couponId: 1,
        },
        {
          title: '두번째 별',

          message: '',
          showButton: true,
          buttonText: '키즈쿠폰받기',
          couponId: 2,
        },
        {
          title: '세번째 별',

          message: '',
          showButton: true,
          buttonText: '엔터테인먼트쿠폰받기',
          couponId: 3,
        },
        {
          title: '네번째 별',
          message: '',
          showButton: true,
          buttonText: '식당카페쿠폰받기',
          couponId: 4,
        },
        {
          title: '다섯번째 별',
          message: '',
          showButton: true,
          buttonText: '뷰티쿠폰받기',
          couponId: 5,
        },
        {
          title: '여섯번째 별',
          message: '',
          showButton: true,
          buttonText: '마트쿠폰받기',
          couponId: 6,
        },
        {
          title: '일곱번째 별',
          message: '',
          showButton: true,
          buttonText: '홈퍼니싱쿠폰받기',
          couponId: 7,
        },
        {
          title: '여덟번째 별',
          message: '',
          showButton: true,
          buttonText: '라이프스타일쿠폰받기',
          couponId: 5,
        },
      ],
    };
  },
  methods: {
    getImagePath(index) {
      return require(`@/img/reward/category/category${index + 1}.png`); // 인덱스에 1을 더해 이미지 파일명 생성
    },
    async closeModal() {
      try {
        const userId = 1; // 예시 ID, 실제 적용시 적절한 ID 사용
        const response = await ReviewCount(userId);
        console.log('Response:', response.data);
        this.isModalVisible = false;
      } catch (error) {
        console.error('Error:', error);
      }
    },
    openModal() {
      this.isModalVisible = true;
    },
    checkModalState() {
      if (this.$route.query.modal === 'true') {
        this.isModalVisible = true; // URL 쿼리 파라미터에 따라 모달 상태 변경
      }
    },

    async issueCoupon(index) {
      const card = this.cards[index];
      const userId = 1; // 실제 사용자 ID로 대체해야 합니다.
      if (!card.couponId) {
        console.error('No coupon ID found for this card:', card);
        return;
      }
      const couponId = card.couponId;

      try {
        const response = await issueCouponAPI(userId, couponId);
        console.log('Coupon issued:', response.data);
        this.cards[index].message = '쿠폰이 발급되었습니다.';
        this.cards[index].showButton = false;
        this.cards[index].fadeClass = 'fade-in';
        setTimeout(() => {
          this.redirectToSearch();
        }, 3000);
      } catch (error) {
        console.error('Error issuing coupon:', error);
        this.cards[index].message = '쿠폰 발급에 실패하였습니다.';
        this.cards[index].fadeClass = 'fade-in';
      }
    },
    redirectToSearch() {
      this.$router.push('/reward/search');
    },
  },
  mounted() {
    this.checkModalState();
    this.$nextTick(() => {
      new Swiper('.rewardcard .swiper-container', {
        on: {
          init: function () {
            this.slides.forEach(slide => {
              slide.style.width = '195px'; // 각 슬라이드의 너비를 220px로 설정
            });
          },
          slideChange: function () {
            // 현재 활성화된 슬라이드와 그 주변 슬라이드를 찾아 스타일을 조정합니다.
            this.slides.forEach(slide => {
              slide.style.transform = ''; // 기본 상태로 리셋
              slide.style.zIndex = 0; // z-index 리셋
              slide.style.opacity = '0.7'; // 비활성 슬라이드의 투명도를 낮춥니다.
              slide.style.background = '#407AFF'; // 기본 배경색 설정
              slide.style.boxShadow = 'none';
              slide.style.color = 'white';
            });
            const activeSlide = this.slides[this.activeIndex];
            this.slides[this.activeIndex].style.opacity = '1'; // 활성 슬라이드의 투명도를 높입니다.
            this.slides[this.activeIndex].style.background = 'white'; // 활성 슬라이드 배경색 제거
            this.slides[this.activeIndex].style.color = '#407AFF';
            this.slides[this.activeIndex].style.boxShadow =
              '0 0 20px rgba(0, 0, 0, 0.5)';
            activeSlide.style.transform = 'scale(1.4)'; // 활성 슬라이드 스케일 증가
            activeSlide.style.zIndex = 1; // 활성 슬라이드를 앞으로
            // 이전과 이후 슬라이드 스타일을 조정할 수 있습니다.
            // 예를 들어 this.slides[this.activeIndex + 1]으로 다음 슬라이드를 찾을 수 있습니다.
          },
        },
        loop: true, // 반복 재생 여부
        slidesPerView: 3, // 한 번에 보여줄 슬라이드 개수
        centeredSlides: true,
        freeMode: false, // 자유 모드 비활성화
        spaceBetween: 10, // 슬라이드 사이
        slidesPerGroup: 1,
        // slideToClickedSlide: true,
        pagination: {
          // 페이지 번호 사용 여부
          el: '.rewardcard .swiper-pagination', // 페이지 번호 요소 선택자
          clickable: true, // 사용자의 페이지 번호 요소 제어 가능 여부
        },
      });
    });
  },
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 회색 배경 */
  z-index: 1000;
  /* 모달을 다른 요소들 위에 표시 */
}

.modal {
  position: fixed;
  top: 180px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001; /* 배경보다 앞에 표시 */
  background-color: white;
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  border: 8px solid var(--mint-color);
  /* 스타일링은 원하는 대로 조정 */
}

.contents {
  overflow: hidden;
  height: 100vh;
}
.swiper-slide {
  transition: transform 0.3s ease-in-out;
  max-height: 240px;
  margin: 10px;
}
.rewardcard .swiper-container {
  /* overflow: hidden; */
  /* width: 100%; 컨테이너를 부모의 전체 너비로 설정 */
  max-width: 660px; /* 최대 너비를 제한하고 싶다면 여기서 설정 */
  height: 280px;
  position: absolute;
  top: 140px;
  left: 50%; /* 중앙 정렬을 위해 사용 */
  transform: translateX(-51%); /* 정확히 중앙에 배치 */
}
.card {
  align-content: center;
  text-align: center;
  border-radius: 8px;
  border: 5px solid var(--navy-color);
  /* box-shadow: 0 0 20px rgba(0, 0, 0, 0.5); */
}

.couponimg {
  color: var(--navy-color);
  height: 120px;
  margin-bottom: 10px;
}
.couponimg img {
  width: 100px;
}

.card p {
  transition: opacity 1s ease-in-out;
  opacity: 0; /* 초기에는 투명 */
  font-size: 14px; /* 폰트 크기 줄임 */
}

.card p.fade-in {
  opacity: 1; /* 메시지가 변경되면 투명도를 1로 설정 */
}
</style>
