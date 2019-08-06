import api from '@/api/';
const common = {
  namespaced: true,
  state: {
    menuItem:[],  // 导航菜单，登陆成功后添加
		agencyId: '',
		agencyName: '',
  },
  getters: {

  },
  mutations: {
    setAgency(state,params) {  // 二级面板展开折叠
			state.agencyId = params.id
			state.agencyName = params.name
			// state.avatar = params.avatar
    },
    setMenu(state,params) {  // 二级面板展开折叠
			if(params) {
				state.menuItem = params
			}else {
				state.menuItem = []
			}
		},
  },
  actions: {
    setAgency({commit},params) {  // 二级面板展开折叠
			commit('setAgency',params)
    },
    setMenu({commit},params) {  // 二级面板展开折叠
			commit('setMenu',params)
		},
  },
};

export default common;
