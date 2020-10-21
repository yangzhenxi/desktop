import { DesktopTemplateVersionList, DesktopTemplateAllList } from '@/api/CloudDesktop/DesktopManagem'
import { deepGet } from '@/utils/util'
const state = {
    // 添加模版数据
    DataCenterList: [], // 中心数据
    ImageList: [], // 系统镜像
    TPgroupList: [], // 模版组列表
    isCluster: Boolean,
    Space: [],
    formValue: {},
    // 详情页
    ModuleData: {}, // 单个模版信息详情
    Version: [], // tabs版本信息
    tooltipVisible: false, // 滑动输入条的tooltip显示
    capacityDisabled: Boolean, // 系统盘是否可用
    templateId: String
}
const mutations = {
    SET_DATACENTERLIST: (state, DataCenterList) => {
        state.DataCenterList = DataCenterList
    },
    SET_IMAGELIST: (state, ImageList) => {
        state.ImageList = ImageList
    },
    SET_TPGROUPLIST: (state, TPgroupList) => {
        state.TPgroupList = TPgroupList
    },
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
        state.tooltipVisible = tooltip
    },
    SET_CAPACITY: (state, capacityDisabled) => {
        state.capacityDisabled = capacityDisabled
    },
    SET_TEMPLATEID: (state, templatedId) => {
        state.templatedId = templatedId
    }
}
const actions = {
    async GetVersionList ({ commit }) {
        const obj = { templateId: state.templatedId }
        const data = deepGet(await DesktopTemplateVersionList(obj), 'data', [])
        commit('SET_VERSION', data)
        return new Promise(resolve => {
            resolve({
                data
            })
        })
    },
    async GetTPList ({ commit }) {
        const data = deepGet(await DesktopTemplateAllList({ group: 0 }), 'data', [])
        commit('SET_VERSION', data)
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
