<template>
  <p>Test Page</p>
  <div>{{ mess }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  asyncData({ store }) {
    return store.dispatch('fetchMessage');
  },
  computed: {
    mess() {
      return this.$store.state.message;
    }
  }
});
</script>
