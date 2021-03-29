<template>
  <p>Test Page</p>
  <div>{{ mess }}</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    console.log(store.state.message);
    console.log(store.state.bookmarks);

    const mess = computed(() => store.state.message);

    return { mess };
  },
  asyncData({ store }) {
    return store.dispatch('fetchMessage');
  }
});
</script>
