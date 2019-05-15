import { Form, Input, FormItem, Select, Divider, Page, Button, Table } from 'iview';
import api from '@/api/';

export default {
  name: 'VariableFilter',
  components: {  Form, Input, FormItem, Select, Divider, Page, Button, Table },
  props:{
    tjProductList:{
      type:Array
    }
  },
  data() {
    return {
      formData: {},
      currentPage: 1,
      perPage: 10,
      totalNum: 0,
      columns: [
        {
          title: '产品名称',
          key: 'productNm',
          minWidth: 110,
          align: 'center',
        },
        {
          title: '年化收益',
          key: 'code',
          minWidth: 110,
          align: 'center',
          render: (row,params)=>{
            return row('span',params.row.rate+'%')
          }
        },
        {
          title: '期限',
          key: 'period',
          minWidth: 110,
          align: 'center',
          render: (row,params)=>{
            return row('span',params.row.period+'天')
          }
        },
        {
          title: '起投金额',
          key: 'minTenderQuantity',
          minWidth: 110,
          align: 'center',
        },
        {
          title: '最大投资金额',
          key: 'maxTenderQuantity',
          minWidth: 120,
          align: 'center',
        },
        {
          title: '状态',
          key: 'status',
          minWidth: 110,
          align: 'center',
          render: (row,params)=>{
            return row('span',params.row.status==='6'?'可售':(params.row.status==='5'?'预售中':'售罄'))
          }
        },
        {
          title: '开始时间',
          key: 'startSaleTime',
          minWidth: 110,
          align: 'center',
        },
        {
          title: '结束时间',
          key: 'endSaleTime',
          minWidth: 110,
          align: 'center',
        },
        {
          title: '起息日期',
          key: 'interestStartDate',
          minWidth: 110,
          align: 'center',
        },
        {
          type: 'selection',
          width: 65,
          align: 'center',
        },
      ],
      selectedRow: [],
    };
  },
  methods: {
    // 多选
    handleSelectChange(data) {
      this.selectedRow = data;
    },
  },
}
