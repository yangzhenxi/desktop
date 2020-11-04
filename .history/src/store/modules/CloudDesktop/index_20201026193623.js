const state = {
    // 添加模版数据
    AllTP: [],
    AllVersion: [],
    formValue: {},
    networks: [],
    // 当前选中的DN
    dn: {},
    // 详情数据
    DetailsData: {}
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
    SET_DN: (state, DN) => {
        console.log(dn)
            state.dn = DN
    },
    SET_DETAILSDATA: (state, DetailsData) => {
            state.DetailsData = DetailsData
    }
}
export default {
    state,
    mutations
}
