<template>
  <button class="scroll-to-top-button">
    <div><img src="@/img/store/upbutton.png" alt="upbutton Logo" /></div>
  </button>
</template>

<script>
export default {
  name: 'scrollToTopButton',
}
</script>

<style scoped>
.scroll-to-top-button {
  position: fixed;
  left: calc(50% - 25px);
  top: calc(100% - 120px);
  background-color: rgb(185, 176, 176);
  border-radius: 8px;
  display: flex;
  color: #fff;
  padding: 10px 10px;
  margin: 10px;
  border: none;
  box-shadow: 2px 2px 3px #00000033;
  display: flex;
  justify-content: center;
  cursor: pointer;
}

.scroll-to-top-button div:first-child {
  /* margin-right: 10px; */
}

.scroll-to-top-button div {
  font-size: 15px;
  width: 15px; /* 이미지 크기 조정 */
  height: 15px; /* 이미지 크기 조정 */
}
.scroll-to-top-button img{
  width : 15px;
  height: 15px;
}
.scroll-to-top-button:active {
  box-shadow: none;
  color: var(--mint-color);
}
</style>