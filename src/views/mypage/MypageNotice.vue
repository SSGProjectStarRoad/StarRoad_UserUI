<template>
  <div class="contents">
    <div class="notice-main">Notice</div>
    <div class="notice-datas">
      <div class="notice-no">NO</div>
      <div class="notice-title">제목</div>
      <div class="notice-date">작성날짜</div>
    </div>
    <div class="notice-cards">
      <div class="card" v-for="card in cards" :key="card.id">
        <div class="no">{{ card.id }}</div>
        <div class="title">{{ card.title }}</div>
        <div class="date">{{ card.date }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        { id: '01', title: '자라 매장 운영시간 변경', date: '2024-04-24' },
        {
          id: '02',
          title: '스타로드 어플리케이션 출시 이벤트 프로모션',
          date: '2024-04-24',
        },
      ],
    };
  },
};
</script>

<style scoped>
.notice-main {
  font-size: 30px;
  font-weight: 700;
  text-align: center;
}
.notice-datas,
.card {
  position: relative;
  margin: 30px;
  padding-top: 20px;
  display: flex;
  font-weight: 600;
  border-top: 3px solid;
  border-color: var(--navy-color);
}

.notice-title,
.title {
  margin-left: 40px;
}
.notice-date,
.date {
  position: absolute;
  right: 0;
}

.card {
  margin: 0 30px;
  border: 0px;
  font-weight: 400;
  padding-bottom: 20px;
  padding-top: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.title {
  max-width: 260px;
  flex-grow: 1; /* flex container 내에서 가능한 공간을 채움 */
  white-space: nowrap; /* 텍스트를 한 줄로 만듦 */
  overflow: hidden; /* 넘치는 내용을 숨김 */
  text-overflow: ellipsis; /* 넘치는 텍스트를 줄임표로 표시 */
}
</style>
