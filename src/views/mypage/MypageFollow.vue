<template>
  <div class="contents">
    <div class="follow-type">
      <div
        class="follower"
        :class="{
          active: activeTab === 'followers',
          inactive: activeTab !== 'followers',
        }"
        @click="loadFollowers"
      >
        Follower {{ followers.length }}명
      </div>
      <div
        class="following"
        :class="{
          active: activeTab === 'followings',
          inactive: activeTab !== 'followings',
        }"
        @click="loadFollowings"
      >
        Following {{ followings.length }}명
      </div>
    </div>
    <div class="list">
      <div class="person" v-for="person in persons" :key="person.id">
        <div class="profile-img">
          <img
            :src="getProfileImage(person.profileImgUrl)"
            alt="프로필 이미지"
            @error="handleImageError"
          />
        </div>
        <div class="data">
          <div class="profile-name">{{ person.nickname }}</div>
          <div class="follower-num">#{{ person.id }}</div>
        </div>
        <div class="delete" v-if="activeTab !== 'followers'">
          <button @click="deletePerson(person.id)">삭제</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import basicprofile from '@/img/spaceman_big.png';
import { mapState, mapGetters } from 'vuex';
import {
  myfollowerData,
  myfollowingData,
  deletemyfollowingData,
  deletemyfollowerData,
} from '@/api/index';
export default {
  data() {
    return {
      activeTab: 'followers', // Initial active tab
      persons: [],
      followers: [],
      followings: [],
      basicprofile,
    };
  },
  computed: {
    ...mapState(['email']),
    ...mapGetters(['isLogin']),
  },
  mounted() {
    this.loadFollowSummary(); // 페이지 로드 시 요약 데이터 로드
  },
  methods: {
    handleImageError(event) {
      event.target.src = this.basicprofile;
    },
    getProfileImage(profileImgUrl) {
      return profileImgUrl ? profileImgUrl : this.basicprofile;
    },
    async loadFollowSummary() {
      try {
        // const userId = 1;
        const responseFollowing = await myfollowingData(this.email);
        const responseFollower = await myfollowerData(this.email);
        this.followers = responseFollower.data;
        this.followings = responseFollowing.data;
        this.loadFollowers(); // 초기 로드 시 팔로워 데이터를 기본으로 로드
      } catch (error) {
        console.error('Failed to load follow summary:', error);
      }
    },
    loadFollowers() {
      this.persons = this.followers;
      this.activeTab = 'followers';
    },
    loadFollowings() {
      this.persons = this.followings;
      this.activeTab = 'followings';
    },
    async deletePerson(id) {
      if (confirm('정말로 삭제하시겠습니까?')) {
        // const userId = 1;
        if (this.activeTab === 'followers') {
          // await deletemyfollowerData(id);
          this.followers = this.followers.filter(person => person.id !== id);
        } else {
          await deletemyfollowingData(this.email, id);

          this.followings = this.followings.filter(person => person.id !== id);
        }
        this.persons = this.persons.filter(person => person.id !== id);
      }
    },
  },
};
</script>

<style scoped>
.follow-type {
  width: 400px;
  margin: auto;
  position: relative;
  justify-content: space-around;
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 30px;
  font-weight: 700;
  font-size: 18px;
}
.follower,
.following {
  cursor: pointer;
  padding: 10px 20px;
}
.active {
  color: var(--navy-color);
  font-weight: bold;
  border-radius: 20px;
  box-shadow: 0px 0px 10px var(--navy-color);
}
.inactive {
  color: var(--dgray-color);
  border-radius: 20px;
  box-shadow: 0px 0px 10px var(--dgray-color);
}

.list {
  width: 400px;
  margin-top: 40px;
  margin-left: 50px;
}
.person {
  width: 65%;
  position: relative;
  display: flex;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.profile-img {
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid black;
}
.profile-img img {
  width: 100%; /* 이미지 너비를 부모에 맞춤 */
  height: 100%; /* 이미지 높이를 부모에 맞춤 */
  border-radius: 50%; /* 원 형태로 만듦 */
}
.data {
  margin-left: 10px;
}
.profile-name {
  font-weight: 600;
  font-size: 16px;
}
.follower-num {
  margin-top: 3px;
  padding-top: 3px;
  text-align: center;
  border-radius: 4px;
  background-color: var(--navy-color);
  font-size: 10px;
  color: white;
  max-width: 30px;
  height: 15px;
}
.delete {
  position: absolute;
  top: 30px;
  right: 0;
}

.delete button {
  background-color: var(--navy-color);
  border-radius: 8px;
  color: white;
  border: 0;
  width: 50px;
  height: 30px;
}
</style>
