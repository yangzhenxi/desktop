const state = {
    // 添加模版数据
    TPList: Boolean,
    Version: [],
    formValue: {}
}
const mutations = {
    SET_FORMVALUE: (state, formValue) => {
        if (formValue) {
            Object.assign(state.formValue, formValue)
        } else {
            state.formValue = {}
        }
    },

    SET_VERSION: (state, Version) => {
        if (Version) {
            state.Version = Version
        }
    },
    SET_TPLIST: (state, TPList) => {
        if (TPList) {
            state.TPList = TPList
        }
    }
}
export default {
    state,
    mutations
}
