<template>
  <dl class="clearfix label-item-wrap">
    <dt class="label-item-label" :style="{ width: labelWidth + 'px' }">{{ label }}</dt>
    <dd class="label-item-value" :style="{ marginLeft: labelWidth + 'px' }">
      <span v-if="value">{{ value }}</span>
      <div v-else>
        <slot></slot>
      </div>
    </dd>
  </dl>
</template>


<style src="./LabelInfoItem.less" lang="less" scoped></style>
<script src="./LabelInfoItem.js"></script>
