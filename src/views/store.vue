<template>
  <div class="contents">
    <!-- 필요에 따라 back.png 살릴것 -->
    <!-- <img class="backimg" src="@/img/back.png" alt="" /> -->
    <div class="search">
      <img class="searchimg" src="@/img/search.png" alt="" />
      <input class="search-input" type="text" placeholder="매장명 검색">
    </div>
    <h4 class="info">STORE INFO</h4>
    <h4 class="info">매장안내</h4>
    <div class="category">
      <button class="button">카테고리별</button>
      <button>층별</button>
    </div>
  </div>
</template>

<script>
export default {
  // 필요한 컴포넌트 로직 추가
}
</script>

<style scoped>
@import '@/css/common.css';
.button{
  background-color: var(--navy-color);
}
.search-input {
  width: 700px;
  height: 15px;
  padding: 3px 5px;
  font-size: 16px;
  background-color: #f2f2f2;
  border: none;
  box-sizing: border-box; /* 추가 */
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
  margin-bottom: 5px;/* 위아래 마진 조정 */
}

.contents {

  display: flex;
  flex-direction: column;
  align-items: center;
}

.search {
  display: flex;
  align-items: center;
  background-color: var(--gray-color);
  border: 1px solid #ccc; /* 박스 테두리 */
  border-radius: 20px; /* 박스 모서리 둥글기 */
  padding: 5px 10px; /* 박스 내부 여백 */
  margin-bottom: 20px;
}

.search input {
  width: 200px;
  height: 30px;
  padding: 5px;
  font-size: 16px;
}

.category {
  display: flex;
  gap: 10px;
}

.category button {
  width: 100px;
  height: 30px;
  font-size: 16px;
}

</style>