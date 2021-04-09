<template>
  <div class="search_page">
    <Header></Header>
    <div class="main container">
      <BookmarkItem v-for="item of bookmarks" :key="item.id" :item="item"></BookmarkItem>
      <div v-if="!bookmarks.length" class="nodata">查询无数据</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { onBeforeRouteUpdate } from 'vue-router';

import Header from '@/components/Header.vue';
import BookmarkItem from '@/components/BookmarkItem.vue';

import { searchBookmarks } from '@/api/search';

export default defineComponent({
  components: {
    Header,
    BookmarkItem
  },
  setup() {
    const store = useStore();
    const bookmarks = ref(store.state.searchResults);

    onBeforeRouteUpdate(async (to, from) => {
      if (to.query.key !== from.query.key) {
        bookmarks.value = await searchBookmarks({ key: to.query.key });
      }
    });

    return { bookmarks };
  },
  asyncData({ store, route }) {
    return new Promise(async (resolve) => {
      const result = await searchBookmarks({ key: (route as any).query.key });
      store.state.searchResults = result;
      resolve(0);
    });
  }
});
</script>

<style scoped>
.nodata {
  padding: 25px;
  font-size: 18px;
  text-align: center;
}
</style>
