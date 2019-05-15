import { Form, Input, Row, Col, FormItem, Select, Divider, Button, Modal, Table, Switch } from 'iview';
import MyPanel from '@/components/base/my-panel/';
import LabelInfoItem from '@/components/base/label-info-item/';
import { mapActions ,mapGetters } from 'vuex';
import api from '@/api/';
export default {
  name: 'InfoForm',
  props:{
    detailsInfo:{
      type:Object
    }
  },
  components: {
    MyPanel,
    Form,
    Input,
    Row,
    Col,
    FormItem,
    Select,
    Divider,
    Button,
    Modal,
    Table,
    ISwitch: Switch,
    LabelInfoItem,
    whiteLists:[]
  },
  data() {
    return {
      isShowVariableLogicModal: false,
      ordercolumns: [
        {
          title: '投资人手机号',
          key: 'investUserPhone',
          minWidth: 120,
          align: 'center',
        },
        {
          title: '推荐经纪人手机号',
          key: 'inviteUserPhone',
          minWidth: 140,
          align: 'center',
        },
        {
          title: '下单日期',
          key: 'payDatetime',
          minWidth: 120,
          align: 'center',
          sortable: true
        },
        {
          title: '购买金额',
          key: 'totalAmt',
          minWidth: 110,
          align: 'center',
          sortable: true
        },
        {
          title: '收益率',
          key:'expIncomeRate',
          width: 110,
          align: 'center',
        },
        {
          title: '预期收益',
          key:'expIncome',
          width: 110,
          align: 'center',
        },
        {
          title: '期限',
          key:'expireDate',
          width: 110,
          align: 'center',
        },
        {
          title: '订单号',
          key:'orderNo',
          width: 200,
          align: 'center',
        },
        {
          title: '状态',
          key: 'status',
          minWidth: 120,
          align: 'center',
          render: (h,params) =>{
            return h('span', params.row.status==='1'?'待起息':(params.row.status==='2'?'计息中':(params.row.status==='3'?'待回款':(params.row.status==='4'?'已回款':(params.row.status==='5'?'退款中':'已退款')))))
          }
        },
        {
          title: '实付金额',
          key:'payAmt',
          width: 110,
          align: 'center',
        },
      ],
      orderDate: [],
    };
  },
  computed:{
    ...mapGetters('common',['isInvestManage','isallAppIds']),
    returnisallAppIds () {
      return this.isallAppIds
    },
    // 销售渠道
    chName () {
      return this.$options.filters.translateAppId(this.detailsInfo.result.appIds,this.returnisallAppIds)
    },
    // 白名单
    translateWhiteGroup () {
      if (this.detailsInfo.result.groupNum && this.whiteLists.length>0) {
        for (let i = 0; i < this.whiteLists.length; i++) {
          this.detailsInfo.result.groupNum = this.detailsInfo.result.groupNum.replace(
            this.whiteLists[i].groupNum,
            this.whiteLists[i].groupName
          );
        }
      }
      return this.detailsInfo.result.groupNum;
    }
  },
  methods: {
    getWhiteList () {
      let query = {};
      query["appId"] = this.detailsInfo.result.appIds;
      api.getAllWhiteList({appId:this.detailsInfo.result.appIds}).then(res => {
        this.whiteLists = res.userWhiteList;
      }).catch (err => {

      })
    },
    // 导出表格
    exportExcel () {
      let token = window.localStorage.getItem("backtoken");
      let currentAppId = window.localStorage.getItem("backcurrentAppId");
      let query = {};
      query["productId"] = this.detailsInfo.product.id;
      query["token"] = token;
      if (currentAppId && currentAppId != "") {
        query["appId"] = currentAppId.replace(/\|/g, ",");
      }
      let newQuery = "";
      for (let i in query) {
        newQuery += i + "=" + query[i] + "&";
      }
      let queryLast = newQuery.substr(0, newQuery.length - 1);
      window.location.href = `${
        process.env.VUE_APP_API_BASEURL
      }/invest/order/export?${queryLast}`;
    }
  },
  created () {
    // 获取所有的白名单
    this.getWhiteList()
  }
};
