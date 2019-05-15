import { Button, Icon } from 'iview';
export default {
    name: 'SeeLabel',
    components:{
        Icon,
        Button
    },
    props: {
      label: {
        required: true,
        type: String,
      },
      value: String,
      labelWidth: {
        type: Number,
        default: 140,
      },
      labelId:String
    },
  }
  