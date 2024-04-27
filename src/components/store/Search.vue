<template>
  <div class="center-item">
    <p></p>
    <div class="search">
      <img class="searchimg" src="@/img/search.png" alt="" />
      <input class="search-input" type="text" placeholder="매장명 검색" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'search',
};
</script>

<style>
@import '@/css/common.css';
.center-item {
  background-color: white;
}

.search {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--gray-color);
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 5px 10px;
  box-shadow: 2px 2px 3px #00000033;
}
.button {
  background-color: var(--navy-color);
  border-radius: 15px;
}
.search-input {
  width: 300px;
  height: 15px;
  padding: 3px 5px;
  font-size: 12px;
  background-color: var(--gray-color);
  border: none;
  box-sizing: border-box;
  vertical-align: middle; /* 추가 */
}
.searchimg {
  width: 16px;
  height: 16px;
  margin-right: 5px;
  vertical-align: middle; /* 추가 */
}
.info {
  margin: 0;
  margin-bottom: 5px; /* 위아래 마진 조정 */
}
</style>
