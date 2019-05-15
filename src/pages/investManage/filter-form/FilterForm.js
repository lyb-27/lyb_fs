import { Form, Input, Row, Col, FormItem, Select, DatePicker, Option } from 'iview';

export default {
  name: 'filterForm',
  props: {
    isBtnLoading: Boolean,
  },
  components: { Form, Input, Row, Col, FormItem, Select, DatePicker, Option },
  data() {
    return {
      formData: {},
    };
  },
  computed: {
    statusList() {
      return [
        {
          value: "1001",
          label: "天金交易所"
        },
        {
          value: "1000",
          label: "东金交易所"
        },
        {
          value: "1002",
          label: "玖富"
        }
      ];
    },
    allstatusL () {
      return [
        {
          label:"已下架",
          value:'0'
        },
        {
          label:"预售",
          value:'5'
        },
        {
          label:"募集中",
          value:'6'
        },
        {
          label:"售罄",
          value:'7'
        },
        {
          label:"已成立",
          value:'8'
        },
        {
          label:"成立失败",
          value:'9'
        },
        {
          label:"待兑付",
          value:'10'
        },
        {
          label:"已兑付",
          value:'11'
        },
      ]
    }
  }
};
