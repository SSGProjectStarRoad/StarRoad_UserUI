<template>
   <div class="comeToDetail">
      <p>주소 : 경기도 하남시 미사대로 750</p>
      <p>네비게이션 검색이름 : 스타필드 하남</p>
      <div class="car">
        <img src="@/img/store/car.png"/> 서울
      </div>

   <p>광진 방면 | 강변북로 -> 올림픽대로 -> 하남IC -> 미사대로</p>
   <P>잠실 방면 | 올림픽대로 -> 하남IC -> 미사대로</P>
   <P>천호 방면 | 올림픽대로 -> 하남IC -> 미사대로</P>
   <P>강동 방면 | 천호대로 -> 조정대로 -> 미사대로</P>
   <div class="car">
        <img src="@/img/store/car.png"/> 경기
      </div>
      <p>성남 방면 | 수도권 제1순환고속도로 -> 중부고속도로 -> 하남IC -> 미사대로</p>
   <P>광주 방면 | 화안대로 -> 중부고속도로 -> 하남IC -> 미사대로</P>
   <P>구리 방면 | 아차산로 -> 중부고속도로 -> 하남IC -> 미사대로</P>
   <P>덕소 방면 | 경강로 -> 창우로 -> 미사대로</P>
   <p>남양주 방면 | 강변북로 -> 고산로 -> 경강로 ->미사대로</p>
    </div>
</template>

<script>
export default {
  name : 'ComeToCar'
}
</script>

<style scoped>
.comeToDetail {
  margin-top:5%;
  text-align: center;
 
}

.car{
  margin-left:3%;
  text-align-last: left;
}
.car img{
  width: 20px;
  height: 20px;

}
</style>