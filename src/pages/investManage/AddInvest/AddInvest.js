import { Form, Input, Row, Col, FormItem, Select, Divider, Button, Modal, Table, Switch, DatePicker, Option, Spin } from 'iview';
import MyPanel from '@/components/base/my-panel/';
import VariableFilter from './variable-filter';
import LabelInfoItem from '@/components/base/label-info-item/';
import api from '@/api/';
export default {
  name: 'AddInvest',
  props: {
    channelList: {
      type: Array
    }
  },
  computed: {
    //   返回所有的渠道
    returnAllChannel() {
      return this.channelList
    }
  },
  components: {
    MyPanel,
    VariableFilter,
    Form,
    Input,
    Row,
    Col,
    FormItem,
    Select,
    Option,
    Divider,
    Button,
    Modal,
    Table,
    ISwitch: Switch,
    LabelInfoItem,
    DatePicker,
    Spin
  },
  data() {
    return {
      isShowVariableLogicModal: false,
      investData: {},
      triggerTypeList: [
        {
          key: 'kafka',
          value: 'kafka'
        },
        {
          key: 'aowjeo',
          value: 'aowjeo'
        },
      ],
      columns: [
        {
          title: '加工逻辑编码',
          key: 'code',
          minWidth: 110,
          align: 'center',
        },
        {
          title: '加工逻辑名称',
          key: 'code',
          minWidth: 110,
          align: 'center',
        },
        {
          title: '版本',
          key: 'code',
          minWidth: 110,
          align: 'center',
        },
        {
          title: '操作',
          slot: 'action',
          width: 110,
          align: 'center',
        },
      ],
      selectedVariable: [],
      whiteLists:[],//所有的白名单列表
      groupName:'',//预约名字
      groupNum:'',//预约Id
      showAddRate:false,//显示加息比例
      showChoiceInvestProduct:false, //添加的选择产品
      requestChoiceInvestProduct:false,// 加载中
      tjProductList:[],//预售的产品
    };
  },
  methods: {
    /**
     * @desc 表单校验
     */
    validateFormData() {
      return this.$refs.infoForm.validate();
    },

    /**
     * @desc 添加变量加工逻辑
     */
    handleAddVariable(slotProps) {
      const selectedVariableIds = this.selectedVariable.map(item => item.id);
      const selectedRowValid = slotProps.selectedRow.filter(item => item && !selectedVariableIds.includes(item.id));
      const newSelectedVariable = this.selectedVariable.concat(selectedRowValid);
      this.selectedVariable = JSON.parse(JSON.stringify(newSelectedVariable));

      this.handleHideVariableFilterModal();
    },

    /**
     * @desc 移除逻辑
     */
    handleRemoveLogic(row) {
      this.selectedVariable.splice(row._index, 1);
    },

    /**
     * @desc 显示添加变量加工逻辑弹框
     */
    handleShowVariableFilterModal() {
      this.isShowVariableLogicModal = true;
    },

    /**
     * @desc 隐藏添加变量加工逻辑弹框
     */
    handleHideVariableFilterModal() {
      this.isShowVariableLogicModal = false;
    },
    // 获取所有的白名单
     // 获取所有的白名单
    getAllWhiteLists (val) {
      api.getWhiteLists(val).then(res=>{
        if (res.code === 0) {
          this.whiteLists = res.userWhiteList
          this.whiteLists.forEach(v => {
            if (v.groupName === '预约组') {
              this.groupNum = v.groupNum
              this.groupName = v.groupName
            }
          });
        } else {
          this.$Message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 改变销售渠道
    changeAppids (val) {
      this.whiteLists = []
      this.groupNum = ''
      this.groupName = ''
      if (this.investData.whitePeople) {
        delete this.investData.whitePeople
      }
      let query = {};
      query["appId"] = val.join(",");
      this.getAllWhiteLists(query)
    },
    // 选择产品
    choiceInvestProduct() {
      this.requestChoiceInvestProduct = true
      api.gettjInvestProduct().then(res=>{
        if (res.code === 0) {
          this.tjProductList = res.tjProductList
          this.requestChoiceInvestProduct = false
          this.showChoiceInvestProduct = true
        } else {
          this.$Message.error(res.msg)
        }
      }).catch(err=>{

      })
    },
      // 改变白名单
    changeWhite (val) {
      // console.log(val)
      if (val.indexOf(this.groupNum) > 0) {
        this.showAddRate = true
      } else {
        this.showAddRate = false
      }
    },
    // 确定添加预售的产品
    handleAddVariable (val) {
      console.log(val)
    }
  },
  
};
