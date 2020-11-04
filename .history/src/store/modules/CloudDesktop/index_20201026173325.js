const state = {
    // 添加模版数据
    AllTP: [],
    AllVersion: [],
    formValue: {},
    networks: [],
    // 详情数据
    Details: {}
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
    }
}
export default {
    state,
    mutations
}
