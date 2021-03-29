<template>
  <Header :show-collect="true">
    <span class="collect cursor" @click="showMask = true"> +书签</span>
  </Header>
  <div class="container flex">
    <div class="left">
      <BookmarkItem v-for="(item, i) in bookmarks" :key="i" :item="item"></BookmarkItem>
      <Loadmore v-if="showLoadmore" :is-loading="isLoading" @reachBottom="getBookmarksByPage"></Loadmore>
      <div v-else class="nodata"></div>
    </div>
    <div class="right">
      <div class="title">推荐工具</div>
      <div>
        <RecommendItem v-for="(item, i) in recommends" :key="i" :item="item"></RecommendItem>
      </div>
      <div class="title">百度热搜</div>
      <div>
        <HotnewsItem v-for="(item, i) in hotnews" :key="i" :item="item"></HotnewsItem>
      </div>
    </div>
  </div>
  <AddBookmarkMAsk v-if="showMask" @close="showMask = false" @confirm="addedHandle"></AddBookmarkMAsk>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useStore } from 'vuex';

import Header from '@/components/Header.vue';
import BookmarkItem from '@/components/BookmarkItem.vue';
import Loadmore from '@/components/Loadmore.vue';
import HotnewsItem from '@/components/HotnewsItem.vue';
import RecommendItem from '@/components/RecommendItem.vue';
import AddBookmarkMAsk from '@/components/AddBookmarkMAsk.vue';

import { getBookmarks, getHotnews, getRecommends } from '@/api/index';

export default defineComponent({
  components: {
    Header,
    BookmarkItem,
    Loadmore,
    HotnewsItem,
    RecommendItem,
    AddBookmarkMAsk
  },
  setup() {
    const store = useStore();
    const bookmarks = ref(store.state.bookmarks);
    const recommends = ref(store.state.recommends);
    const hotnews = ref([]);

    const isLoading = ref(false);
    const showLoadmore = ref(true);
    const showMask = ref(false);

    // const toast = inject('toast') as any;

    let page = 2;

    onMounted(async () => {
      hotnews.value = (await getHotnews()) as any;
      recommends.value = (await getRecommends()) as any;
      // toast('warn', 'hello world');
      // toast('success', '123456');
    });

    async function getBookmarksByPage() {
      isLoading.value = true;
      const data = (await getBookmarks({ page })) as any;
      if (!data.length) {
        showLoadmore.value = false;
      } else {
        page++;
        bookmarks.value = bookmarks.value.concat(data);
        isLoading.value = false;
      }
    }

    function addedHandle(item: any) {
      showMask.value = false;
      bookmarks.value.unshift(item);
    }

    return { bookmarks, getBookmarksByPage, isLoading, showLoadmore, hotnews, recommends, showMask, addedHandle };
  },
  asyncData({ store }) {
    return new Promise(async (resolve) => {
      const [bookmarks, recommends] = await Promise.all([getBookmarks({ page: 1 }), getRecommends()]);
      store.state.bookmarks = bookmarks;
      store.state.recommends = recommends;
      resolve(0);
    });
  }
});
</script>

<style lang="scss" scoped>
.left {
  flex: 1;
}
.right {
  width: 310px;
  padding-left: 25px;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  .title {
    font-size: 18px;
    margin-top: 15px;
  }
}
.collect {
  position: absolute;
  top: 10px;
  right: 10px;
  line-height: normal;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  background-color: #00a1d6;
  border-radius: 4px;
  padding: 7px 12px;
}
</style>
