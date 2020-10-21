import { DesktopTemplateVersionList } from '@/api/CloudDesktop/DesktopManagem'

const state = {
    // 添加模版数据
    isCluster: Boolean,
    Space: [],
    formValue: {},
    // 详情页
    ModuleData: {}, // 单个模版信息详情
    Version: [], // tabs版本信息
    tooltipVisible: false// 滑动输入条的tooltip显示
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
        state.ModuleData = ModuleData
    },
    SET_VERSION: (state, Version) => {
        state.Version = Version
    },
    SET_TOOLTIP: (state, tooltip) => {
        console.log(tooltip)
        state.tooltipVisible = tooltip
    }
}
const actions = {
    async GetVersionList ({ commit }) {
        console.log(1)
        const obj = { templateId: state.ModuleData.id }
        const data = this.deepGet(await DesktopTemplateVersionList(obj), 'data', [])
        commit('SET_VERSION', data)
    }
}
export default {
    state,
    mutations,
    actions
}
