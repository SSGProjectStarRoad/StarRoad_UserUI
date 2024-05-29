<template>
  <div v-if="isVisible" class="modal" :class="{ 'show-modal': isVisible }">
    <div class="modal-content">
      <p>방문 시간을 수정해주세요</p>
      <span @click="closeModal" class="close">&times;</span>
      <input type="time" v-model="selectedTime" />
      <button class="modal-button" @click="submitTime">확인</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isVisible'],
  data() {
    return {
      selectedTime: '',
    };
  },
  methods: {
    closeModal() {
      this.$emit('update:isVisible', false);
    },
    submitTime() {
      this.$emit('timeSelected', this.selectedTime); // 시간 전달
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
  width: 95px;
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
