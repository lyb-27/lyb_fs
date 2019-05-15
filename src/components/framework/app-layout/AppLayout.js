import AppHeader from '@/components/framework/app-header/';
import AppNav from '@/components/framework/app-nav/';
import AppMenu from '@/components/framework/app-menu/';
import { mapGetters } from 'vuex';

export default {
  name: 'AppLayout',
  components: {
    AppHeader,
    AppMenu,
    AppNav
  },
  data () {
    return {
      // topNavLists:JSON.parse(window.localStorage.getItem('backNavLists'))
    }
  },
  computed: {
    ...mapGetters('common', ['isCollapsed']),
    key() {
      return this.$route.fullPath;
    },
  },
  methods:{
  },
  mounted() {
    this.$Message.config({
      top: 50,
      duration: 3,
    });
  }
};
