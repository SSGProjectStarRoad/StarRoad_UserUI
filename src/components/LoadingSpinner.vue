<template>
  <div class="spinner-container">
    <div class="spinner" />
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
};
</script>

<style scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 1);
  z-index: 9999;
}
.spinner {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 5px solid #e0e0e0;
  border-bottom: 5px solid var(--mint-color);
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
