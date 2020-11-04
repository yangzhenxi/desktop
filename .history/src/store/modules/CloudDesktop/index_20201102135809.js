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
    Search: {}
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
            state.Search = Search
    }
}
export default {
    state,
    mutations
}
