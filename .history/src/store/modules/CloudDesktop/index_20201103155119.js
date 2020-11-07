import { deepGet } from '@/utils/util'
import { CloudDesktopMachineList, CloudDesktopGroupGet, CloudDesktopSessionList, CloudDesktopPolicyList } from '@/api/CloudDesktop/CloudDesktop'

const state = {
    // 添加模版数据
    AllTP: [],
    // 一维数组
    OUList: [],
    AllVersion: [],
    formValue: {},
    HostingUnit: [],
    networks: [],
    // 当前选中的DN
    dn: {},
    // 详情数据
    DetailsData: {},
    // 加工好的Ou
    AllOU: {},
    // 搜索的数据
    Search: {},
    // tab
    Tab_one_data: [],
    Tab_to_data: [],
    Tab_three_data: [],
    Tab_four_data: []

}
const mutations = {
    SET_FORMVALUE: (state, formValue) => {
        if (formValue) {
            Object.assign(state.formValue, formValue)
        } else {
            state.formValue = {}
        }
    },

    SET_VERSION: (state, AllVersion) => {
        if (AllVersion) {
            state.AllVersion = AllVersion
        }
    },
    SET_OULIST: (state, OUList) => {
        if (OUList) {
            state.OUList = OUList
        }
    },
    SET_TPLIST: (state, AllTP) => {
        if (AllTP) {
            state.AllTP = AllTP
        }
    },
    SET_NETWORKS: (state, networks) => {
        if (networks) {
            state.networks = networks
        }
    },
    SET_HOSTINGUNIT: (state, HostingUnit) => {
        if (HostingUnit) {
            state.HostingUnit = HostingUnit
        }
    },
    SET_DN: (state, DN) => {
            state.dn = DN
    },
    SET_DETAILSDATA: (state, DetailsData) => {
            state.DetailsData = DetailsData
    },
    SET_ALLOU: (state, AllOU) => {
            state.AllOU = AllOU
    },
    SET_SEARCH: (state, Search) => {
        Search ? state.Search = Search : state.Search = []
    },
    SET_TAB_ONE: (state, one) => {
            state.Tab_one_data = one
    },
    SET_TAB_TO: (state, to) => {
            state.Tab_to_data = to
    },
    SET_TAB_THREE: (state, three) => {
            state.Tab_three_data = three
    },
    SET_TAB_FOUR: (state, four) => {
            state.Tab_four_data = four
    }
}
const actions = {
    async GetTab1 ({ commit }) {
        const obj = { desktop_id: state.DetailsData.id }
        const data = deepGet(await CloudDesktopMachineList(obj), 'data', [])
        commit('SET_TAB_ONE', data)
        return new Promise(resolve => {
            resolve({
                data
            })
        })
    },
    async GetTab2 ({ commit }) {
        const obj = { desktop_id: state.DetailsData.id }
        const data = deepGet(await CloudDesktopPolicyList(obj), 'data', [])
        commit('SET_TAB_TO', data)
        return new Promise(resolve => {
            resolve({
                data
            })
        })
    },
    async GetTab3 ({ commit }) {
        const obj = { desktop_id: state.DetailsData.id }
        const data = deepGet(await CloudDesktopSessionList(obj), 'data', [])
        commit('SET_TAB_THREE', data)
        return new Promise(resolve => {
            resolve({
                data
            })
        })
    },
    async GetTab4 ({ commit }) {
        const obj = { desktop_id: state.DetailsData.id }
        const data = deepGet(await CloudDesktopGroupGet(obj), 'data', {})
        commit('SET_TAB_FOUR', data)
        return new Promise(resolve => {
            resolve({
                data
            })
        })
    }
}
export default {
    state,
    mutations,
    actions
}
