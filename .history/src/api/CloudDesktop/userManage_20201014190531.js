import request from '@/utils/request'
const desktop = '/desktop.v1.Ad'
/**
 * 获取OU列表
 * @param {data} data
 */
export function usermanageListOU (data = { name: 'ou=Users,ou=Citrix,dc=cloud,dc=com' }) {
  return request.post(`${desktop}/ListOU`, data)
}

/**
 *  获取对应OU下的用户列表
 */
export function usermanageListuser (data) {
    return request.post(`${desktop}/ListUser`, data)
  }

/**
 *  添加OU
 */
export function usermanageAddOu (data) {
    return request.post(`${desktop}/AddOU`, data)
}
/**
 *  修改Ou
 */
export function usermanageEditOu (data) {
    return request.post(`${desktop}/ModifyOU`, data)
}

/**
 *  删除OU
 */
export function usermanageDelOu (data) {
    return request.post(`${desktop}/DelOU`, data)
}

/**
 *  添加的用户
 */
export function usermanageAdduser (data) {
    return request.post(`${desktop}/AddUser`, data)
}
/**
 *  获取当前OU下的单个用户
 */
export function usermanageGetuser (data) {
    return request.post(`${desktop}/GetUser`, data)
}

/**
 *  修改用户信息
 */
export function usermanageEdituser (data) {
    return request.post(`${desktop}/ModifyUser`, data)
}
/**
 *  批量修改用户密码
 */
export function usermanageEditpassword (data) {
    return request.post(`${desktop}/BatchResetPassword`, data)
}

/**
 *  删除用户
 */
export function usermanageDeluser (data) {
    return request.post(`${desktop}/DelUser`, data)
}
/**
 *  批量删除用户
 */
export function usermanageBatchDelUser (data) {
    return request.post(`${desktop}/BatchDelUser`, data)
}

/**
 *  批量删除用户
 */
export function usermanageBatchAddUser (data) {
    return request.post(`${desktop}/BatchAddUser`, data)
}
/**
 *  批量导出用户
 */
export function usermanageExportUser (data) {
    return request.post(`${desktop}/ExportUser`, data)
}
/**
 *  获取全部用户数据
 */
export function usermanageAllUser (data = { 'baseDN': 'ou=Users,ou=Citrix,dc=cloud,dc=com' }) {
    return request.post(`${desktop}/AllUser`, data)
}
