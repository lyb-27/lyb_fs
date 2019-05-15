import api from '@/api/';
const common = {
  namespaced: true,
  state: {
    collapsed: false,
    menuNavList:[],   //左侧的导航
    appIdsIncludeAll: [], // 包括全部
    appIds: [], // 不包括全部选项
    allAppIds: [], // 所有appId，主要用于翻译销售渠道，
    investManage:{},  //所有的产品 必须都是对象
    navLists:[],//上边的导航
  },
  getters: {
    isNavLists: state => state.navLists,  //上边的额导航
    isCollapsed: state => state.collapsed,
    ismenuNavList: state => state.menuNavList,
    isappIdsIncludeAll: state => state.appIdsIncludeAll,
    isappIds: state => state.appIds,
    isallAppIds: state => state.allAppIds,
    isInvestManage: state => state.investManage
  },
  mutations: {
    toggleCollapsed(state, status) {
      state.collapsed = status;
    },
    // 更新上边的导航
    updateTopLists (state,status) {
      state.navLists = JSON.parse(window.localStorage.getItem('backNavLists'))
    },
    // 左侧的菜单
    updateLeftMenus (state,status) {
      state.menuNavList = status
    },
    // header里面的渠道导航
    updateAllAppIds (state, status) {
      state.allAppIds = status
    },
    updateAppIdsIncludeAll (state, status) {
      state.appIdsIncludeAll = status
    },
    updateAppIds (state, status) {
      state.appIds = status
    },
    // 请求所有的产品
    updateInvestManage (state,status) {
      state.investManage = status
    },
    // 删除所有的导航
    deleteInvestManage (state,status) {
      let newState = status.name
      console.log(state.newState)
      // state.newState = {}
      // console.log(state.status.name)
      // Object.keys(state).forEach(v => {
      //   if (v === status.name) {
      //     console.log(v)
      //     console.log(state.v)
      //     // state.v = {}
      //   }
      // })
      // console.log(state)
    }
  },
  actions: {
    // 获取左侧的导航栏菜单
    getLeftNavLists({ state,commit },data) {
      if (state.menuNavList.length === 0) {
        api.menuNav().then(res => {
          window.localStorage.setItem('backnewMenuList',JSON.stringify(res.menuList))
          commit('updateLeftMenus',res.menuList)
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 获取上边的渠道列表
    getChannelList ({ state,commit }, data) {
      let query = {}
      query['page.size'] = 100
      query['page.pn'] = 1
      query['token'] = data.token
      api.getChannel(query).then(res => {
        // 判断用户权限;0为平台管理员,1为渠道管理员
        let userCompetence = window.localStorage.getItem('backuserCompetence')
        commit('updateAllAppIds', res.page.results.slice(0))
        if (userCompetence === '1') {
          let appIds = window.localStorage.getItem('backappIds').split('|')
          let arr = []
          // 查找出对应用户权限的appId
          for (let i = 0; i < res.page.results.length; i++) {
            for (let j = 0; j < appIds.length; j++) {
              if (res.page.results[i].appId === appIds[j]) {
                arr.push(res.page.results[i])
              }
            }
          }
          commit('updateAppIds', arr.slice(0))
          // 只有1个渠道权限的管理员，不显示选择
          if (appIds.length > 1) {
            arr.unshift({ name: '全部', appId: window.localStorage.getItem('backappIds') })
          }
          commit('updateAppIdsIncludeAll', arr)
          // 如果本地存在当前选择的appId，则不更新
          if (!window.localStorage.getItem('backcurrentAppId')) {
            window.localStorage.setItem('backcurrentAppId', arr[0].appId)
          }
        } else {
          commit('updateAppIds', res.page.results.slice(0))
          res.page.results.unshift({ name: '全部', appId: '' })
          commit('updateAppIdsIncludeAll', res.page.results)
          // 如果本地存在当前选择的appId，则不更新
          if (!window.localStorage.getItem('backcurrentAppId')) {
            window.localStorage.setItem('backcurrentAppId', res.page.results[0].appId)
          }
        }
      })
    },
    //获取所有的产品
    getInvestLists ({ state,commit},data) {
      console.log(Object.keys(state.investManage))
      if (data.requestMark === 'yes') { //分页
        api.getAllInvest(data).then(res=> {
          commit('updateInvestManage',res.page)
        }).catch(err=>{
          console.log(err)
        })
      } else {
        // 正常的请求数据
        if (Object.keys(state.investManage).length === 0) {
          api.getAllInvest(data).then(res=> {
            commit('updateInvestManage',res.page)
          }).catch(err=>{
            console.log(err)
          })
        }
      }
    },

    // async getMenuNav (context, payload) {
    //   const data = await http.get('sys/menu/nav')
    //   // console.log(data.data.menuList)
    //   context.commit('updateMenuNav', data.data.menuList)
    //   context.commit('updateMenuPerm', data.data.permissions)
    // },
    // changeIframeBus({ commit }) {
    //   commit('switchIframeBus', true);
    //   setTimeout(() => {
    //     commit('switchIframeBus', false);
    //   }, 2000);
    // },
    // parentAdd({ commit, dispatch }, { newText, newUrl }) {
    //   commit('setParentData', {
    //     newAction: 'openTab',
    //     newMethod: 'edit',
    //     display: 'none',
    //     newUrl,
    //     newText,
    //   });
    //   dispatch('changeIframeBus');
    // },
    // parentEdit({ commit, dispatch }, { data }) {
    //   commit('setParentData', {
    //     newAction: 'editMenu',
    //     newMethod: 'edit',
    //     data: JSON.stringify(data),
    //   });
    //   dispatch('changeIframeBus');
    // },
    // parentDel({ commit, dispatch }, { newKey }) {
    //   commit('setParentData', {
    //     newAction: 'delTab',
    //     newMethod: 'del',
    //     newKey,
    //   });
    //   dispatch('changeIframeBus');
    // },
    // parentLogin({ commit, dispatch }) {
    //   commit('setParentData', {
    //     newAction: 'goLogin',
    //   });
    //   dispatch('changeIframeBus');
    // },
  },
};

export default common;
