const state = {
    // 添加模版数据
    isCluster: Boolean,
    Space: [],
    formValue: {}
}
const mutations = {
    SET_ISCLUSTER: (state, isCluster) => {
        state.isCluster = isCluster
    },
    SET_SPACE: (state, Space) => {
        state.Space = Space
    },
    SET_FORMVALUE: (state, formValue) => {
        if (formValue) {
            Object.assign(state.formValue, formValue)
        } else {
            state.formValue = {}
        }
    }
}
export default {
    state,
    mutations
}
