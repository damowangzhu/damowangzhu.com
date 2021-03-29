<template>
  <div>
    <a class="recommend" :href="item.url" target="_blank">{{ item.title }}</a>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    item: {
      type: Object,
      default: () => ({ url: '', title: '' })
    }
  }
};
</script>

<style>
.recommend {
  font-size: 14px;
  color: #555;
}
</style>
