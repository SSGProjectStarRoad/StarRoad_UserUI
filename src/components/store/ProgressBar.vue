<template>
  <div
    class="progress-bar"
    :class="{ clicked: isClicked }"
    @click="handleClick"
  >
    <div class="progress" :style="{ width: progress + '%' }"></div>
    <div class="text">
      <slot name="text"></slot>
    </div>
    <div class="number">
      <slot name="number"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    progress: {
      type: Number,
      required: true,
    },
    isClicked: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick() {
      const textSlot = this.$slots.text ? this.$slots.text()[0] : null;
      if (textSlot && textSlot.children) {
        this.$emit('filter', textSlot.children.trim());
      } else {
        console.error('Text slot is not defined or does not contain text');
      }
    },
  },
};
</script>

<style scoped>
.progress-bar {
  position: relative;
  width: 100%;
  height: 30px;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 10px;
  display: flex;
  align-items: center;
  box-shadow: 2px 2px 3px #00000033;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.progress-bar.clicked {
  background-color: var(--dgray-color);
}
.progress {
  position: absolute;
  height: 100%;
  background-color: var(--mint-color);
  transition: width 0.5s ease;
  border-radius: 10px;
  box-shadow: 2px 2px 3px #00000033;
}
.text {
  position: absolute;
  left: 10px;
  color: black;
  font-size: 14px;
  font-weight: bold;
  z-index: 1;
}
.number {
  margin-left: auto;
  margin-right: 10px;
  color: #333;
  font-weight: bold;
}
</style>
