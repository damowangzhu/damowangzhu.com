<template>
  <p>About Page</p>
  <p>{{ mess }}</p>
  <Foo />
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';

export default defineComponent({
  components: {
    Foo: defineAsyncComponent(() => import('@/components/Foo.tsx').then((mod) => mod.Foo))
  },
  computed: {
    mess() {
      return this.$store.state.message;
    }
  }
});
</script>
