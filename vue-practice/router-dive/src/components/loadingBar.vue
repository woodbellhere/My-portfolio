<template>
  <div class="wrap">
    <div ref="bar" class="bar"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

let bar = ref<HTMLElement>();
let speed = ref<number>(1);
let timer = ref<number>(0);
const startLoading = () => {
  let dom = bar.value as HTMLElement;
  speed.value = 1;
  console.log(dom);
  // 这一段很重要，就是requestAnimation自己递归自己
  window.requestAnimationFrame(function fn() {
    if (speed.value < 90) {
      speed.value += 1;
      dom.style.width = speed.value + "%";
      window.requestAnimationFrame(fn);
    } else {
      speed.value = 1;
      window.cancelAnimationFrame(timer.value);
    }
  });
};
const endLoading = () => {
  let dom = bar.value as HTMLElement;
  window.requestAnimationFrame(() => {
    speed.value = 100;
    dom.style.width = speed.value + "%";
  });
};

onMounted(() => {
  startLoading();
  endLoading();
});

defineExpose({
  startLoading,
  endLoading,
});
</script>

<style scoped>
.wrap {
  position: fixed;
  top: 0;
  width: 100%;
  height: 2px;
}
.wrap .bar {
  height: inherit;
  width: 0;
  background-color: red;
}
</style>
