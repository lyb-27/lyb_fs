<template>
  <div id="app" v-wechat-title="$route.meta.title">
    <router-view></router-view>
  </div>
</template>

<style lang="less">
#app {
  height: 100%;
}
</style>

<script>

import { mapActions, mapMutations } from 'vuex';
export default {
  name: 'APP',

  methods:{
    ...mapActions('common', ['getChannelList']),
    ...mapMutations('common', ['updateTopLists']),
    getMenuLists () {
      this.getLeftNavLists()
    },
    getupdateTopLists () {
      this.updateTopLists()
    },
    getNavChannelList () {
      let token = window.localStorage.getItem('backtoken')
      this.getChannelList({token:token})
    }
  },
  created () {
    if (window.localStorage.getItem('backtoken')) {
      this.getupdateTopLists()
      this.getNavChannelList()
    }
  }
};
</script>


