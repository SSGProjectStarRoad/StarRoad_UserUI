<template>
  <div class="comeToDetail">
     <div class="subway">
      <img src="@/img/store/subway.png" art=""/><span :style="{color:'violet'}"> 5호선</span>
      <p>하남검단산역 1번출구 -> 창우초등학교 방면(도보 10분)-> 스타필드하남</p>

     </div>
  </div>
</template>

<script>
export default {
  name : 'ComeToSubway'
}
</script>

<style scoped>
.comeToDetail {
  margin-top:5%;
  margin-left:3%;
 
 
}
.subway img{
  width: 20px;
  height: 20px;

}
.subway{
  margin-left:3%;
  text-align-last: left;
}
</style>