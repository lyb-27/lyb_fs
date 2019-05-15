
import menu from '@/router/menu';
import { mapGetters, mapMutations } from 'vuex';
import { Menu, MenuItem, Submenu, Icon } from 'iview';
export default {
  props: ['isCollapse'],
  components: {
    Menu,
    Submenu,
    MenuItem,
    Icon
  },
  data() {
    return {
      menuData: menu,
      active_name: this.$route.name
    };
  },
  computed: {
    titleText() {
      if(!this.isCollapse) {
        setTimeout(()=>{
          this.menuData = menu;
        }, 300)
      } else {
        this.menuData = [];
      }
      return this.isCollapse ? '威顿' : '测试控制台';
    },
  },
  methods:{
    ...mapMutations('common', ['updateTopLists']),
    updateOpened(path,val) {
      let localNavLists = JSON.parse(window.localStorage.getItem('backNavLists'))
      let newArrNavList = []
      localNavLists.forEach((v)=>{
        newArrNavList.push(v.name)
      })
      if (newArrNavList.indexOf(val.name) === -1) {
        localNavLists.forEach(v=>{
          v['colorMark'] = false
        })
        let newObj = {}
        newObj['name'] = val.name
        newObj['path1'] = val.path
        newObj['path2'] = path
        newObj['colorMark'] = true
        localNavLists.push(newObj)
        window.localStorage.setItem('backNavLists',JSON.stringify(localNavLists))
      } else {
        localNavLists.forEach(v=>{
          v['colorMark'] = false
        })
        newArrNavList.forEach((v,index)=>{
          if (v === val.name) {
            localNavLists[index].colorMark = true
          }
        })
      }
      // 更新本地的top导航
      this.updateTopLists()
    }
  }
}