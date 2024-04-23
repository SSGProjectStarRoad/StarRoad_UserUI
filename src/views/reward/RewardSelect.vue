<template>
  <div class="contents">
    <div class="rewardcard">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide card">
            <h1>첫번째 별</h1>
            <div class="couponimg"><img src="" alt="쿠폰이미지" /></div>
            <a href="javascript:void(0)" class="btn">의류쇼핑쿠폰</a>
          </div>
          <div class="swiper-slide card">
            <h1>두번째 별</h1>
            <div class="couponimg"><img src="" alt="쿠폰이미지" /></div>
            <a href="javascript:void(0)" class="btn">의류쇼핑쿠폰</a>
          </div>
          <div class="swiper-slide card">
            <h1>세번째 별</h1>
            <div class="couponimg"><img src="" alt="쿠폰이미지" /></div>
            <a href="javascript:void(0)" class="btn">의류쇼핑쿠폰</a>
          </div>
          <div class="swiper-slide card">
            <h1>네번째 별</h1>
            <div class="couponimg"><img src="" alt="쿠폰이미지" /></div>
            <a href="javascript:void(0)" class="btn">의류쇼핑쿠폰</a>
          </div>
          <div class="swiper-slide card">
            <h1>다섯번째 별</h1>
            <div class="couponimg"><img src="" alt="쿠폰이미지" /></div>
            <a href="javascript:void(0)" class="btn">의류쇼핑쿠폰</a>
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
export default {
  mounted() {
    new Swiper('.rewardcard .swiper-container', {
      on: {
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
      spaceBetween: 10, // 슬라이드 사이 여백
      centeredSlides: true, // 1번 슬라이드가 가운데 보이기
      slidesPerGroup: 1,
      // slideToClickedSlide: true,
      pagination: {
        // 페이지 번호 사용 여부
        el: '.rewardcard .swiper-pagination', // 페이지 번호 요소 선택자
        clickable: true, // 사용자의 페이지 번호 요소 제어 가능 여부
      },
    });
  },
};
</script>

<style scoped>
.contents {
  overflow: hidden;
}
.swiper-slide {
  transition: transform 0.3s ease-in-out;
  max-height: 280px;
  margin: 10px;
}
.rewardcard .swiper-container {
  /* overflow: hidden; */
  /* width: 100%; 컨테이너를 부모의 전체 너비로 설정 */
  max-width: 750px; /* 최대 너비를 제한하고 싶다면 여기서 설정 */
  height: 320px;
  position: absolute;
  top: 180px;
  left: 50%; /* 중앙 정렬을 위해 사용 */
  transform: translateX(-57%); /* 정확히 중앙에 배치 */
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
</style>
