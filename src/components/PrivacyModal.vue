<template>
  <div class="modal" v-if="isVisible">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Star Road 개인정보 수집 및 <br />이용 동의서</h2>
      <div class="modal-body">
        <p>
          Star Road(이하 "회사")는 개인정보보호법에 따라 회원(이하 "회원")의
          개인정보를 수집 및 이용합니다. 본 동의서는 회사가 회원의 개인정보를
          수집 및 이용하는 방법, 목적 및 범위에 대해 설명합니다.
        </p>
        <br />
        <p>
          <strong>1. 개인정보 수집 목적</strong><br />
          회사는 다음의 목적을 위해 회원의 개인정보를 수집합니다:
        </p>
        <p>
          - 서비스 제공 및 운영<br />
          - 회원 관리<br />
          - 마케팅 및 광고 활용<br />
          - 법적 의무 준수<br />
          - 고객 지원 및 상담<br />
          - 서비스 개선 및 개발
        </p>
        <br />
        <p>
          <strong>2. 수집하는 개인정보 항목</strong><br />
          회사는 다음과 같은 개인정보를 수집할 수 있습니다:
        </p>
        <p>
          - 기본정보: 이름, 닉네임, 이메일 주소, 전화번호, 생년월일, 성별<br />
          - 서비스 이용 정보: 방문 내역, 예약 내역, 리뷰 내용<br />
          - 결제 정보: 결제 카드 정보, 거래 내역<br />
          - 기타: 회원이 자발적으로 제공하는 정보
        </p>
        <br />
        <p>
          <strong>3. 개인정보 수집 방법</strong><br />
          회사는 다음과 같은 방법으로 개인정보를 수집합니다:
        </p>
        <p>
          - 회원가입 및 서비스 이용 과정에서 회원이 직접 입력한 정보<br />
          - 서비스 이용 과정에서 자동으로 생성 및 수집되는 정보<br />
          - 고객 상담 및 이벤트 참여 과정에서 회원이 제공하는 정보
        </p>
        <br />
        <p>
          <strong>4. 개인정보의 보유 및 이용 기간</strong><br />
          회사는 법령에 따른 개인정보 보유 및 이용 기간 또는 회원으로부터
          개인정보를 수집 시에 동의 받은 개인정보 보유 및 이용 기간 내에서
          개인정보를 처리 및 보유합니다. 원칙적으로, 개인정보의 수집 및 이용
          목적이 달성된 경우 해당 정보를 지체 없이 파기합니다. 단, 다음의 정보에
          대해서는 아래의 이유로 명시한 기간 동안 보존합니다:
        </p>
        <p>
          - 관련 법령에 의한 정보 보유<br />
          - 분쟁 해결, 법령상 의무 이행 등의 이유로 일정 기간 보유 필요 시
        </p>
        <br />
        <p>
          <strong>5. 개인정보의 제3자 제공</strong><br />
          회사는 회원의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만,
          다음의 경우에는 예외로 합니다:
        </p>
        <p>
          - 회원이 사전에 동의한 경우<br />
          - 법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에
          따라 수사기관의 요구가 있는 경우
        </p>
        <br />
        <p>
          <strong>6. 개인정보 처리 위탁</strong><br />
          회사는 원활한 개인정보 업무 처리를 위하여 개인정보 처리업무를 외부
          전문업체에 위탁할 수 있으며, 이 경우 위탁받는 업체가 개인정보를
          안전하게 처리하도록 필요한 사항을 규정하고 관리·감독합니다.
        </p>
        <br />
        <p>
          <strong>7. 회원의 권리와 행사 방법</strong><br />
          회원은 언제든지 자신의 개인정보를 조회하거나 수정할 수 있으며,
          개인정보의 수집 및 이용에 대한 동의를 철회할 수 있습니다. 이를 위해
          회원은 회사의 개인정보 보호책임자에게 서면, 전화, 이메일 등을 통해
          요청할 수 있으며, 회사는 이에 대해 지체 없이 조치하겠습니다.
        </p>
        <br />
        <p>
          <strong>8. 개인정보 보호책임자 및 문의처</strong><br />
          개인정보 보호와 관련된 문의, 불만 처리, 피해 구제 등에 관한 사항은
          회사의 개인정보 보호책임자 및 담당 부서로 문의할 수 있습니다.
        </p>
        <p>
          - 개인정보 보호책임자: [이름]<br />
          - 연락처: [연락처]<br />
          - 이메일: [이메일 주소]
        </p>
        <br />
        <p>
          <strong>9. 동의 거부 권리 및 불이익</strong><br />
          회원은 개인정보 수집 및 이용 동의를 거부할 권리가 있습니다. 다만,
          동의를 거부할 경우 서비스 이용에 제한이 있을 수 있습니다.
        </p>
        <br />
        <p>
          본인은 위 내용을 충분히 이해하였으며, 개인정보 수집 및 이용에
          동의합니다.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrivacyModal',
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 350px; /* 회원가입 폼과 동일한 너비로 설정 */
  max-width: 600px;
  border-radius: 8px;
  position: relative;
}
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.modal-body {
  max-height: 400px; /* 모달 내용의 최대 높이 설정 */
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤바 표시 */
}
</style>
