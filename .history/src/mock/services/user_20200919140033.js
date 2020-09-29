import Mock from 'mockjs2'
import { builder } from '../util'
const info = (options) => {
  const userInfo = {
    'id': '4291d7da9005377ec9aec4a71ea837f',
    'name': '天野远子',
    'username': 'admin',
    'password': '',
    'avatar': '/avatar2.jpg',
    'status': 1,
    'telephone': '',
    'lastLoginIp': '27.154.74.117',
    'lastLoginTime': 1534837621348,
    'creatorId': 'admin',
    'createTime': 1497160610259,
    'merchantCode': 'TLif2btpzg079h15bk',
    'deleted': 0,
    'roleId': 'admin',
    'role': {}
  }
  // role
  const roleObj = {
    'id': 'admin',
    'name': '管理员',
    'describe': '拥有所有权限',
    'status': 1,
    'creatorId': 'system',
    'createTime': 1497160610259,
    'deleted': 0,
    'permissions': [{
      'roleId': 'admin',
      'permissionId': 'dashboard',
      'permissionName': '仪表盘',
      'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      'actionEntitySet': [{
        'action': 'add',
        'describe': '新增',
        'defaultCheck': false
      }, {
        'action': 'query',
        'describe': '查询',
        'defaultCheck': false
      }, {
        'action': 'get',
        'describe': '详情',
        'defaultCheck': false
      }, {
        'action': 'update',
        'describe': '修改',
        'defaultCheck': false
      }, {
        'action': 'delete',
        'describe': '删除',
        'defaultCheck': false
      }],
      'actionList': null,
      'dataAccess': null
    }, {
      'roleId': 'admin',
      'permissionId': 'userManagement',
      'permissionName': '异常页面权限',
      'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      'actionEntitySet': [{
        'action': 'query',
        'describe': '查询',
        'defaultCheck': false
      }, {
        'action': 'get',
        'describe': '详情',
        'defaultCheck': false
      }, {
        'action': 'update',
        'describe': '修改',
        'defaultCheck': false
      }, {
        'action': 'delete',
        'describe': '删除',
        'defaultCheck': false
      }],
      'actionList': null,
      'dataAccess': null
    }, {
      'roleId': 'admin',
      'permissionId': 'result',
      'permissionName': '结果权限',
      'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      'actionEntitySet': [{
        'action': 'add',
        'describe': '新增',
        'defaultCheck': false
      }, {
        'action': 'query',
        'describe': '查询',
        'defaultCheck': false
      }, {
        'action': 'get',
        'describe': '详情',
        'defaultCheck': false
      }, {
        'action': 'update',
        'describe': '修改',
        'defaultCheck': false
      }, {
        'action': 'delete',
        'describe': '删除',
        'defaultCheck': false
      }],
      'actionList': null,
      'dataAccess': null
    }, {
      'roleId': 'admin',
      'permissionId': 'profile',
      'permissionName': '详细页权限',
      'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      'actionEntitySet': [{
        'action': 'add',
        'describe': '新增',
        'defaultCheck': false
      }, {
        'action': 'query',
        'describe': '查询',
        'defaultCheck': false
      }, {
        'action': 'get',
        'describe': '详情',
        'defaultCheck': false
      }, {
        'action': 'update',
        'describe': '修改',
        'defaultCheck': false
      }, {
        'action': 'delete',
        'describe': '删除',
        'defaultCheck': false
      }],
      'actionList': null,
      'dataAccess': null
    }, {
      'roleId': 'admin',
      'permissionId': 'table',
      'permissionName': '表格权限',
      'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"}]',
      'actionEntitySet': [{
        'action': 'add',
        'describe': '新增',
        'defaultCheck': false
      }, {
        'action': 'import',
        'describe': '导入',
        'defaultCheck': false
      }, {
        'action': 'get',
        'describe': '详情',
        'defaultCheck': false
      }, {
        'action': 'update',
        'describe': '修改',
        'defaultCheck': false
      }],
      'actionList': null,
      'dataAccess': null
    }, {
      'roleId': 'admin',
      'permissionId': 'form',
      'permissionName': '表单权限',
      'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      'actionEntitySet': [{
        'action': 'add',
        'describe': '新增',
        'defaultCheck': false
      }, {
        'action': 'get',
        'describe': '详情',
        'defaultCheck': false
      }, {
        'action': 'query',
        'describe': '查询',
        'defaultCheck': false
      }, {
        'action': 'update',
        'describe': '修改',
        'defaultCheck': false
      }, {
        'action': 'delete',
        'describe': '删除',
        'defaultCheck': false
      }],
      'actionList': null,
      'dataAccess': null
    }, {
      'roleId': 'admin',
      'permissionId': 'order',
      'permissionName': '订单管理',
      'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      'actionEntitySet': [{
        'action': 'add',
        'describe': '新增',
        'defaultCheck': false
      }, {
        'action': 'query',
        'describe': '查询',
        'defaultCheck': false
      }, {
        'action': 'get',
        'describe': '详情',
        'defaultCheck': false
      }, {
        'action': 'update',
        'describe': '修改',
        'defaultCheck': false
      }, {
        'action': 'delete',
        'describe': '删除',
        'defaultCheck': false
      }],
      'actionList': null,
      'dataAccess': null
    }, {
      'roleId': 'admin',
      'permissionId': 'permission',
      'permissionName': '权限管理',
      'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      'actionEntitySet': [{
        'action': 'add',
        'describe': '新增',
        'defaultCheck': false
      }, {
        'action': 'get',
        'describe': '详情',
        'defaultCheck': false
      }, {
        'action': 'update',
        'describe': '修改',
        'defaultCheck': false
      }, {
        'action': 'delete',
        'describe': '删除',
        'defaultCheck': false
      }],
      'actionList': null,
      'dataAccess': null
    }, {
      'roleId': 'admin',
      'permissionId': 'role',
      'permissionName': '角色管理',
      'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      'actionEntitySet': [{
        'action': 'add',
        'describe': '新增',
        'defaultCheck': false
      }, {
        'action': 'get',
        'describe': '详情',
        'defaultCheck': false
      }, {
        'action': 'update',
        'describe': '修改',
        'defaultCheck': false
      }, {
        'action': 'delete',
        'describe': '删除',
        'defaultCheck': false
      }],
      'actionList': null,
      'dataAccess': null
    }, {
      'roleId': 'admin',
      'permissionId': 'table',
      'permissionName': '桌子管理',
      'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
      'actionEntitySet': [{
        'action': 'add',
        'describe': '新增',
        'defaultCheck': false
      }, {
        'action': 'get',
        'describe': '详情',
        'defaultCheck': false
      }, {
        'action': 'query',
        'describe': '查询',
        'defaultCheck': false
      }, {
        'action': 'update',
        'describe': '修改',
        'defaultCheck': false
      }, {
        'action': 'delete',
        'describe': '删除',
        'defaultCheck': false
      }],
      'actionList': null,
      'dataAccess': null
    }, {
      'roleId': 'admin',
      'permissionId': 'user',
      'permissionName': '用户管理',
      'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"export","defaultCheck":false,"describe":"导出"}]',
      'actionEntitySet': [{
        'action': 'add',
        'describe': '新增',
        'defaultCheck': false
      }, {
        'action': 'import',
        'describe': '导入',
        'defaultCheck': false
      }, {
        'action': 'get',
        'describe': '详情',
        'defaultCheck': false
      }, {
        'action': 'update',
        'describe': '修改',
        'defaultCheck': false
      }, {
        'action': 'delete',
        'describe': '删除',
        'defaultCheck': false
      }, {
        'action': 'export',
        'describe': '导出',
        'defaultCheck': false
      }],
      'actionList': null,
      'dataAccess': null
    }]
  }

  roleObj.permissions.push({
    'roleId': 'admin',
    'permissionId': 'support',
    'permissionName': '超级模块',
    'actions': '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"export","defaultCheck":false,"describe":"导出"}]',
    'actionEntitySet': [{
      'action': 'add',
      'describe': '新增',
      'defaultCheck': false
    }, {
      'action': 'import',
      'describe': '导入',
      'defaultCheck': false
    }, {
      'action': 'get',
      'describe': '详情',
      'defaultCheck': false
    }, {
      'action': 'update',
      'describe': '修改',
      'defaultCheck': false
    }, {
      'action': 'delete',
      'describe': '删除',
      'defaultCheck': false
    }, {
      'action': 'export',
      'describe': '导出',
      'defaultCheck': false
    }],
    'actionList': null,
    'dataAccess': null
  })

  userInfo.role = roleObj
  return builder(userInfo)
}

