<template>
  <div class="contents">
    <div class="title">프로필 수정</div>

    <div class="registerform">
      <form action="">
        <div class="profileimg">
          <img src="@/img/spaceman_big.png" alt="이미지" />
        </div>
        <div class="imgfix" @click="goToEditimgPage">
          <img src="@/img/pencil.png" alt="이미지" />
        </div>
        <div class="nicknameinput">
          <input
            id="nickname"
            type="text"
            placeholder="닉네임을 입력해주세요"
            v-model="nickname"
          />
          <div class="nicknamecheck">
            <input id="nicknamechecking" type="button" value="중복 체크" />
          </div>
        </div>
        <div class="emailinput">
          <input
            id="email"
            type="text"
            placeholder="starroad@gmail.com"
            v-model="email"
            readonly="true"
          />
        </div>
        <div class="passwordinput">
          <img class="passwordeye" :src="passwordEye" alt="" />
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            v-model="password"
          />
        </div>
        <div class="passwordcheckinput">
          <img class="passwordeye" :src="passwordEye" alt="" />
          <input
            id="passwordcheck"
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요"
            v-model="passwordcheck"
          />
        </div>
        <div class="registerinput">
          <input id="registerclear" type="button" value="저장하기" />
        </div>
      </form>
    </div>
    <div class="withdrawal" @click="goToWitdrwaPage">계정 탈퇴하기</div>
  </div>
</template>

<script>
import passwordEye from '@/img/login/passwordeye.png';
export default {
  data() {
    return {
      passwordEye: passwordEye,
    };
  },
  methods: {
    goToWitdrwaPage() {
      this.$router.push('/mypage/withdraw'); // Vue Router를 사용하여 페이지 전환
    },
    goToEditimgPage() {
      this.$router.push('/mypage/editimg'); // Vue Router를 사용하여 페이지 전환
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
.profileimg {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden; /* 이미지가 컨테이너 밖으로 나가지 않도록 */
  margin: 0 auto; /* 자동 마진으로 가운데 정렬 */
  border: 2px solid var(--mint-color);
}

.profileimg img {
  max-width: 100%; /* 이미지가 컨테이너 너비를 초과하지 않도록 */
  max-height: 100%; /* 이미지가 컨테이너 높이를 초과하지 않도록 */
}

.imgfix {
  cursor: pointer;
  position: absolute;
  top: 140px;
  right: 130px;
  display: flex; /* Flexbox 레이아웃 적용 */
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--dgray-color);
}
.imgfix img {
  width: 60%; /* 이미지의 크기를 .imgfix의 크기에 맞춤 */
  height: auto; /* 비율 유지 */
}
.registerform {
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
.nameinput,
.passwordinput,
.passwordcheckinput,
.passwordinput,
.registerinput,
.emailinput {
  position: relative;
  margin-top: 20px;
}
.passwordeye {
  position: absolute;
  top: 50%;
  right: 7px;
  transform: translateY(-50%);
  width: 13px;
  height: 10px;
  cursor: pointer;
}
#nickname,
#email,
#password,
#passwordcheck {
  box-sizing: border-box;
  width: 100%;
  height: 48px;
  border-radius: 8px;
  background-color: var(--gray-color);
  border: 1px solid white;
  padding-left: 10px;
  outline: none;
}
#nickname:focus,
#email:focus,
#password:focus,
#passwordcheck:focus {
  border: 2px solid var(--mint-color);
}
#registerclear {
  margin-top: 30px;
  box-sizing: border-box;
  width: 100%;
  height: 48px;
  border-radius: 8px;
  background-color: var(--navy-color);
  border: 0;
  padding-left: 10px;
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
}
#nicknamechecking {
  border-radius: 8px;
  height: 48px;
  background-color: var(--navy-color);
  color: white;
  border: 0;
  cursor: pointer;
}
.nicknameinput {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nicknameinput input[type='text'],
.emailinput input[type='text'] {
  flex: 1;
  margin-right: 8px;
}
.nicknamecheck input[type='button'],
.emailcheck input[type='button'] {
  flex: none;
}

.withdrawal {
  margin-top: 40px;
  color: var(--mint-color);
  font-weight: 700;
  cursor: pointer;
}
</style>
