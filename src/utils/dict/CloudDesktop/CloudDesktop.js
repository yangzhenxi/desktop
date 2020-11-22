export default {
    // 维护状态
    C_D_INMAINTAINMODE_STATE: [
        { key: true, val: '开启', option: '关闭', optionVal: false, color: '#2db7f5' },
        { key: false, val: '关闭', option: '开启', optionVal: true, color: '#f50' }
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
        { key: 'SYSTEM_TASK_STATE_RUNNING', val: '创建中', color: '#2db7f5' },
        { key: 'SYSTEM_TASK_STATE_SUCCESS', val: '成功', color: '#52c41a' },
        { key: 'SYSTEM_TASK_STATE_FAIL', val: '失败', color: '#f5222d' },
        { key: 'SYSTEM_TASK_STATE_PREPARING', val: '等待中', color: '#2db7f5' }
    ],
    // 任务步骤状态
    C_D_DESKTOP_NAMINGSCHEMETYPE: [
        { key: 'DESKTOP_NAMING_SCHEME_TYPE_ALPHABETIC', val: '字母填充，', color: '#2db7f5' },
        { key: 'DESKTOP_NAMING_SCHEME_TYPE_NUMERIC', val: '数字填充，', color: '#52c41a' }
    ],

    // 桌面列表电源状态
    C_D_DESKTOP_LIST_POWER: [
        { key: 'POWER_STATE_UNSPECIFIED', val: '挂起', color: '#f50' },
        { key: 'POWER_STATE_UNMANAGED', val: '托管', color: '#f50' },
        { key: 'POWER_STATE_UNKNOWN', val: '挂起', color: '#f50' },
        { key: 'POWER_STATE_ON', val: '开机', color: '#2db7f5' },
        { key: 'POWER_STATE_OFF', val: '关机', color: '#f50' },
        { key: 'POWER_STATE_UNAVAILABLE', val: '禁用', color: '#f50' },
        { key: 'POWER_STATE_SUSPENDED', val: '暂停', color: '#f50' },
        { key: 'POWER_STATE_TURNING_ON', val: '正在开机', color: '#f50' },
        { key: 'POWER_STATE_TURNING_OFF', val: '正在关机', color: '#f50' },
        { key: 'POWER_STATE_SUSPENDING', val: '挂起', color: '#f50' },
        { key: 'POWER_STATE_RESUMING', val: '恢复中', color: '#f50' }
    ],
    // 是否保存用户修改
    C_D_DESKTOP_LIST_PERSISTUSERCHANGES: [
        { key: true, val: '是', color: '#2db7f5' },
        { key: false, val: '否', color: '#f50' }
    ],
    // 桌面列表维护状态
    C_D_DESKTOP_LIST_INMAINTENANCEMODE: [
        { key: true, val: '开启', color: '#2db7f5' },
        { key: false, val: '关闭', color: '#f50' }
    ],
    // 桌面列表注册状态
    C_D_DESKTOP_LIST_REGISTRATIONSTATE: [
        { key: 'REGISTRATION_STATE_UNREGISTERED', val: '未注册', color: '#2db7f5' },
        { key: 'REGISTRATION_STATE_INITIALIZING', val: '初始状态', color: '#f50' },
        { key: 'REGISTRATION_STATE_REGISTERED', val: '已注册', color: '#f50' },
        { key: 'REGISTRATION_STATE_AGENT_ERROR', val: '注册失败', color: '#f50' }
    ],
    // 会话列表注册状态
    C_D_SESSION_LIST_STATE: [
        { key: 'SESSION_STATE_CONNECTED', val: '连接中', color: '#2db7f5' },
        { key: 'SESSION_STATE_ACTIVE', val: '活跃中', color: '#2db7f5' },
        { key: 'SESSION_STATE_DISCONNECTED', val: '已断开', color: '#f50' }
        // { key: 'PreparingSession', val: '准备', color: '#f50' },
        // { key: 'Reconnecting', val: '重连', color: '#f50' },
        // { key: 'NonBrokerSession', val: 'NonBrokerSession', color: '#f50' },
        // { key: 'Other', val: 'Other', color: '#f50' }
    ]
}
