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
          <img :src="person.profileImgUrl" alt="Profile image" />
        </div>
        <div class="data">
          <div class="profile-name">{{ person.name }}</div>
          <div class="follower-num">{{ person.followerNum }}</div>
        </div>
        <div class="delete">
          <button @click="deletePerson(person.id)">삭제</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import img from '@/img/spaceman_big.png';
export default {
  data() {
    return {
      activeTab: 'followers', // Initial active tab
      persons: [],
      followers: [
        {
          id: 1,
          name: 'Victory Am',
          followerNum: 1323,
          profileImgUrl: require('@/img/reward.png'),
        },
        { id: 2, name: 'Linda Bell', followerNum: 1456, profileImgUrl: img },
      ],
      followings: [
        { id: 3, name: 'James Lee', followerNum: 998, profileImgUrl: img },
        { id: 4, name: 'Chris Ray', followerNum: 1120, profileImgUrl: img },
        { id: 5, name: 'James Lee', followerNum: 998, profileImgUrl: img },
        { id: 6, name: 'Chris Ray', followerNum: 1120, profileImgUrl: img },
        { id: 7, name: 'James Lee', followerNum: 998, profileImgUrl: img },
        { id: 8, name: 'Chris Ray', followerNum: 1120, profileImgUrl: img },
        { id: 9, name: 'James Lee', followerNum: 998, profileImgUrl: img },
        { id: 10, name: 'Chris Ray', followerNum: 1120, profileImgUrl: img },
        { id: 11, name: 'James Lee', followerNum: 998, profileImgUrl: img },
        { id: 12, name: 'Chris Ray', followerNum: 1120, profileImgUrl: img },
        { id: 13, name: 'James Lee', followerNum: 998, profileImgUrl: img },
        { id: 14, name: 'Chris Ray', followerNum: 1120, profileImgUrl: img },
      ],
    };
  },
  mounted() {
    this.loadFollowers(); // 페이지 로드 시 팔로워 데이터 로드
  },
  methods: {
    loadFollowers() {
      this.persons = this.followers;
      this.activeTab = 'followers';
    },
    loadFollowings() {
      this.persons = this.followings;
      this.activeTab = 'followings';
    },
    deletePerson(id) {
      if (this.activeTab === 'followers') {
        this.followers = this.followers.filter(person => person.id !== id);
      } else {
        this.followings = this.followings.filter(person => person.id !== id);
      }
      this.persons = this.persons.filter(person => person.id !== id);
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
  color: black;
  font-weight: bold;
}
.inactive {
  color: gray;
}

.list {
  width: 400px;
  margin-top: 40px;
  margin-left: 50px;
}
.person {
  width: 360px;
  position: relative;
  display: flex;
  padding-bottom: 20px;
  padding-top: 20px;
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
  text-align: center;
  border-radius: 4px;
  background-color: var(--mint-color);
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
