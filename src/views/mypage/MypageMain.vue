<template>
  <LoadingSpinner v-if="isLoading" />
  <div class="contents" v-else>
    <div class="img">
      <div class="setting" @click="goToEditPage">
        <img src="@/img/setting.png" alt="" />
      </div>
      <div class="logout" @click="logoutUser">
        <img src="@/img/logout.png" alt="" />
      </div>
    </div>
    <div class="current-mall">
      <div class="mall-name">스타필드 하남</div>
      <div class="mall-time">(10:00~22:00)</div>
    </div>
    <div class="myinfo">
      <div class="basic-info">
        <div class="myname">{{ mydata.name }}</div>
        &nbsp님
        <div :class="levelClass">{{ levelText }}</div>
        <div class="mynickname">{{ mydata.nickname }}</div>
      </div>
      <div class="review-follow" @click="goToFollowPage">
        <div class="follower">
          팔로워
          <div class="follower-num">{{ follow.followingCount }}</div>
        </div>
        <div class="following">
          팔로잉
          <div class="following-num">{{ follow.followerCount }}</div>
        </div>
      </div>
      <div class="point-info">
        <div class="point">
          <div class="starroadpoint">STARROAD POINT</div>
          <div class="mypoint">{{ mydata.point }}</div>
        </div>
        <div class="charge">
          <!-- <div class="pointcharge">POINT CHARGE</div> -->
          <!-- <div class="qr">QR 넣기?</div> -->
        </div>
      </div>
      <div class="myown">
        <div class="mycoupon" @click="goToCouponPage">
          <div class="ownimg"><img src="@/img/mycoupon.png" alt="" /></div>
          <div class="text">내 쿠폰 보기</div>
        </div>
        <div class="myreview" @click="goToReviewPage">
          <div class="ownimg"><img src="@/img/myreview.png" alt="" /></div>
          <div class="text">내 리뷰 보기</div>
        </div>
      </div>
      <div class="mallinfo">
        <div class="howto" @click="goToMallMap">
          <div class="ownimg"><img src="@/img/howto.png" alt="" /></div>
          <div class="text">오시는 길</div>
        </div>
        <div class="inquiry">
          <div class="title">문의하기</div>
          <div class="text">ssg@gmail.com</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mypageData, followData } from '@/api/index';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { mapState, mapGetters } from 'vuex';
export default {
  components: {
    LoadingSpinner,
  },
  data() {
    return {
      mydata: [],
      follow: [],
    };
  },
  computed: {
    ...mapState(['email']),
    ...mapGetters(['isLogin']),
    levelText() {
      const reviewExp = this.mydata.reviewExp;
      if (reviewExp >= 300) return 'Green Level';
      if (reviewExp >= 100) return 'Yellow Level';
      return 'Blue Level';
    },
    levelClass() {
      const reviewExp = this.mydata.reviewExp;
      if (reviewExp >= 300) return 'green-level mylevel';
      if (reviewExp >= 100) return 'yellow-level mylevel';
      return 'blue-level mylevel';
    },
  },
  methods: {
    async getMyFollowCount() {
      try {
        // const userId = 1; // 예시 ID, 실제 적용시 적절한 ID 사용
        const response = await followData(this.email);
        console.log('Response:', response.data);
        this.follow = response.data;
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async getMydata() {
      try {
        // const userId = 1; // 예시 ID, 실제 적용시 적절한 ID 사용
        const response = await mypageData(this.email);
        console.log('Response:', response.data);
        this.mydata = response.data;
      } catch (error) {
        console.error('Error:', error);
      }
    },

    goToEditPage() {
      this.$router.push('/mypage/edit'); // Vue Router를 사용하여 페이지 전환
    },
    goToFollowPage() {
      this.$router.push('/mypage/follow'); // Vue Router를 사용하여 페이지 전환
    },
    goToCouponPage() {
      this.$router.push('/mypage/mycoupon'); // Vue Router를 사용하여 페이지 전환
    },
    goToReviewPage() {
      this.$router.push('/mypage/myreview'); // Vue Router를 사용하여 페이지 전환
    },
    goToMallMap() {
      this.$router.push('/store/mallmap');
    },
    logoutUser() {
      console.log(
        'Logging out user:',
        this.$store.state.email,
        this.$store.state.accessToken,
      );
      this.$store
        .dispatch('logout')
        .then(() => {
          this.$router.push('/login');
        })
        .catch(error => {
          console.error('Failed to logout', error);
          this.$router.push('/mypage/main');
        });
    },
  },

  mounted() {
    this.getMydata();
    this.getMyFollowCount();
  },
};
</script>

<style scoped>
.img {
  display: flex;
}
.setting,
.logout {
  position: relative;
  width: 35px;
  height: 35px;
  left: 85%;
  cursor: pointer;
}
.setting {
  margin-right: 5px;
}
.setting img,
.logout img {
  width: 30px;
  height: 30px;
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
  /* left: 15px; */
}
.myinfo {
  position: relative;
  top: 20px;
}
.basic-info {
  position: relative;
  display: flex;
  font-size: 23px;
  left: 55px;
}
.myname {
  font-size: 23px;
  /* color: var(--navy-color); */
  font-weight: 900;
}
.mynickname {
  position: absolute;
  top: 30px;
  font-size: 14px;
  color: var(--dgray-color);
}
.mylevel {
  width: 90px;
  text-align: center;
  align-content: center;
  color: white;
  border-radius: 8px;
  font-size: 14px;
  margin-left: 15px;
}

.review-follow {
  width: 200px;
  cursor: pointer;
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
  color: var(--navy-color);
}
.following {
  display: flex;
  margin-left: 45px;
}
.following-num {
  margin-left: 10px;
  color: var(--navy-color);
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
.mycoupon,
.myreview,
.howto,
.announcement,
.inquiry {
  cursor: pointer;
  color: var(--navy-color);
}
.mypoint {
  padding: 30px;
  color: var(--navy-color);
  font-size: 30px;
}
.inquiry .title {
  color: black;
  margin-bottom: 10px;
  font-size: 24px;
}

.qr {
  padding: 30px;
}
.blue-level {
  background-color: var(--navy-color);
}

.yellow-level {
  background-color: rgb(235, 235, 0);
}

.green-level {
  background-color: var(--mint-color);
}
</style>
