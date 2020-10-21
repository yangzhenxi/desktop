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
        { key: 'DesktopSuccess', val: '成功', color: '#52c41a' },
        { key: 'DesktopFail', val: '失败', color: '#f50' }
    ],
    // 桌面列表电源状态
    C_D_DESKTOP_LIST_POWER: [
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
    ],
    // 是否保存用户修改
    C_D_DESKTOP_LIST_PERSISTUSERCHANGES: [
        { key: true, val: '是', color: '#52c41a' },
        { key: false, val: '否', color: '#f50' }
    ],
    // 桌面列表维护状态
    C_D_DESKTOP_LIST_INMAINTENANCEMODE: [
        { key: true, val: '是', color: '#52c41a' },
        { key: false, val: '否', color: '#f50' }
    ],
    // 桌面列表注册状态
    C_D_DESKTOP_LIST_REGISTRATIONSTATE: [
        { key: 'Unregistered', val: 'Unregistered', color: '#52c41a' },
        { key: 'Initializing', val: 'Initializing', color: '#f50' },
        { key: 'Registered', val: 'Registered', color: '#f50' },
        { key: 'AgentError', val: 'AgentError', color: '#f50' }
    ],
    // 会话列表注册状态
    C_D_SESSION_LIST_STATE: [
        { key: 'Connected', val: '连接中', color: '#52c41a' },
        { key: 'Active', val: 'Active', color: '#f50' },
        { key: 'Disconnected', val: '已断开', color: '#f50' },
        { key: 'PreparingSession', val: '准备', color: '#f50' },
        { key: 'Reconnecting', val: '重连', color: '#f50' },
        { key: 'NonBrokerSession', val: 'NonBrokerSession', color: '#f50' },
        { key: 'Other', val: 'Other', color: '#f50' }
    ]
}
