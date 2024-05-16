<template>
  <!-- 프로그래스바 컨테이너 -->
  <div class="progress-bar">
    <!-- 텍스트를 위한 슬롯 -->
    <div class="text">
      <slot name="text"></slot>
    </div>
    <!-- 실제 프로그래스바 -->
    <div class="progress" :style="{ width: progress + '%' }"></div>
    <!-- 숫자를 위한 슬롯 -->
    <div class="number">
      <slot name="number"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    // 프로그래스바의 진행률을 받는 prop
    progress: {
      type: Number, // 숫자 타입
      required: true, // 필수 prop
    },
  },
};
</script>
<style scoped>
@import '@/css/common.css';

.progress-bar {
  position: relative;
  width: 100%; /* // 너비 100% */
  height: 30px; /* // 높이 30px */
  background-color: #e0e0e0; /* // 배경색 설정 */
  border-radius: 10px; /* // 모서리 둥글게 설정 */
  overflow: hidden; /* // 내부 콘텐츠가 넘칠 경우 숨김 처리 */
  margin-top: 10px; /* // 위쪽 여백 10px */
  display: flex; /* // Flexbox 레이아웃 사용 */
  align-items: center; /* // 수직 가운데 정렬 */
  box-shadow: 2px 2px 3px #00000033;
}
/* 실제 프로그래스바 스타일 */
.progress {
  position: absolute;
  height: 100%; /* // 높이 100% */
  background-color: var(
    --mint-color
  ); /* // 배경색을 민트색으로 설정 (common.css에 정의된 변수 사용) */
  transition: width 0.5s ease; /* // 너비 변경 시 0.5초 동안 부드럽게 애니메이션 적용 */
  box-shadow: 2px 2px 3px #00000033;
  border-radius: 10px;
}
/* 텍스트 스타일 */
.text {
  position: absolute;
  left: 10px;
  color: black;
  font-size: 14px;
  font-weight: bold;
  z-index: 1;
}

/* 숫자 스타일 */
.number {
  color: #333;
  /* // 글자색 설정 */
  font-weight: bold;
  /* // 글자 굵게 설정 */
}
/* 숫자 스타일 */
.number {
  margin-left: auto;
  margin-right: 10px;
  color: #333; /* // 글자색 설정 */
  font-weight: bold; /* // 글자 굵게 설정 */
}
</style>
