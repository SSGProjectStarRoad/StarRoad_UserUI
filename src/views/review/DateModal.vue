<template>
  <div v-if="isVisible" class="modal" :class="{ 'show-modal': isVisible }">
    <div class="modal-content">
      <p>방문 날짜를 수정해주세요</p>
      <span @click="closeModal" class="close">&times;</span>
      <input type="date" v-model="selectedDate" />
      <button class="modal-button" @click="submitDate">확인</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isVisible'],
  data() {
    return {
      selectedDate: '',
    };
  },
  methods: {
    closeModal() {
      this.$emit('update:isVisible', false);
    },
    submitDate() {
      this.$emit('dateSelected', this.selectedDate); // 시간 전달
      this.closeModal();
    },
  },
};
</script>

<style scoped>
.modal {
  display: none;
  position: fixed;
  z-index: 2000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border-radius: 15px;
  border: 3px solid var(--mint-color);
  width: 25%;
}
.modal-content input {
  margin-top: 5px;
}

.modal-button {
  position: absolute;
  padding: 8px;
  border-radius: 10px;
  top: 10px;
  right: 30px;
}
.close {
  position: absolute;
  top: -5px;
  right: 10px;
  color: #aaa;
  float: right;
  font-size: 20px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

button {
  margin-top: 20px;
}

.show-modal {
  display: block; /* 활성화 시 보여줌 */
}
</style>
