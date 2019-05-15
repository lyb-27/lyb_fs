import CommonIcon from '@/components/base/common-icon/';

export default {
  name: 'MyPanel',
  components: {
    CommonIcon,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: 'md-document',
    },
    iconSize: {
      type: Number,
      default: 18,
    },
    theme: {
      type: String,
      default: 'default',
    },
    padding: {
      type: String,
      default: '10px',
    },
  },
  data() {
    return {
      showFooter: true,
    };
  },
  mounted() {
    this.showFooter = this.$slots.footer !== undefined;
  },
};
