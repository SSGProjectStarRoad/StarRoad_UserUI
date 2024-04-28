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
  left: calc(50% - 240px);
  top: calc(100% - 120px);
  background-color: var(--navy-color);
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
  width: 20px; /* 이미지 크기 조정 */
  height: 20px; /* 이미지 크기 조정 */
}
.scroll-to-top-button img{
  width : 20px;
  heith: 20px;
}

.scroll-to-top-button:active {
  box-shadow: none;
  color: var(--mint-color);
}
</style>