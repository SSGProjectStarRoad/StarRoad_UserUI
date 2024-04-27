<template>
  <div class="comeToDetail">
    <div class="bus">
      <img src="@/img/store/bus.png" art=""/><span> 직행버스</span>
      <p :style="{color:'red'}">9302,9303</p>
      <img src="@/img/store/bus.png" art=""/><span> 일반버스</span>
      <p :style="{color:'blue'}">23,81</p>
      <img src="@/img/store/bus.png" art=""/><span> 마을버스</span>
      <p :style="{color:'green'}">50</p>

    </div>
  </div>
</template>

<script>
export default {
name:'ComeToBus',
}
</script>

<style scoped>
.comeToDetail {
  margin-top:5%;
  margin-left:3%;
 
}
.bus img{
  width: 20px;
  height: 20px;
  

}
.bus{
  margin-left:3%;
  text-align-last: left;
}

</style>