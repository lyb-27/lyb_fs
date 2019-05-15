import { Button, Table, Page, Drawer, Divider, Modal, Spin } from 'iview';
import MyPanel from '@/components/base/my-panel/';
import FilterForm from './filter-form';
import InfoForm from './info-form';
import Detail from './detail';
import AddInvest from './AddInvest';
import Label from './label';
import SeeLabel from './SeeLabel';
import { mapActions ,mapGetters } from 'vuex';
import api from '@/api/';
export default {
  components: {
    MyPanel,
    FilterForm,
    Button,
    Table,
    Page,
    Drawer,
    Divider,
    Modal,
    Spin,
    InfoForm,
    Detail,
    Label,
    SeeLabel,
    AddInvest
  },
  name: 'variable-manage-statistic',
  
  data() {
    return {
      isShowInfoForm:false,//详情
      isShowDetailModal: false, //修改
      columns: [
        {
          title: '渠道名称',
          type: 'appId',
          width: 120,
          align: 'center',
          render: (row,params)=>{
            return row('span',this.$options.filters.translateAppId(params.row.appIds,this.returnisallAppIds))
          }
        },
        {
          title: '产品名称',
          key: 'productNm',
          minWidth: 120,
          align: 'center',
        },
        {
          title: '期数',
          key: 'issuePeriod',
          minWidth: 120,
          sortable: true,
          align: 'center',
        },
        {
          title: '收益率',
          key: 'rate',
          minWidth: 120,
          align: 'center',
          render: (row,params) => {

          }
          // slot: 'rate',
        },
        {
          title: '期限',
          key: 'period',
          minWidth: 120,
          align: 'center',
          slot: 'period',
        },
        {
          title: '已投额度',
          key: 'castQuantity',
          minWidth: 120,
          align: 'center',
          slot:'castQuantity'
        },
        {
          title: '剩余额度',
          key: 'surplusQuantity',
          minWidth: 120,
          align: 'center',
          slot:'surplusQuantity'
        },
        {
          title: '已投比例',
          key: 'yesInvest',
          minWidth: 120,
          align: 'center',
          slot:'yesInvest'
        },
        {
          title: '预售时间',
          key: 'localPresellTime',
          minWidth: 120,
          align: 'center',
        },
        {
          title: '状态',
          key: 'status',
          minWidth: 120,
          align: 'center',
          render: (h,params) =>{
            return h('span', params.row.status==='0'?'已下架':(params.row.status==='6'?'募集中':(params.row.status==='5'?'预售':(params.row.status==='7'?'售罄':(params.row.status==='8'?'已成立':(params.row.status==='9'?'成立失败':(params.row.status==='10'?'待兑付':(params.row.status==='11'?'已兑付':''))))))))
          }
        },
        {
          title: '供应渠道名称',
          key: 'status',
          minWidth: 140,
          align: 'center',
          render: (h,params) =>{
            return h('span', params.row.consignorCode === '1002'?'玖富':(params.row.consignorCode==='1001'?'天金':'东金'))
          }
        },
        {
          title: '创建时间',
          key: 'onlineTime',
          minWidth: 120,
          sortable: true,
          align: 'center',
        },
        {
          title: '操作',
          slot: 'action',
          minWidth: 320,
          fixed: 'right',
          align: 'center',
        },
      ],
      pageSize: 10,
      pagePn: 1,
      filterData:{},
      sort:'',//期数的排序
      order:'',//排序的方式 升序降序
      requestDetails:false,
      detailsInfo:{},//产品的详情
      showLabel:false, //添加标签
      labelId:'',//标签的ID
      showAllLabelLists:false,//查看所有的标签
      AllLabel:[],//所有的标签
      isShowAddInvest:false,//新增产品
      channelList:[], //所有的销售渠道
    };
  },
  computed:{
    ...mapGetters('common',['isInvestManage','isallAppIds']),
    tableData () {
      if (this.isInvestManage.results) {
        return this.isInvestManage.results
      } else {
        return {}
      }
    },
    getTotalPage () {
      if (this.isInvestManage.results) {
        return this.isInvestManage.total
      } else {
        return 0
      }
    },
    returnisallAppIds () {
      return this.isallAppIds
    }   
  },
  methods: {
    ...mapActions('common', ['getInvestLists','getAllsalechannel']),
    getInvestManage (status) {
      let params = {};
      params["page.size"] = this.pageSize;
      params["page.pn"] = this.pagePn;
      params["token"] = window.localStorage.getItem('backtoken');
      if (this.filterData.supplier) {
        params["query.consignorCode||eq"] = this.filterData.supplier;
      }
      if (this.filterData.productName) {
        params["query.productNm||like"] = this.filterData.productName;
      }
      if(this.filterData.status){
        params["query.status||eq"]=this.filterData.status;
      }
      if (status === false) {
        params['requestMark'] = 'no'
      } else {
        params['requestMark'] = 'yes'
      }
      let currentAppId = window.localStorage.getItem('backcurrentAppId')
      if (currentAppId && currentAppId !== '') {
        data[`query.appIds||regexp`] = currentAppId
      }
      if (this.sort !== '') {
        params["sort"] = this.sort;
      }
      if (this.order !== '') {
        params["order"] = this.order;
      }
      this.getInvestLists(params)
    },
    // 排序
    sortFilter (val) {
      if(val.column.key=='issuePeriod'){
        this.sort='iss'
      } else if(val.column.key=='onlineTime'){
        this.sort='t.online_time'
      }
      if (val.order == "asc") {
        this.order = "asc";
      } else if (val.order == "desc") {
        this.order = "desc";
      }
      this.getInvestManage(true)
    },
    // 搜索
    handleSearch(filterData) {
      this.filterData = filterData;
      this.getInvestManage(true)
    },
    // 分页
    handleChangePage(activePage) {
      this.pagePn = activePage;
      this.getInvestManage(true);
    },
    // 打开详情
    openInvestDetails(row) {
      this.requestDetails = true
      api.getInvestDetails({id:row.id}).then(res=>{
        if (res.code === 0) {
          this.requestDetails = false
          this.isShowInfoForm = true;
          this.detailsInfo = res
        } else {
          this.$Message.error(res.msg)
        }
        
      }).catch(err => {
        console.log(err)
      })
      
    },
    // 关闭详情

    // 打开修改
    openInvestUpdate(row) {
      this.isShowDetailModal = true;
    },
    // 确定修改
    sureInvestUpdate (formData) {
      this.isShowDetailModal = false
    },
    // 取消修改
    cancelInvestUpdate () {
      this.isShowDetailModal = false
    },
    // 打开标签
    addLabel (row) {
      this.labelId = row.id
      this.showLabel = true
    },
    // 取消标签
    cancelAddLabel () {
      this.labelId = ''
      this.showLabel = false
    },
    // 添加标签
    addInvestLabel (val) {
      if (val.name) {
        let $this = this
        api.getAddInvestLabel({productId:$this.labelId,label: val.name,status:'1'}).then(res => {
          if (res.code === 0) {
            $this.$Message.success('添加成功')
            $this.showLabel = false
          } else {
            $this.$Message.error(res.msg)
          }
        }).catch (err => {
          console.log(err)
        })
      } else {
        this.$Message.error('请填写标签名')
      }
    },
    // 查看标签
    seeLabelLists (row) {
      api.getAllLabelLists({id:row.id}).then(res=>{
        if (res.code === 0) {
          this.AllLabel = res.list
          this.showAllLabelLists = true
        } else {
          $this.$Message.error(res.msg)
        }
      }).catch (err => {
        
      }) 
    },
    // 删除标签
    deleteLabel (val) {
      const content = `<p>确认 <span style="color:green}">删除</span>该标签吗？<p>`;
      let idArray = []
			idArray.push(val.value)
      this.$Modal.confirm({
        title: '操作提示',
        content,
        loading: true,
        onOk: () => {
          api.getDeleteLabel(idArray).then(res=>{
            if (res.code === 0) {
              this.$Message.success('删除成功')
              this.$Modal.remove();
              this.showAllLabelLists = false
            } else {
              this.$Modal.remove();
              this.$Message.error(res.msg)
            }
          }).catch(err => {
            console.log(err)
          })
        },
        onCancel: () => {},
      });
    },
    // 获取所有的销售渠道
    getAllsalechannel () {
      let query = {};
      query["page.size"] = 100;
      query["page.pn"] = 1;
      api.getProductsalechannel(query).then(res=>{
        if (res.code === 0) {
          this.channelList = res.page.results
          this.isShowAddInvest = true
        }else {
          this.$Message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
   
    // 新增产品
    addInvestProduct () {
      this.getAllsalechannel()
    }
  },
  created () {
    this.getInvestManage(false)
    // this.getMenuLists()
  }
}