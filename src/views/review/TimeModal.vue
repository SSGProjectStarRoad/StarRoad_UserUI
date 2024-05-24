<template>
  <div v-if="isVisible" class="modal" :class="{ 'show-modal': isVisible }">
    <div class="modal-content">
      <span @click="closeModal" class="close">&times;</span>
      <input type="time" v-model="selectedTime">
      <button @click="submitTime">확인</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isVisible'],
  data() {
    return {
      selectedTime: ''
    }
  },
  methods: {
  closeModal() {
    this.$emit('update:isVisible', false);
  },
  submitTime() {
    this.$emit('timeSelected', this.selectedTime); // 시간 전달
    this.closeModal();
  }
}
}
</script>

<style>
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 30%;
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

button {
  margin-top: 20px;
}

.show-modal {
  display: block; /* 활성화 시 보여줌 */
}
</style>
