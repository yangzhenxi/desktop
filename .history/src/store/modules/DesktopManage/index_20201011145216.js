const state = {
    // 添加模版数据
    isCluster: Boolean,
    Space: [],
    formValue: {},
    // 详情页
    ModuleData: {}, // 单个模版信息详情
    Version: []
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
    },
    // 详情页
    SET_MODULEDATA: (state, ModuleData) => {
        state.ModulesData = ModuleData
    }
}
export default {
    state,
    mutations
}
