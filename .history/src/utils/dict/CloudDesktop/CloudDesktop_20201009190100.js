export default {
    // 维护状态
    C_D_INMAINTAINMODE_STATE: [
        { key: true, val: '开启', color: '#52c41a' },
        { key: false, val: '关闭', color: '#f50' }
    ],
    // 电源状态
    C_D_POWER_STATE: [
        { key: true, val: '开启', color: '#52c41a' },
        { key: false, val: '关闭', color: '#f50' }
    ],
    // 桌面类型
    C_D_DESKTOP_TYPE: [
        { key: 'Random', val: '随机桌面', color: '#52c41a' },
        { key: 'StaticDiscard', val: '静态还原', color: '#f50' },
        { key: 'StaticStore', val: '静态不还原', color: '#f50' }
    ],
    // 桌面状态
    C_D_DESKTOP_STATE: [
        { key: 'DesktopCreating', val: '创建中', color: '#52c41a' },
        { key: 'DesktopSuccess', val: '成功', color: '#f50' },
        { key: 'DesktopFail', val: '失败', color: '#f50' }
    ],
    // 桌面列表电源状态
    C_D_DESKTOP_LIST_STATE: [
        { key: 'Unmanaged', val: 'Unmanaged', color: '#f50' },
        { key: 'Unknown', val: 'Unknown', color: '#f50' },
        { key: 'Unavailable', val: 'Unavailable', color: '#f50' },
        { key: 'On', val: '开机', color: '#52c41a' },
        { key: 'Off', val: '关机', color: '#f50' },
        { key: 'Suspended', val: 'Suspended', color: '#f50' },
        { key: 'TurningOn', val: 'TurningOn', color: '#f50' },
        { key: 'TurningOff', val: 'TurningOff', color: '#f50' },
        { key: 'Suspending', val: 'Suspending', color: '#f50' },
        { key: 'resuming', val: 'resuming', color: '#f50' }
    ]
}
