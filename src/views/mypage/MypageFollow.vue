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
          <button @click="showModal(person.id)">삭제</button>
        </div>
      </div>
    </div>

    <!-- 모달 -->
    <div v-if="showConfirmModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <h3>팔로잉 삭제</h3>
        </div>
        <div class="modal-body">
          <p>팔로잉 삭제 하시겠습니까?</p>
        </div>
        <div class="modal-footer">
          <button @click="confirmDelete">확인</button>
          <button @click="closeModal">취소</button>
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
} from '@/api/index';

export default {
  data() {
    return {
      activeTab: 'followers',
      persons: [],
      followers: [],
      followings: [],
      basicprofile,
      showConfirmModal: false,
      personToDelete: null, // ID of the person to delete
    };
  },
  computed: {
    ...mapState(['email']),
    ...mapGetters(['isLogin']),
  },
  mounted() {
    this.loadFollowSummary();
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
        const responseFollowing = await myfollowingData(this.email);
        const responseFollower = await myfollowerData(this.email);
        this.followers = responseFollower.data;
        this.followings = responseFollowing.data;
        this.loadFollowers();
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
    showModal(personId) {
      this.personToDelete = personId;
      this.showConfirmModal = true;
    },
    closeModal() {
      this.showConfirmModal = false;
      this.personToDelete = null;
    },
    async confirmDelete() {
      if (this.personToDelete !== null) {
        try {
          if (this.activeTab === 'followers') {
            // await deletemyfollowerData(this.personToDelete);
            this.followers = this.followers.filter(
              person => person.id !== this.personToDelete,
            );
          } else {
            await deletemyfollowingData(this.email, this.personToDelete);
            this.followings = this.followings.filter(
              person => person.id !== this.personToDelete,
            );
          }
          this.persons = this.persons.filter(
            person => person.id !== this.personToDelete,
          );
        } catch (error) {
          console.error('Failed to delete person:', error);
        } finally {
          this.closeModal();
        }
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

/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-header {
  margin-bottom: 20px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}

.modal-footer button {
  margin-left: 10px;
  padding: 5px 10px;
  color: white;
  background-color: var(--navy-color);
  border-radius: 10px;
  border: 0;
}
</style>
