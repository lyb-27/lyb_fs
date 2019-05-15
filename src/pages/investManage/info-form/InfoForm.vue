<template>
  <div>
      <my-panel title="基本信息">
        <Row :gutter="15" v-if="detailsInfo">
          <Col span='12'>
            <label-info-item label="名称：" :value="detailsInfo.product.productNm" />
          </Col>
          <Col span='12'>
            <label-info-item label="发售总额：" :value="detailsInfo.product.quantity+'元'" />
          </Col>
          <Col span='12'>
            <label-info-item label="已售总额：" :value="detailsInfo.product.castQuantity+'元'" />
          </Col>
          <Col span='12'>
            <label-info-item label="剩余额度：" :value="detailsInfo.product.surplusQuantity+'元'" />
          </Col>
          <Col span='12'>
            <label-info-item label="开售时间：" :value="detailsInfo.product.startSaleTime" />
          </Col>
          <Col span='12'>
            <label-info-item label="结束时间：" :value="detailsInfo.product.endSaleTime" />
          </Col>
          <Col span='12'>
            <label-info-item label="收益率：" :value="detailsInfo.product.rate+'%'" />
          </Col>
          <Col span='12'>
            <label-info-item label="产品期限：" :value="detailsInfo.product.period+'天'" />
          </Col>
          <Col span='12'>
            <label-info-item label="到期处理方式：" :value="detailsInfo.product.expireDealType==='B01'?'本金续投':(detailsInfo.product.expireDealType==='A01'?'不支持续投':(detailsInfo.product.expireDealType==='B02'?'本息续投':'本金续投+本息续投'))" />
          </Col>
          <Col span='12'>
            <label-info-item label="收益支付方式：" :value="detailsInfo.product.incomePayType==='1'?'一次性还本付息':(detailsInfo.product.incomePayType==='2'?'每月还本付息':(detailsInfo.product.incomePayType==='3'?'按月还息，到期还本':(detailsInfo.product.incomePayType==='4'?'按季度还息，到期还本':(detailsInfo.product.incomePayType==='5'?'收益前置，到期还本':(detailsInfo.product.incomePayType==='6'?'收益部分前置':(detailsInfo.product.incomePayType==='7'?'悟空月账户模式':(detailsInfo.product.incomePayType==='8'?'分期游模式':'')))))))" />
          </Col>
          <Col span='12'>
            <label-info-item label="最小起投金额：" :value="detailsInfo.product.minTenderQuantity+'元'" />
          </Col>
          <Col span='12'>
            <label-info-item label="最大投资限额：" :value="detailsInfo.product.maxTenderQuantity+'元'" />
          </Col>
          <Col span='12'>
            <label-info-item label="匹配资金类型：" :value="detailsInfo.product.matchFundType==='1'?'债匹续出借资金':(detailsInfo.product.matchFundType==='2'?'理财续投资金':'不限')" />
          </Col>
          <Col span='12'>
            <label-info-item label="投资存管银行：" :value="detailsInfo.product.lcAccountType==='B8002'?'富友':(detailsInfo.product.lcAccountType==='B8010'?'存管银行1':'存管银行2')" />
          </Col>
          <Col span='12'>
            <label-info-item label="发行期数：" :value="'第'+detailsInfo.product.issuePeriod+'期'" />
          </Col>
          <Col span='12'>
            <label-info-item label="是否为续投产品：" :value="detailsInfo.product.isContinue === '0'?'非续投':'续投产品'" />
          </Col>
          <Col span='12'>
            <label-info-item label="产品计息日规则：" :value="detailsInfo.product.intrestRule === '0'?'当日计息':(detailsInfo.product.intrestRule === '1'?'隔日计息':(detailsInfo.product.intrestRule === '2'?'T+2自然日计息':(detailsInfo.product.intrestRule === '3'?'T+3自然日计息':(detailsInfo.product.intrestRule === '4'?'T+1工作日计息':(detailsInfo.product.intrestRule === '5'?'T+2工作日计息':(detailsInfo.product.intrestRule === '6'?'T+3工作日计息':'放款日计息'))))))" />
          </Col>
          <Col span='12'>
            <label-info-item label="渠道方产品编号：" :value="detailsInfo.product.productCd" />
          </Col>
          <Col span='12'>
            <label-info-item label="债权类型：" :value="detailsInfo.product.debtType==='0'?'出债':(detailsInfo.product.debtType==='1'?'二级债':(detailsInfo.product.debtType==='2'?'权益类资产':'预售二级债'))" />
          </Col>
        </Row>
      </my-panel>
      <my-panel title="配置信息">
        <Row :gutter="15">
          <Col span='12'>
            <label-info-item label="销售渠道：" :value="chName" />
          </Col>
          <Col span='12'>
            <label-info-item label="期数：" :value="'第'+detailsInfo.result.issuePeriod+'期'" />
          </Col>
          <Col span='12'>
            <label-info-item label="平台预售时间：" :value="detailsInfo.result.localPresellTime" />
          </Col>
          <Col span='12'>
            <label-info-item label="白名单：" :value="translateWhiteGroup" />
          </Col>
          <Col span='12'>
            <label-info-item label="奖励比例：" :value="detailsInfo.result.awardRate" />
          </Col>
          <Col span='12'>
            <label-info-item label="执行定向产品计佣：" :value="detailsInfo.result.ruleState==='yes'?'是':(detailsInfo.result.ruleState=='no'?'否':'')" />
          </Col>
          <Col span='12'>
            <label-info-item label="提示信息：" :value="detailsInfo.result.erroMesg" />
          </Col>
        </Row>
      </my-panel>
      <my-panel title="附件信息">
        <Row :gutter="15">
          <template v-for="(item,index) in detailsInfo.productFiles">
            <a :href="item.url" target="_blank">
              <Col span='12'>
                <label-info-item :label="item.name+':'" :value="item.name" :key="index" />
              </Col>
            </a>
          </template>
        </Row>
      </my-panel>
      <my-panel title="订单信息">
        <Button size="small" type="primary" @click="exportExcel" style="margin-bottom:10px;">导出表格</Button>
        <Table border :columns="ordercolumns" :data="detailsInfo.orderInfos" max-height="500">

        </Table>
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
      </my-panel>

      <my-panel title="默认值配置">
        <Row>
          <Col :xs="24" :sm="12">
            <FormItem label="是否有默认值" prop="hasDevaultValue">
              <i-switch v-model="formData.hasDevaultValue">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </FormItem>
          </Col>
          <Col span="24" v-if="formData.hasDevaultValue">
            <FormItem label="默认值:" prop="topic">
              <Input v-model.trim="formData.remark" :autosize="{ minRows: 2, maxRows: 5 }" placeholder="请输入批注" />
            </FormItem>
          </Col>
        </Row>
      </my-panel>

      <my-panel title="广播配置">
        <Row :gutter="15">
          <Col :xs="24" :sm="12">
            <FormItem label="topic指定:" prop="triggerType">
              <Select v-model="formData.triggerType" placeholder="请选择topic指定">
                <Option v-for="item in triggerTypeList" :key="item.key" :value="item.value">
                  {{ item.value }}
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="12">
            <FormItem label="完成后广播:" prop="topic">
              <Select v-model="formData.topic" placeholder="请选择topic">
                <Option v-for="item in triggerTypeList" :key="item.key" :value="item.value">
                  {{ item.value }}
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="12">
            <FormItem label="topic主题:" prop="name">
              <Input v-model.trim="formData.name" placeholder="请输入topic主题"></Input>
            </FormItem>
          </Col>
        </Row>
      </my-panel>

      <my-panel title="输出类型配置">
        <Row :gutter="15">
          <Col :xs="24" :sm="12">
            <FormItem label="输出类型:" prop="triggerType">
              <Select v-model="formData.triggerType" placeholder="请选择输出类型">
                <Option v-for="item in triggerTypeList" :key="item.key" :value="item.value">
                  {{ item.value }}
                </Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
      </my-panel>

      <my-panel title="时效性配置">
        <Row :gutter="15">
          <Col :xs="24" :sm="12">
            <FormItem label="缓存时间设置:" prop="time">
              <Input v-model.trim="formData.time" placeholder="请输入缓存时间设置"></Input>
            </FormItem>
          </Col>
          <Col :xs="24" :sm="12">
            <FormItem label="变量数据有效时间:" prop="name">
              <Input v-model.trim="formData.name" placeholder="请输入变量数据有效时间"></Input>
            </FormItem>
          </Col>
        </Row>
      </my-panel>

      <my-panel title="数据元配置">
        <Row :gutter="15">
          <Col :xs="24" :sm="12">
            <FormItem label="选择数据源:" prop="triggerType">
              <Select v-model="formData.triggerType" placeholder="请选择数据源">
                <Option v-for="item in triggerTypeList" :key="item.key" :value="item.value">
                  {{ item.value }}
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="默认参数:" prop="triggerType">
              <Input v-model.trim="formData.remark" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }" placeholder="JSON格式" />
            </FormItem>
          </Col>
        </Row>
      </my-panel> -->
    </Form>
    <Divider />
  </div>
</template>

<script src="./InfoForm.js"></script>
