<template>
  <transition name="fade">
    <div v-if="visible" class="scrolltop" @click="scrollTop">
      <img src="@/assets/scrolltop.png" />
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
export default defineComponent({
  setup() {
    const visible = ref(false);

    onMounted(() => {
      window.addEventListener('scroll', scrollHandle);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', scrollHandle);
    });

    function scrollTop(el: any) {
      el.currentTarget.style.bottom = 200 + 'px';
      el.currentTarget.style.opacity = 0;
      window.scroll({
        top: 0,
        behavior: 'smooth'
      });
    }

    function scrollHandle() {
      let topDistance = document.documentElement.scrollTop || document.body.scrollTop;
      if (topDistance > 400) {
        visible.value = true;
      } else {
        visible.value = false;
      }
    }

    return { visible, scrollTop };
  }
});
</script>

<style lang="scss" scoped>
.scrolltop {
  position: fixed;
  width: 26px;
  z-index: 999;
  bottom: 100px;
  right: 10%;
  cursor: pointer;
  transition: 0.5s;
  img {
    width: 26px;
  }
}
</style>
