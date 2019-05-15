import { mapGetters, mapMutations } from 'vuex';
import { Icon , Select ,Option, Avatar } from 'iview';
export default {
  name: 'siderTrigger',
  components: {
    Icon,
    Select,
    Option,
    Avatar
  },
  props: {
    icon: {
      type: String,
      default: 'navicon-round',
    },
    size: {
      type: Number,
      default: 26,
    },
  },
  data () {
    return {
      model1:'',
    }
  },
  computed: {
    userName () {
      return window.localStorage.getItem('backusername')
    },
    ...mapGetters('common', ['isCollapsed','isappIdsIncludeAll']),
    appIdsIncludeAll () {
			return this.isappIdsIncludeAll
		}
  },
  methods: {
    ...mapMutations('common', ['toggleCollapsed']),
    handleToggleCollapsed() {
      this.toggleCollapsed(!this.isCollapsed);
    },
    selectAppId (val) {
      this.model1 = val;
      window.localStorage.setItem('backcurrentAppId',val)
      // bus.$emit('reload')
        // window.location.reload()
    }
  },
};
