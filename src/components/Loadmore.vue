<template>
  <div id="loadmore" class="loadmore">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue';
export default defineComponent({
  props: {
    isLoading: {
      type: Boolean
    }
  },
  emits: ['reachBottom'],
  setup(props, { emit }) {
    let msg = 'loading ...';

    onMounted(() => {
      window.addEventListener('scroll', scrollHandle);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', scrollHandle);
    });

    function scrollHandle() {
      const el: any = document.getElementById('loadmore');

      // viewPortHeight 兼容所有浏览器写法
      const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      const offsetTop = el.offsetTop;
      const scrollTop = document.documentElement.scrollTop;
      const top = offsetTop - scrollTop;

      // 这里有个+20是为了提前加载+ 20
      const visible = top <= viewPortHeight + 10;

      if (visible && !props.isLoading) {
        emit('reachBottom', true);
      }
    }

    return { msg };
  }
});
</script>

<style scoped>
.loadmore {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
}

@keyframes spin-bounce {
  0% {
    transform: scale(0);
  }

  to {
    transform: scale(1);
    opacity: 0;
  }
}

.dot {
  position: relative;
  transform: translateX(400px);
  display: block;
  margin-right: 40px;
  border-radius: 50%;
  background-color: #2d8cf0;
  width: 12px;
  height: 12px;
  animation: spin-bounce 3s ease-in-out infinite;
}
</style>
