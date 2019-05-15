<template>
	<div>
		<my-panel title="查询条件">
      <filter-form>
        <template v-slot="row">
          <Button type="primary" size="small" @click="handleSearch(row.formData)">查询</Button>
        </template>
      </filter-form>
    </my-panel>
    <my-panel title="查询结果" theme="info">
      <Spin size="large" fix v-if="requestDetails"></Spin>
      <Button type="primary" size="small" @click="addInvestProduct" style="margin-bottom:10px;">新增</Button>
      <template v-if="tableData.length>0">
        <Table border :columns="columns" :data="tableData" @on-sort-change="sortFilter">
          <template slot-scope="{ row }" slot="rate">
            {{row.rate}}%
          </template>
          <template slot-scope="{ row }" slot="period">
            {{row.period}}天
          </template>
          <template slot-scope="{ row }" slot="castQuantity">
            {{row.surplusQuantity | toThousandFilter()}}
          </template>
          <template slot-scope="{ row }" slot="surplusQuantity">
            {{row.surplusQuantity | toThousandFilter()}}
          </template>
          <template slot-scope="{ row }" slot="yesInvest">
            {{Math.round(parseFloat(row.castQuantity)/(parseFloat(row.surplusQuantity) +parseFloat(row.castQuantity))*10000)/100}}%
          </template>
          <template slot-scope="{ row }" slot="action">
            <Button size="small" @click="openInvestDetails(row)" type="primary" style="margin: 5px;">详情</Button>
            <Button size="small" @click="addLabel(row)" type="success" style="margin: 5px;">添加标签</Button>
            <Button size="small" @click="seeLabelLists(row)" type="warning" style="margin: 5px;">查看标签</Button>
            <Button size="small" @click="openInvestUpdate(row)" type="info" style="margin: 5px;">修改</Button>
          </template>
        </Table>
        </template>
      <template v-else>
        <Spin size="large" fix></Spin>
      </template>
    </my-panel>
    <!-- 分页 -->
    <div class="text-right">
      <Page
        :current="pagePn"
        :total="getTotalPage"
        :page-size="pageSize"
        show-total
        @on-change="handleChangePage"
      />
    </div>
    <!-- 详情 -->
    <Drawer title="产品详情" v-model="isShowInfoForm" width="720" :mask-closable="false" footer-hide>
      <InfoForm v-if="isShowInfoForm" :detailsInfo="detailsInfo"></InfoForm>
    </Drawer>
    <!-- 修改 -->
    <Modal title="产品详情" v-model="isShowDetailModal" footer-hide>
      <detail>
        <template v-slot:default="row">
          <Button @click="cancelInvestUpdate" style="margin-right: 10px;">取消</Button>
          <Button type="primary" @click="sureInvestUpdate(row.formData)">确定</Button>
        </template>
      </detail>
    </Modal>
    <!-- 添加标签 -->
    <Modal title="添加标签" v-model="showLabel" footer-hide>
      <Label>
        <template v-slot:default="row">
          <Button @click="cancelAddLabel" style="margin-right: 10px;">取消</Button>
          <Button type="primary" @click="addInvestLabel(row.formData)">添加</Button>
        </template>
      </Label>
    </Modal>
    <!-- 查看所有的标签 -->
    <Modal title="标签列表" v-model="showAllLabelLists">
      <template v-for="(item,index) in AllLabel" v-if="AllLabel.length>0">
        <SeeLabel label="产品标签名：" :value="item.label" :labelId="item.id" :key="index">
          <template v-slot:default="row">
            <Button size="small" type="primary" @click="deleteLabel(row)">删除</Button>
          </template>
        </SeeLabel>
      </template>
      <template v-else>
        <p>暂无标签</p>
      </template>
    </Modal>

    <!-- 新增产品 -->
    <Drawer title="新增产品" v-model="isShowAddInvest" width="720" :mask-closable="false">
      <AddInvest :channelList="channelList">
        <template>
          <Button style="margin-right: 8px">取消</Button>
          <Button type="primary">确认</Button>
        </template>
      </AddInvest>
    </Drawer> 
	</div>
</template>

<script src="./investManage.js">
<style />;
