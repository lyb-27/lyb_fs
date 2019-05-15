<template>
  <div class="panel-wrap" :class="'panel-wrap-' + theme">
    <div class="panel-header">
      <div class="panel-header-left">
        <common-icon :type="icon" :size="iconSize" style="margin-right: 5px;" />
        <span class="panel-header-title">{{ title }}</span>
      </div>
      <div class="panel-header-right">
        <slot name="headerExtra"></slot>
      </div>
    </div>
    <div class="panel-body" :style="{ padding: padding }">
      <slot></slot>
    </div>
    <div class="pannel-footer" v-if="showFooter">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style src="./MyPanel.less" lang="less" scoped></style>
<script src="./MyPanel.js"></script>
