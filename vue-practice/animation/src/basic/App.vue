<template>
  <div>
    <button @click="toggle">show/hide</button>
    <transition name="wood">
      <h2 v-if="isShow">Hello World</h2>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: true,
    };
  },
  methods: {
    toggle() {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style scoped>
.wood-enter-from,
.wood-leave-to {
  opacity: 0;
}

.wood-enter-to,
.wood-leave-from {
  opacity: 1;
}

.wood-enter-active,
.wood-leave-active {
  transition: opacity 500ms ease;
}
</style>