const userNav = (options) => {
  const nav = [
    // dashboard
    {
      'name': 'Dashboard',
      'parentId': 0,
      'id': 1,
      'meta': {
        'icon': 'dashboard',
        'title': '仪表盘',
        'show': true
      }
    },
    {
      'name': 'CloudDesktop',
      'parentId': 0,
      'id': 2,
      'meta': {
        'icon': 'dashboard',
        'title': '云桌面',
        'show': true
      },
      'component': 'PageView'
    },
    {
      'name': 'userManagement',
      // 'authority': 'admin', // 配置准入权限
      'parentId': 2,
      'meta': {
        'title': '用户管理',
        'show': true
      },
      'component': 'userManagement'
    },
    {
      'name': 'DesktopManagem',
      'parentId': 2,
      'meta': {
        'title': '桌面模版管理',
        'show': true
      },
      'component': 'DesktopManagem'
    },
    {
      'name': 'cloudDesktopmanage',
      'parentId': 2,
      'id': 5,
      'meta': {
        'title': '云桌面管理',
        'show': true
      },
      'component': 'cloudDesktopmanage'
    },
    {
      'name': 'terminalmanage',
      'parentId': 2,
      'id': 6,
      'meta': {
        'title': '终端管理',
        'show': true
      },
      'component': 'terminalmanage'
    },
    {
      'name': 'Desktopuse',
      'parentId': 2,
      'id': 6,
      'meta': {
        'title': '桌面使用情况',
        'show': true
      },
      'component': 'Desktopuse'
    },
    {
      'name': 'Cloud',
      'parentId': 0,
      'id': 3,
      'meta': {
        'icon': 'dashboard',
        'title': '云基础架构',
        'show': true
      },
      'component': 'PageView'
    },
    {
      'name': 'server',
      'parentId': 3,
      'id': 7,
      'meta': {
        'title': '服务器管理',
        'show': true
      },
      'component': 'server'
    },
    {
      'name': 'operating',
      'parentId': 3,
      'id': 8,
      'meta': {
        'title': '操作系统管理',
        'show': true
      },
      'component': 'operating'
    },
    {
      'name': 'config',
      'parentId': 3,
      'id': 9,
      'meta': {
        'title': '配置管理',
        'show': true
      },
      'component': 'config'
    },
    {
      'name': 'network',
      'parentId': 3,
      'id': 8,
      'meta': {
        'title': '网络管理',
        'show': true
      },
      'component': 'network'
    },
    {
      'name': 'system',
      'parentId': 0,
      'id': 4,
      'meta': {
        'icon': 'dashboard',
        'title': '系统',
        'show': true
      },
      'component': 'PageView'
    },
    {
      'name': 'organization',
      'parentId': 4,
      'id': 9,
      'meta': {
        'title': '组织管理',
        'show': true
      },
      'component': 'organization'
    },
    {
      'name': 'role',
      'parentId': 4,
      'id': 10,
      'meta': {
        'title': '角色管理',
        'show': true
      },
      'component': 'role'
    },
    {
      'name': 'user',
      'parentId': 4,
      'id': 11,
      'meta': {
        'title': '用户管理',
        'show': true
      },
      'component': 'user'
    },
    {
      'name': 'SystemSet',
      'parentId': 4,
      'id': 12,
      'meta': {
        'title': '系统设置',
        'show': true
      },
      'component': 'SystemSet'
    },
    {
      'name': 'Log',
      'parentId': 4,
      'id': 13,
      'meta': {
        'title': '日志管理',
        'show': true
      },
      'component': 'Log'
    },
    {
      'name': 'aboutus',
      'parentId': 4,
      'id': 14,
      'meta': {
        'title': '关于我们',
        'show': true
      },
      'component': 'aboutus'
    },
    {
      'name': 'task',
      'parentId': 4,
      'id': 15,
      'meta': {
        'title': '任务管理',
        'show': true
      },
      'component': 'task'
    },
    {
      'name': 'alarm',
      'parentId': 4,
      'id': 16,
      'meta': {
        'title': '警报管理',
        'show': true
      },
      'component': 'alarm'
    },
    {
      'name': 'Authorization',
      'parentId': 4,
      'id': 17,
      'meta': {
        'title': '授权与服务',
        'show': true
      },
      'component': 'Authorization'
    }

  ]
  const json = builder(nav)
  //   console.log('json', json)
  return json
}

Mock.mock(/\/api\/user\/info/, 'get', info)
Mock.mock(/\/api\/user\/nav/, 'get', userNav)
