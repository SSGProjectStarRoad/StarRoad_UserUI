<template>
  <div class="contents">
    <div class="title">
      <h2>ACCESS</h2>
      <h2>오시는길</h2>
    </div>
    <div class="title-detail">
      <p :style="{ color: 'red', margin: '2%' }">365일 연중 무휴</p>
      <p :style="{ margin: '2%' }">영업시간 10:00 ~ 22:00</p>
    </div>
    <div class="comeToMall">
      <img src="@/img/store/comeToMall.png" alt="" />
    </div>

    <table class="comeMenu">
      <tr>
        <td
          class="Car"
          :class="{ active: selectedTab === 'car' }"
          @click="selectedTab = 'car'"
        >
          자동차
        </td>
        <td
          class="Subway"
          :class="{ active: selectedTab === 'subway' }"
          @click="selectedTab = 'subway'"
        >
          지하철
        </td>
        <td
          class="Bus"
          :class="{ active: selectedTab === 'bus' }"
          @click="selectedTab = 'bus'"
        >
          버스
        </td>
      </tr>
    </table>
    <div class="ride-catetory">
      <ComeToCar v-if="selectedTab === 'car'" />
      <ComeToSubway v-if="selectedTab === 'subway'" />
      <ComeToBus v-if="selectedTab === 'bus'" />
    </div>
  </div>
</template>

<script>
import ComeToCar from '@/components/store/ComeToCar.vue';
import ComeToSubway from '@/components/store/ComeToSubway.vue';
import ComeToBus from '@/components/store/ComeToBus.vue';
export default {
  data() {
    return {
      selectedTab: 'car',
    };
  },
  components: {
    ComeToCar,
    ComeToBus,
    ComeToSubway,
  },
};
</script>

<style scoped>
@import '@/css/common.css';
.title {
  text-align: center;
}
.comeToMall img {
  max-width: 100%;
  border-radius: 8px;
  height: auto;
}

.comeMenu {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.comeMenu td {
  width: 33.33%;
  padding: 10px;
  text-align: center;
  border: 1px solid #ccc;
  cursor: pointer;
}
.comeMenu td:hover {
  background-color: var(--mint-color);
}
.comeMenu td.active {
  background-color: var(--mint-color);
}
</style>
