<template>
  <div class="contents">
    <div class="title">탈퇴하기</div>

    <div class="inactiveform">
      <div class="main-content">
        {{ userName }} 님과 이별인가요? <br />
        너무 아쉬워요...
      </div>
      <div class="sub-content">
        계정을 삭제하면 그동안의 모든 활동 정보가 삭제됩니다.
      </div>
      <form @submit.prevent="deactivateAccount">
        <div class="withdraw">
          <input id="withdraw" type="submit" value="탈퇴하기" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { inactiveUser } from '@/api/index';
import store from '@/store/index';

export default {
  data() {
    return {
      userName: '이수연', // 계정 주인의 이름
    };
  },
  methods: {
    async deactivateAccount() {
      try {
        const email = this.getEmail();
        const response = await inactiveUser(email);
        // alert(response.data);
        // 직접 Vuex 스토어와 쿠키에서 데이터를 제거
        // 로그아웃 처리 또는 리다이렉트
        await this.$router.push('/login');
        this.clearUserData();
      } catch (error) {
        console.error(error);
        // alert('탈퇴 처리 중 오류가 발생했습니다.');
      }
    },
    getEmail() {
      // Vuex store에서 이메일 가져오기
      return store.state.email;
    },
    clearUserData() {
      // Vuex store에서 이메일, 액세스 토큰 및 리프레시 토큰 지우기
      store.commit('clearEmail');
      store.commit('clearAccessToken');
      store.commit('clearRefreshToken');
      // 쿠키에서 관련 데이터 제거
      deleteCookie('til_auth');
      deleteCookie('til_user');
      deleteCookie('til_refresh');
    },
  },
};
</script>

<style scoped>
.contents {
  display: flex; /* Flexbox 레이아웃 사용 */
  flex-direction: column; /* 자식 요소들을 세로로 정렬 */
  align-items: center; /* 수평 방향 중앙 정렬 */
  height: 100vh; /* 뷰포트 높이를 전체 크기로 설정 */
}
.title {
  font-size: 25px;
  font-weight: 700;
  color: var(--dgray-color);
}
.main-content {
  font-size: 24px;
  font-weight: 700;
  text-align: left;
}
.sub-content {
  margin-top: 10px;
  font-size: 12px;
  color: var(--dgray-color);
  text-align: left;
}

.inactiveform {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  margin-top: 20px;
  padding-top: 60px;
  border-top: 1px solid var(--gray-color);
  text-align: center;
  position: relative;
  width: 350px;
}

#withdraw {
  margin-top: 30px;
  box-sizing: border-box;
  width: 100%;
  height: 48px;
  border-radius: 8px;
  background-color: var(--navy-color);
  border: 0;
  padding-left: 10px;
  color: white;
  font-size: 18px; /* 글씨 크기를 18px로 조정 */
  font-weight: bold; /* 글씨 굵기를 bold로 설정 */
  cursor: pointer; /* 버튼 위에 마우스를 올렸을 때 커서 모양을 손가락 모양으로 변경 */
  text-align: center; /* 텍스트 중앙 정렬 */
}
</style>
