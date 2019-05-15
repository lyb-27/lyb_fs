export default {
  name: 'LabelInfoItem',
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
  },
}
