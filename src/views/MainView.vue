<template>
  <div class="contents">
    <!-- 필요에 따라 back.png 살릴것 -->
    <!-- <img class="backimg" src="@/img/back.png" alt="" /> -->
    <div class="starroad_logo">
      <div class="starroad_logo_img"><img src="@/img/telescope_big.png" /></div>
      <div class="starroad_logo_text">Welcome to Star Road</div>
    </div>
    <div class="user_level">
      <div>My Review</div>
      <div class="review_gage">
        <div class="user_rank">Blue Level</div>
        <div class="user_exp">
          <ProgressBar class="user_progressbar" :progress="72" />
        </div>
      </div>
    </div>
    <div class="event_space">
      <div style="margin-left: 5px">EVENT</div>
      <div>
        <!-- 이벤트 페이지 -->
        <div class="event_list">
          <div>
            <a href="#"><img src="@/img/event_test.png" /></a>
          </div>
          <div>
            <a href="#"><img src="@/img/event_test.png" /></a>
          </div>
          <div>
            <a href="#"><img src="@/img/event_test.png" /></a>
          </div>
        </div>
      </div>
    </div>
    <button class="review_button">
      <div><img src="@/img/review/pencil.png" alt="Pencil Logo" /></div>
      <div>Write a Review</div>
    </button>
  </div>
</template>

<script>
import ProgressBar from '@/components/store/ProgressBar.vue';

export default {
  components: {
    ProgressBar,
  },
};
</script>

<style scoped>
.starroad_logo {
  position: relative;
}

.starroad_logo img {
  width: 6rem;
  margin-left: 10%;
}

.starroad_logo_text {
  position: absolute;
  top: 60%;
  left: 25%;
  font-size: 1rem;
}

.user_level {
  background-color: var(--navy-color);
  padding: 25px;
  border-radius: 20px;
  color: #fff;
}

.user_level > div:first-child {
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: 50;
}

.review_gage {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.user_rank {
  font-size: 24px;
  width: 35%;
  margin-right: 20px;
  font-weight: bold;
}

.user_exp {
  width: 80%;
  padding-bottom: 10px;
}

.user_progressbar.progress-bar {
  background-color: #fff;
}

.event_space {
  margin: 10px 0;
  padding-bottom: 60px;
}

.event_space > div:first-child {
  width: fit-content;
  font-size: 20px;
  margin-bottom: 10px;
  border: var(--navy-color) 2px solid;
  border-radius: 20px;
  padding: 8px 20px;
}

.event_space div {
  margin-bottom: 10px;
}

.event_list div {
  text-align: center;
  border-radius: 20px;
  height: 100%;
}

.event_list div img {
  width: 100%;
}

.review_button {
  position: fixed;
  right: calc(50% - 240px);
  top: calc(100% - 120px);
  background-color: var(--navy-color);
  border-radius: 20px;
  display: flex;
  color: #fff;
  padding: 10px 20px;
  margin: 10px;
  border: none;
  box-shadow: 2px 2px 3px #00000033;
  display: flex;
  justify-content: center;
}

.review_button div:first-child {
  margin-right: 10px;
}

.review_button div {
  font-size: 15px;
}

.review_button:active {
  box-shadow: none;
  color: var(--mint-color);
}
</style>
