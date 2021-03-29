<template>
  <div>
    <div class="header">
      <div class="container clearfix">
        <router-link class="item" to="/">首页</router-link>
        <a class="item" title="本站源码" href="https://www.github.com/fruit5566/zhufu250.com" target="_blank">GitHub</a>
        <a class="item" href="https://cms.damowangzhu.com/" target="_blank" title="后台管理系统">CMS</a>
        <a class="item col-xs" title="导出为标准书签文件" @click="download">导出</a>
        <input v-model="key" type="text" class="search col-xs" placeholder="输入关键字" @keyup.enter="searchAction" />
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { downBookmarks } from '@/api/index';

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    let key = ref(route.query.key);

    function searchAction() {
      console.log('search handle');

      router.push(`/search?key=${key.value}`);
    }

    function collect() {
      console.log('collect bookmarks');
    }

    async function download() {
      const blob = await downBookmarks();
      const link = document.createElement('a');
      const body = document.body;
      link.href = window.URL.createObjectURL(blob); // 创建对象url
      link.download = 'bookmark.html';
      // fix Firefox
      link.style.display = 'none';
      body.appendChild(link);
      link.click();
      body.removeChild(link);
      window.URL.revokeObjectURL(link.href); // 销毁 通过调用 URL.createObjectURL() 创建的 URL 对象
    }

    return { key, searchAction, download, collect };
  }
});
</script>

<style lang="scss" scoped>
.header {
  height: 54px;
  line-height: 54px;
  border-bottom: 1px solid #e5e5e5;
  background: #fff;
}

.item {
  font-size: 18px;
  margin-right: 30px;
  cursor: pointer;
  &:hover {
    border-bottom: 2px solid;
  }
}

.search {
  width: 35%;
  height: 32px;
  font-size: 16px;
}
.container {
  position: relative;
}
</style>
