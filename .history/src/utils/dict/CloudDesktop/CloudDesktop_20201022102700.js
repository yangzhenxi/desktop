export default {
    // 维护状态
    C_D_INMAINTAINMODE_STATE: [
        { key: true, val: '开启', color: '#2db7f5' },
        { key: false, val: '关闭', color: '#f50' }
    ],
    // 电源状态
    C_D_POWER_STATE: [
        { key: true, val: '开启', color: '#2db7f5' },
        { key: false, val: '关闭', color: '#f50' }
    ],
    // 桌面类型
    C_D_DESKTOP_TYPE: [
        { key: 'DESKTOP_TYPE_RANDOM', val: '随机桌面', color: '#2db7f5' },
        { key: 'DESKTOP_TYPE_STATIC_DISCARD', val: '静态还原', color: '#2db7f5' },
        { key: 'DESKTOP_TYPE_STATIC_STORE', val: '静态不还原', color: '#2db7f5' }
    ],
    // 桌面状态
    C_D_DESKTOP_STATE: [
        { key: 'DESKTOP_STATE_CREATING', val: '创建中', color: '#faad14' },
        { key: 'DESKTOP_STATE_SUCCESS', val: '成功', color: '#2db7f5' },
        { key: 'DESKTOP_STATE_FAIL', val: '失败', color: '#f50' }
    ],
    // 任务步骤状态
    C_D_DESKTOP_TASK_ATSTE: [
        { key: 'SYSTEM_TASK_STATE_RUNNING', val: '创建中', color: '#faad14' },
        { key: 'SYSTEM_TASK_STATE_SUCCESS', val: '成功', color: '#2db7f5' },
        { key: 'SYSTEM_TASK_STATE_FAIL', val: '失败', color: '#f50' },
        { key: 'SYSTEM_TASK_STATE_PREPARING', val: '准备中', color: '#faad14' }
    ],

    // 桌面列表电源状态
    C_D_DESKTOP_LIST_POWER: [
        { key: 'POWER_STATE_UNSPECIFIED', val: 'Unmanaged', color: '#f50' },
        { key: 'POWER_STATE_UNMANAGED', val: 'Unknown', color: '#f50' },
        { key: 'POWER_STATE_UNKNOWN', val: 'Unavailable', color: '#f50' },
        { key: 'POWER_STATE_ON', val: '开机', color: '#2db7f5' },
        { key: 'POWER_STATE_OFF', val: '关机', color: '#f50' },
        { key: 'POWER_STATE_UNAVAILABLE', val: 'Suspended', color: '#f50' },
        { key: 'POWER_STATE_SUSPENDED', val: 'TurningOn', color: '#f50' },
        { key: 'POWER_STATE_TURNING_ON', val: 'TurningOff', color: '#f50' },
        { key: 'POWER_STATE_TURNING_OFF', val: 'Suspending', color: '#f50' },
        { key: 'POWER_STATE_SUSPENDING', val: 'Suspending', color: '#f50' },
        { key: 'POWER_STATE_RESUMING', val: 'resuming', color: '#f50' }
    ],
    // 是否保存用户修改
    C_D_DESKTOP_LIST_PERSISTUSERCHANGES: [
        { key: true, val: '是', color: '#2db7f5' },
        { key: false, val: '否', color: '#f50' }
    ],
    // 桌面列表维护状态
    C_D_DESKTOP_LIST_INMAINTENANCEMODE: [
        { key: true, val: '是', color: '#2db7f5' },
        { key: false, val: '否', color: '#f50' }
    ],
    // 桌面列表注册状态
    C_D_DESKTOP_LIST_REGISTRATIONSTATE: [
        { key: 'REGISTRATION_STATE_UNREGISTERED', val: 'Unregistered', color: '#2db7f5' },
        { key: 'REGISTRATION_STATE_INITIALIZING', val: 'Initializing', color: '#f50' },
        { key: 'REGISTRATION_STATE_REGISTERED', val: 'Registered', color: '#f50' },
        { key: 'REGISTRATION_STATE_AGENT_ERROR', val: 'AgentError', color: '#f50' }
    ],
    // 会话列表注册状态
    C_D_SESSION_LIST_STATE: [
        { key: 'Connected', val: '连接中', color: '#2db7f5' },
        { key: 'Active', val: 'Active', color: '#f50' },
        { key: 'Disconnected', val: '已断开', color: '#f50' },
        { key: 'PreparingSession', val: '准备', color: '#f50' },
        { key: 'Reconnecting', val: '重连', color: '#f50' },
        { key: 'NonBrokerSession', val: 'NonBrokerSession', color: '#f50' },
        { key: 'Other', val: 'Other', color: '#f50' }
    ]
}
