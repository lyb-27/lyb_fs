<template>
  <div>
    <Form ref="AddInvest" :model="investData" :label-width="90">
      <!-- <my-panel title="加工触发条件配置">
        <Row :gutter="15">
          <Col :xs="24" :sm="12">
            <FormItem label="触发更新类型:" prop="triggerType">
              <Select v-model="formData.triggerType" placeholder="请选择触发更新类型">
                <Option v-for="item in triggerTypeList" :key="item.key" :value="item.value">
                  {{ item.value }}
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="12">
            <FormItem label="topic:" prop="topic">
              <Select v-model="formData.topic" placeholder="请选择topic">
                <Option v-for="item in triggerTypeList" :key="item.key" :value="item.value">
                  {{ item.value }}
                </Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
      </my-panel> -->
      <my-panel title="产品信息">
        <template v-slot:headerExtra>
          <Button @click="choiceInvestProduct">选择产品</Button>
        </template>
        <Row :gutter="15">
          <Col span='12'>
            <label-info-item label="产品名称：" value="李艳彪" />
          </Col>
          <Col span='12'>
            <label-info-item label="发售总额：" value="李艳彪" />
          </Col>
          <Col span='12'>
            <label-info-item label="开售时间：" value="李艳彪" />
          </Col>
          <Col span='12'>
            <label-info-item label="结束时间：" value="李艳彪" />
          </Col>
          <Col span='12'>
            <label-info-item label="收益率：" value="李艳彪" />
          </Col>
          <Col span='12'>
            <label-info-item label="产品期限：" value="李艳彪" />
          </Col>
          <Col span='12'>
            <label-info-item label="最小起投金额：" value="李艳彪" />
          </Col>
          <Col span='12'>
            <label-info-item label="最大起投金额：" value="李艳彪" />
          </Col>
        </Row>
      </my-panel>
      <!-- <my-panel title="已选择的加工逻辑">
        <template v-slot:headerExtra>
          <Button @click="handleShowVariableFilterModal">选择加工逻辑</Button>
        </template>
        <Table border :columns="columns" :data="selectedVariable">
          <template slot-scope="{ row }" slot="action">
            <Button type="error" size="small" @click="handleRemoveLogic(row)">移除</Button>
          </template>
        </Table>
      </my-panel> -->
      <my-panel title="是否展示产品">
        <Row>
          <Col :xs="24" :sm="12">
            <FormItem label="是否展示产品" prop="investStatus">
              <i-switch v-model="investData.investStatus">
                <span slot="display">是</span>
                <span slot="notdisplay">否</span>
              </i-switch>
            </FormItem>
          </Col>
        </Row>
      </my-panel>
      <my-panel title="产品配置">
        <Row :gutter="15">
          <Col :xs="24" :sm="12">
            <FormItem label="预售时间" prop="startTime">
              <Date-picker type="datetime" v-model="investData.startTime" placeholder="请选择预售时间" style="width: 100%;min-width: 180px;"></Date-picker>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="12">
            <FormItem label="产品期数" prop="issuePeriod">
              <Input v-model.trim="investData.issuePeriod" placeholder="请输入期数"></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24">
            <FormItem label="销售渠道" prop="investAppId">
              <Select v-model="investData.investAppId" multiple clearable placeholder="请选择销售渠道" @on-change="changeAppids">
                <Option v-for="item in returnAllChannel" :key="item.name" :value="item.appId">{{ item.name }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="24">
            <FormItem label="定向白名单" prop="whitePeople">
              <Select v-model="investData.whitePeople" multiple clearable placeholder="请选择白名单" @on-change="changeWhite">
                <Option v-for="item in whiteLists" :key="item.groupNum" :value="item.groupNum">{{ item.groupName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="12" v-if="investData.whitePeople && investData.whitePeople.length>0">
            <FormItem label="奖励比例" prop="rewardMoney">
              <Input v-model.trim="investData.rewardMoney" placeholder="请输入奖励比例"></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="12" v-if="investData.whitePeople && investData.whitePeople.length>0">
            <FormItem label="提示信息" prop="remarkInfo">
              <Input v-model.trim="investData.remarkInfo" placeholder="请输入提示信息"></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="12">
            <FormItem label="是否生成海报" prop="posterStatus">
              <i-switch v-model="investData.posterStatus">
                <span slot="generate">是</span>
                <span slot="notgenerate">否</span>
              </i-switch>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="12" v-if="investData.whitePeople && investData.whitePeople.length > 0 && showAddRate ">
            <FormItem label="预约加息比" prop="addRate">
              <Input v-model.trim="investData.addRate" placeholder="请填写预约用户加息比例"></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="12" v-if="investData.whitePeople && investData.whitePeople.length>0">
            <FormItem label="是否定向计佣" prop="ruleState">
              <i-switch v-model="investData.ruleState">
                <span slot="yes">是</span>
                <span slot="no">否</span>
              </i-switch>
            </FormItem>
          </Col>
        </Row>
      </my-panel>
    </Form>

    <Divider />

    <div class="text-right">
      <slot :investData="investData"></slot>
    </div>
    <Spin size="large" fix v-if="requestChoiceInvestProduct"></Spin>
    <Modal title="选择产品" v-model="showChoiceInvestProduct" :closable="false" width="100" footer-hide>
      <variable-filter :tjProductList="tjProductList">
        <template v-slot:default="row">
          <Button type="info" :disabled="row.selectedRow && row.selectedRow.length === 0" @click="handleAddVariable(row)">确认添加</Button>
        </template>
      </variable-filter>
    </Modal>
  </div>
</template>

<script src="./AddInvest.js">
</script>

<style lang="less" scoped src="./AddInvest.less">

</style>

