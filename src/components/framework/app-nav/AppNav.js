import { mapGetters,mapMutations } from 'vuex';
import { Icon, Tag } from 'iview'
export default {
	components: {
		Icon,
		Tag
	},
	data() {
		return {
		}
	},
	computed: {
		...mapGetters('common', ['isNavLists']),
		isNavListsGetters () {
			return this.isNavLists
		}
	},
	methods:{
		...mapMutations('common', ['updateTopLists','deleteInvestManage']),
		// 删掉导航栏
    closeNavOne(navlist) {
			let localNavLists = JSON.parse(window.localStorage.getItem('backNavLists'))
			localNavLists.forEach((v,index) => {
				if (v.name === navlist.name) {
					if (v.colorMark === true) {
						localNavLists[index-1].colorMark = true
						localNavLists.splice(index,1)
						window.localStorage.setItem('backNavLists',JSON.stringify(localNavLists))
						this.$router.push(`${this.isNavLists[index-1].path2}/${this.isNavLists[index-1].path1}`)
					} else {
						localNavLists.splice(index,1)
					}
				}
			});
			this.updateTopLists()
			// 删除所有的产品
			this.deleteInvestManage({name:'investManage'})
		},
		// 前往导航栏
		goMenu (navlist) {
			let localNavLists = JSON.parse(window.localStorage.getItem('backNavLists'))
			localNavLists.forEach(m=>{
				m['colorMark'] = false
			})
			localNavLists.forEach((v,index)=>{
        if (v.name === navlist.name) {
          localNavLists[index].colorMark = true
        }
			})
			this.$router.push(`${navlist.path2}/${navlist.path1}`)
			window.localStorage.setItem('backNavLists',JSON.stringify(localNavLists))
			this.updateTopLists()
		}
	}
}