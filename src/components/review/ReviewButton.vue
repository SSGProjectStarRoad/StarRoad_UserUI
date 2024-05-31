<template>
  <button class="review_button" @click="navigateToWritePage">
    <div><img src="@/img/review/pencil.png" alt="Pencil Logo" /></div>
    <div class="review_text">Write a Review</div>
  </button>
</template>
<script>
export default {
  methods: {
    navigateToWritePage() {
      console.log('button Click');
      this.$router.push('/review/ocr');
    },
  },
  name: 'reviewbutton',
};
</script>
<style scoped>
.review_button {
  position: fixed;
  right: calc(55% - 270px);
  top: calc(100% - 120px);
  background-color: var(--navy-color);
  border-radius: 20px;
  display: flex;
  color: #fff;
  padding: 10px 20px;
  margin: 10px;
  border: none;
  box-shadow: 2px 2px 3px #00000033;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.review_button div {
  font-size: 15px;
}
.review_button div:first-child {
  margin-right: 0px;
}
.review_button:active {
  box-shadow: none;
  color: var(--mint-color);
}

.review_text {
  display: none;
  margin-left: 10px;
  transition: all 0.5s;
}

.review_button:hover .review_text {
  display: block;
}
</style>
