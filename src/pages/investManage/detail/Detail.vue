<template>
  <div>
    <Form ref="filterForm" :model="formData" :label-width="90" class="filter-form">
      <Row :gutter="15">
        <Col :xs="24" :sm="12">
          <!-- <FormItem label="topic指定:" prop="triggerType"> -->
            <!-- <Select v-model="formData.triggerType" placeholder="请选择topic指定">
              <Option v-for="item in triggerTypeList" :key="item.key" :value="item.value">
                {{ item.value }}
              </Option>
            </Select> -->
          <!-- </FormItem> -->
        </Col>
        <Col :xs="24" :sm="12">
          <!-- <FormItem label="完成后广播:" prop="topic"> -->
            <!-- <Select v-model="formData.topic" placeholder="请选择topic">
              <Option v-for="item in triggerTypeList" :key="item.key" :value="item.value">
                {{ item.value }}
              </Option>
            </Select> -->
          <!-- </FormItem> -->
        </Col>
        <Col :xs="24" :sm="12">
          <FormItem label="奖励比率:" prop="name">
            <!-- <Input v-model.trim="formData.name" placeholder="请输入topic主题"></Input> -->
          </FormItem>
        </Col>
        <Col :xs="24" :sm="12">
          <FormItem label="提示信息:" prop="name">
            <!-- <Input v-model.trim="formData.name" placeholder="请输入topic主题"></Input> -->
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div class="btn-wrap">
      <slot :formData="formData"></slot>
    </div>
  </div>
</template>

<script src="./Detail.js"></script>
<style lang="less" scoped>
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

