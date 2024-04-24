<template>
  <div class="list" v-for="(item,index) in 10" :key="index">
    <div class="store-header">
      <img class="store-img" src="@/img/ZARA.png" alt="" />
      <span class="store-name">자라</span>
    </div>
    <div class="store-detail">
      <a :href="'tel:' + phoneNumber" class="store-phone">
        <img src="@/img/phone.png" alt="전화 걸기" />
      </a>
      <img class="store-location" src="@/img/location.png" alt="" />
    </div>
  </div>
  
</template>

<script>
export default {
  name: "list",
  data() {
    return {
      phoneNumber: "010-6573-2265" // 임의의 전화번호로 설정
    };
  }
};
</script>

<style scoped>
@import "@/css/common.css";

.list {
  margin: 5px;
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* 수직 중앙 정렬 */
}

.store-header,
.store-detail {
  display: flex;
  align-items: center;
  /* 수직 중앙 정렬 */
  height: 35px;
  /* 높이 조정 */
}

.store-img {
  /* background-image: url("@/img/ZARA.png"); */
  width: 80px;
  height: 40px;
  background-size: 100%;
  border-radius: 10px;
}

.store-name {
  font-size: 16px;
  margin-left: 10px;
  font-weight: bold;
}

.store-phone,
.store-location {
  margin-left: 10px;
  width: 20px;
  height: 20px;
}

.store-phone img {
  width: 100%;
  height: 100%;
}
</style>