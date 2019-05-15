
<template>
  <Form ref="filterForm" :model="formData" :label-width="90" class="filter-form">
    <Row type="flex" :gutter="15">
      <Col :xs="24" :sm="24" :md="21" :lg="22">
        <Row :gutter="15">
          <Col :xs="24" :sm="12" :md="10" :lg="8">
            <FormItem label="产品名称:" prop="productName">
              <Input v-model.trim="formData.productName" placeholder="请输入产品名称" clearable></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="12" :md="10" :lg="8">
            <FormItem label="产品渠道:" prop="supplier">
              <Select v-model="formData.supplier" placeholder="请选择产品渠道" filterable clearable>
                <Option v-for="item in statusList" :key="item.label" :value="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="12" :md="10" :lg="8">
            <FormItem label="产品状态:" prop="status">
              <Select v-model="formData.status" placeholder="请选择产品状态" filterable clearable>
                <Option v-for="item in allstatusL" :key="item.label" :value="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Col>
      <Col :xs="24" :sm="24" :md="3" :lg="2" style="padding-top: 5px; padding-bottom: 5px;">
        <slot :formData="formData"></slot>
      </Col>
    </Row>
  </Form>
</template>

<script src="./FilterForm.js"></script>
