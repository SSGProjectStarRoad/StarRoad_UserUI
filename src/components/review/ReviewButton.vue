<template>
   <button class="review_button">
      <div><img src="@/img/review/pencil.png" alt="Pencil Logo" /></div>
      <div>Write a Review</div>
    </button>
</template>

<script>
export default {


name:'revi ewbutton',
}
</script>

<style>
.review_button {
  z-index: 300;
  position: fixed;
  right: calc(50% - 240px);
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
}

.review_button div:first-child {
  margin-right: 10px;
}

.review_button div {
  font-size: 15px;
}

.review_button:active {
  box-shadow: none;
  color: var(--mint-color);
}
</style>