<template>
  <div class="modal-backdrop" v-if="isModalVisible"></div>

  <!-- 모달 컨텐츠 -->
  <div class="modal" v-if="isModalVisible">
    <h3>별 탐색 완료!</h3>
    <p>나의 기록을 별에 새겨보세요</p>
    <a href="/reward/ocr" @click.prevent="navigateToReviewPage"
      >리뷰 작성하기</a
    >
  </div>
  <div class="contents">
    <!-- 모달 배경 -->

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
            <div class="night" v-if="card.showSparkle">
              <div class="shooting_star" v-for="n in 20" :key="n"></div>
            </div>
            <p :class="card.fadeClass" id="benefit">
              {{ card.benefitMessage }}
            </p>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import { issueCouponAPI, ReviewCount } from '@/api/index';
import { mapState, mapGetters } from 'vuex';
export default {
  data() {
    return {
      // 기존 카드 데이터
      isModalVisible: false, // 모달 상태
      cards: [
        {
          title: '첫번째 별',

          message: '',
          benefitMessage: '',
          showButton: true,
          buttonText: '의류쿠폰받기',
          couponId: 1,
        },
        {
          title: '두번째 별',

          message: '',
          benefitMessage: '',
          showButton: true,
          buttonText: '키즈쿠폰받기',
          couponId: 2,
        },
        {
          title: '세번째 별',

          message: '',
          benefitMessage: '',
          showButton: true,
          buttonText: '엔터테인먼트쿠폰받기',
          couponId: 3,
        },
        {
          title: '네번째 별',
          message: '',
          benefitMessage: '',
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
          benefitMessage: '',
          showButton: true,
          buttonText: '마트쿠폰받기',
          couponId: 6,
        },
        {
          title: '일곱번째 별',
          message: '',
          benefitMessage: '',
          showButton: true,
          buttonText: '홈퍼니싱쿠폰받기',
          couponId: 7,
        },
        {
          title: '여덟번째 별',
          message: '',
          benefitMessage: '',
          showButton: true,
          buttonText: '라이프스타일쿠폰받기',
          couponId: 8,
        },
      ],
    };
  },
  computed: {
    ...mapState(['email']),
    ...mapGetters(['isLogin']),
  },
  methods: {
    navigateToReviewPage(event) {
      event.preventDefault();
      this.closeModal();
      this.$router.push('/review/ocr');
    },
    getImagePath(index) {
      return require(`@/img/reward/category/category${index + 1}.png`); // 인덱스에 1을 더해 이미지 파일명 생성
    },
    async closeModal() {
      try {
        // const userId = 1; // 예시 ID, 실제 적용시 적절한 ID 사용
        const response = await ReviewCount(this.email);
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
      // const userId = 1; // 실제 사용자 ID로 대체해야 합니다.
      if (!card.couponId) {
        console.error('No coupon ID found for this card:', card);
        return;
      }
      const couponId = card.couponId;

      try {
        // 쿠폰 할인 백엔드에서 골라줘서 보내주기
        const response = await issueCouponAPI(this.email, couponId);
        console.log(response);
        console.log('Coupon issued:', response.data);
        this.cards[index].message = '어떤 별이 찾아올까요?';
        this.cards[index].showButton = false;
        this.cards[index].fadeClass = 'fade-in';
        this.cards[index].showSparkle = true; // 반짝이는 애니메이션 시작
        setTimeout(() => {
          this.cards[
            index
          ].benefitMessage = `${response.data} % 할인 쿠폰 발급`;
        }, 3000);
        setTimeout(() => {
          this.cards[index].showSparkle = false;
        }, 5000);

        setTimeout(() => {
          this.redirectToSearch();
        }, 7000);
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
            activeSlide.style.pointerEvents = 'auto';
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
  width: 480px;
  left: 50%;
  transform: translate(-50%);
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4); /* 반투명 회색 배경 */
  z-index: 2000;
  /* 모달을 다른 요소들 위에 표시 */
}

.modal {
  position: fixed;
  top: 200px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2000; /* 배경보다 앞에 표시 */
  background-color: white;
  text-align: center;
  padding: 20px;
  border-radius: 30px;
  border: 8px solid var(--mint-color);
  /* 스타일링은 원하는 대로 조정 */
}
.modal h3 {
  color: var(--navy-color);
}
.modal a {
  color: var(--dgray-color);
}

.contents {
  overflow: hidden;
  height: 100vh;
}
.swiper-slide {
  transition: transform 0.3s ease-in-out;
  max-height: 260px;
  margin: 10px;
  pointer-events: none;
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
  opacity: 0;
  font-size: 14px;
}

.card p.fade-in {
  opacity: 1;
  margin-top: 0;
  margin-bottom: 5px;
  padding-bottom: 5px;
}
#benefit {
  color: var(--mint-color);
}
.btn {
  color: var(--mint-color);
}
@keyframes tail {
  0% {
    width: 0;
  }
  30% {
    width: 100px;
  }
  100% {
    width: 0;
  }
}

@keyframes shining {
  0% {
    width: 0;
  }
  50% {
    width: 30px;
  }
  100% {
    width: 0;
  }
}

@keyframes shooting {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(300px);
  }
}

.night {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotateZ(45deg);
}

.shooting_star {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 2px;
  background: linear-gradient(-45deg, var(--mint-color), rgba(0, 0, 255, 0));
  border-radius: 999px;
  filter: drop-shadow(0 0 6px var(--mint-color));
  animation: tail 3000ms ease-in-out infinite,
    shooting 3000ms ease-in-out infinite;
}

.shooting_star::before,
.shooting_star::after {
  content: '';
  position: absolute;
  top: calc(50% - 1px);
  right: 0;
  height: 2px;
  background: linear-gradient(
    -45deg,
    rgba(0, 0, 255, 0),
    var(--mint-color),
    rgba(0, 0, 255, 0)
  );
  transform: translateX(50%) rotateZ(45deg);
  border-radius: 100%;
  animation: shining 3000ms ease-in-out infinite;
}

.shooting_star::after {
  transform: translateX(50%) rotateZ(-45deg);
}

.shooting_star:nth-child(1) {
  top: calc(50% - -90px);
  left: calc(50% - 260px);
  animation-delay: 364ms;
}
.shooting_star:nth-child(2) {
  top: calc(50% - -87px);
  left: calc(50% - 147px);
  animation-delay: 1290ms;
}
.shooting_star:nth-child(3) {
  top: calc(50% - 108px);
  left: calc(50% - 33px);
  animation-delay: 6470ms;
}
.shooting_star:nth-child(4) {
  top: calc(50% - -105px);
  left: calc(50% - 124px);
  animation-delay: 7098ms;
}
.shooting_star:nth-child(5) {
  top: calc(50% - -175px);
  left: calc(50% - 11px);
  animation-delay: 6325ms;
}
.shooting_star:nth-child(6) {
  top: calc(50% - 60px);
  left: calc(50% - 201px);
  animation-delay: 5113ms;
}
.shooting_star:nth-child(7) {
  top: calc(50% - 137px);
  left: calc(50% - 31px);
  animation-delay: 6381ms;
}
.shooting_star:nth-child(8) {
  top: calc(50% - -157px);
  left: calc(50% - 239px);
  animation-delay: 5385ms;
}
.shooting_star:nth-child(9) {
  top: calc(50% - 75px);
  left: calc(50% - 119px);
  animation-delay: 1570ms;
}
.shooting_star:nth-child(10) {
  top: calc(50% - -27px);
  left: calc(50% - 12px);
  animation-delay: 7079ms;
}
.shooting_star:nth-child(11) {
  top: calc(50% - -52px);
  left: calc(50% - 67px);
  animation-delay: 5894ms;
}
.shooting_star:nth-child(12) {
  top: calc(50% - 136px);
  left: calc(50% - 98px);
  animation-delay: 7132ms;
}
.shooting_star:nth-child(13) {
  top: calc(50% - 125px);
  left: calc(50% - 82px);
  animation-delay: 203ms;
}
.shooting_star:nth-child(14) {
  top: calc(50% - 6px);
  left: calc(50% - 190px);
  animation-delay: 4750ms;
}
.shooting_star:nth-child(15) {
  top: calc(50% - 154px);
  left: calc(50% - 280px);
  animation-delay: 4715ms;
}
.shooting_star:nth-child(16) {
  top: calc(50% - -105px);
  left: calc(50% - 170px);
  animation-delay: 9065ms;
}
.shooting_star:nth-child(17) {
  top: calc(50% - -37px);
  left: calc(50% - 100px);
  animation-delay: 752ms;
}
.shooting_star:nth-child(18) {
  top: calc(50% - -23px);
  left: calc(50% - 18px);
  animation-delay: 5484ms;
}
.shooting_star:nth-child(19) {
  top: calc(50% - -22px);
  left: calc(50% - 288px);
  animation-delay: 9377ms;
}
.shooting_star:nth-child(20) {
  top: calc(50% - 142px);
  left: calc(50% - 72px);
  animation-delay: 3007ms;
}
</style>
