<template>
  <div class="variable-filter-wrap">
    <Table border :columns="columns" :data="tjProductList" @on-selection-change="handleSelectChange" />
    <div class="btn-wrap" >
      <slot :selectedRow="selectedRow"></slot>
    </div>
  </div>
</template>

<script src="./VariableFilter.js"></script>

<style lang="less" scoped>
.variable-filter-wrap {
  .ivu-form-item {
    margin-bottom: 0;
  }
}
.btn-wrap {
  padding-top: 20px;
  margin-top: 20px;
  text-align: right;
  background: #fff;
  margin-right: -16px;
  margin-left: -16px;
  padding-left: 16px;
  padding-right: 16px;
  border-top: 1px solid #e8eaec;
}
</style>
