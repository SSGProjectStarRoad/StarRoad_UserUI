<template>
  <div class="contents">
    <div class="mystar">
      <img :src="cardImageUrl" alt="카드 이미지" />
    </div>
    <h2>별자리 획득</h2>
  </div>
</template>

<script>
import mystar1 from '@/img/mystar1.png';
export default {
  data() {
    return {
      // 이미지 URL을 데이터로 저장합니다. 실제 사용 시 이 값을 동적으로 업데이트하세요.
      cardImageUrl: mystar1,
    };
  },
  mounted() {
    setTimeout(() => {
      this.redirectToCompleted();
    }, 3000);
  },
  methods: {
    redirectToCompleted() {
      window.location.href = '/reward/completed';
    },
  },
};
</script>

<style scoped>
h2 {
  display: inline-block;
  position: absolute;
  color: rgba(0, 0, 0, 0.7);
  font-size: 25px;
  top: 350px;
  left: 50%; /* 왼쪽으로부터 50%의 위치에 배치 */
  transform: translate(-50%, -50%); /* 위치 보정을 위해 변환 사용 */
  margin: 0 auto;
}

.mystar {
  position: absolute;
  top: 180px;
  left: 50%; /* 왼쪽으로부터 50%의 위치에 배치 */
  transform: translate(-50%, -50%); /* 위치 보정을 위해 변환 사용 */
}
img {
  width: 200px;
}
</style>
