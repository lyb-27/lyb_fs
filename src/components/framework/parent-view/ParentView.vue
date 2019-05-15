<template>
  <div style="overflow: auto;height: 100%;padding: 10px;background-color: #f5f7f9;">
    <router-view ref="child" :key="key" />
  </div>
</template>
<script>
export default {
  name: 'ParentView',
  computed: {
    key() {
      return this.$route.fullPath;
    },
  },
  mounted() {
    this.$Message.config({
      top: 50,
      duration: 3,
    });
  },
};
</script>
