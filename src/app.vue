<template>
  <div class="min-height">
    <router-view v-slot="{ Component }">
      <Suspense>
        <component :is="Component" />
      </Suspense>
    </router-view>
  </div>
  <Footer></Footer>
  <ScrollTop></ScrollTop>
</template>

<script lang="ts">
import Footer from '@/components/Footer.vue';
import ScrollTop from '@/components/ScrollTop.vue';
export default {
  components: {
    Footer,
    ScrollTop
  }
};
</script>
<style scoped>
.min-height {
  min-height: calc(100vh - 44px);
}
</style>
