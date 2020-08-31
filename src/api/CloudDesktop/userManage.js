import request from '@/utils/request'
const desktop = '/desktop.v1.Ad'
/**
 * 获取OU列表
 * @param {data} data
 */
export function usermanageListOU (data = { name: 'ou=Users,ou=Citrix,dc=test,dc=com' }) {
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
 *  修改Ou
 */
export function usermanageDelOu (data) {
    return request.post(`${desktop}/DelOU`, data)
}

/**
 *  添加用户
 */
export function usermanageAdduser (data) {
    return request.post(`${desktop}/AddUser`, data)
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
