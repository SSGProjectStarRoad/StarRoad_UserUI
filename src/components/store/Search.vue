<template>
  
  <div class="search">
      <img class="searchimg" src="@/img/search.png" alt="" />
      <input class="search-input" type="text" placeholder="매장명 검색">
    </div>
</template>

<script>
export default {
  name: 'search'

}
</script>

<style>
@import '@/css/common.css';


.search {
  position: fixed;
  display: flex;
  align-items: center;
  background-color: var(--gray-color);
  border: 1px solid #ccc; /* 박스 테두리 */
  border-radius: 20px; /* 박스 모서리 둥글기 */
  padding: 5px 10px; /* 박스 내부 여백 */
  box-shadow: 2px 2px 3px #00000033;
  /* margin-bottom: 20px; */
}
.button{
  background-color: var(--navy-color);
  border-radius: 15px;
}
.search-input {
  width: 300px;
  height: 15px;
  padding: 3px 5px;
  font-size: 16px;
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
  margin-bottom: 5px;/* 위아래 마진 조정 */
}
</style>