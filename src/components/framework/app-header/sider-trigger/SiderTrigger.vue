<template>
  <div class="header-sb">
    <div>
      <a @click="handleToggleCollapsed" type="text" :class="['sider-trigger-a', isCollapsed ? 'collapsed' : '']">
        <Icon :type="icon" :size="size" />
      </a>
      {{new Date() | dateFormatFilter()}}
    </div>
    <div>
      <Select v-model="model1" style="width:200px" size="small" v-if="appIdsIncludeAll.length>0"  @change="selectAppId">
        <Option v-for="(item,index) in appIdsIncludeAll" :value="item.appId" :key="index">{{ item.name }}</Option>
      </Select>
      <span>{{userName}}</span>
      <Avatar icon="ios-person" />
    </div>
  </div>
</template>
<style lang="less" scoped src="./SiderTrigger.less"></style>
<script src="./SiderTrigger.js"></script>
