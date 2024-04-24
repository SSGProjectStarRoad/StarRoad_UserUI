<template>
  <div class="contents">
    <div class="setting"><img src="@/img/setting.png" alt="" /></div>
    <div class="current-mall">
      <div class="mall-name">스타필드 하남</div>
      <div class="mall-time">(10:00~22:00)</div>
    </div>
    <div class="myinfo">
      <div class="basic-info">
        <div class="myname">이수연 님</div>
        <div class="mylevel">Blue Level</div>
      </div>
      <div class="review-follow">
        <div class="follower">
          팔로워
          <div class="follower-num">100</div>
        </div>
        <div class="following">
          팔로잉
          <div class="following-num">70</div>
        </div>
      </div>
      <div class="point-info">
        <div class="point">
          <div class="starroadpoint">STARROAD POINT</div>
          <div class="mypoint">23</div>
        </div>
        <div class="charge">
          <div class="pointcharge">POINT CHARGE</div>
          <div class="qr">QR 넣기?</div>
        </div>
      </div>
      <div class="myown">
        <div class="mycoupon">
          <div class="ownimg"><img src="@/img/mycoupon.png" alt="" /></div>
          <div class="text">쿠폰</div>
        </div>
        <div class="myreview">
          <div class="ownimg"><img src="@/img/myreview.png" alt="" /></div>
          <div class="text">리뷰</div>
        </div>
      </div>
      <div class="mallinfo">
        <div class="howto">
          <div class="ownimg"><img src="@/img/howto.png" alt="" /></div>
          <div class="text">오시는 길</div>
        </div>
        <div class="announcement">
          <div class="ownimg"><img src="@/img/howto.png" alt="" /></div>
          <div class="text">공지사항</div>
        </div>
        <div class="inquiry">
          <div class="ownimg"><img src="@/img/howto.png" alt="" /></div>
          <div class="text">1:1 문의하기</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.setting {
  position: relative;
  left: 90%;
}
.setting img {
  width: 30px;
}

.current-mall {
  position: relative;
  left: 40px;
}
.mall-name {
  font-size: 20px;
  font-weight: 600;
}
.mall-time {
  position: relative;
  color: var(--dgray-color);
  left: 15px;
}
.myinfo {
  position: relative;
  top: 20px;
}
.basic-info {
  position: relative;
  display: flex;
  left: 55px;
}
.myname {
  font-size: 23px;
  font-weight: 900;
}
.mylevel {
  width: 90px;
  text-align: center;
  align-content: center;
  background-color: var(--navy-color);
  color: white;
  border-radius: 8px;
  font-size: 14px;
  margin-left: 15px;
}

.review-follow {
  position: relative;
  display: flex;
  top: 30px;
  left: 60px;
  font-size: 15px;
  font-weight: 600;
}
.follower {
  display: flex;
}
.follower-num {
  margin-left: 10px;
}
.following {
  display: flex;
  margin-left: 45px;
}
.following-num {
  margin-left: 10px;
}
.point-info,
.myown,
.mallinfo {
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
  display: flex;
  top: 40px;
  justify-content: space-around;
  font-size: 20px;
  font-weight: 600;
  padding-top: 60px;
  margin: 30px;
}

.point,
.mycoupon,
.myreview,
.pointcharge,
.howto,
.announcement,
.inquiry {
  text-align: center;
}
.mypoint {
  padding: 30px;
  color: var(--mint-color);
  font-size: 30px;
}
.qr {
  padding: 30px;
}
</style>
