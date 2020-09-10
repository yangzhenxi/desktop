import request from '@/utils/request'

/**
 * 用户列表
 * @param {data} data
 */
export function systemUserList () {
    return request.post('/system.v1.User/List')
}
/**
 * 添加用户
 * @param {data} data
 */
export function systemUserAdd (data) {
    return request.post('/system.v1.User/Add', data)
}
/**
 * 修改用户
 * @param {data} data
 */
export function systemUserPatch (data) {
    return request.post('/system.v1.User/Patch', data)
}
/**
 * 删除用户
 * @param {data} data
 */
export function systemUserDelete (data) {
    return request.post('/system.v1.User/Delete', data)
}
/**
 * 重置用户密码
 * @param {data} data
 */
export function systemUserResetPassword (data) {
    return request.post('/system.v1.User/ResetPassword', data)
}

/**
 * 个人详细信息
 * @param {data} data
 */
export function systemUserInfo (data) {
    return request.post('/system.v1.User/Info', data)
}

/**
 * 修改用户密码
 * @param {data} data
 */
export function systemUserPatchPassword (data) {
    return request.post('/system.v1.User/PatchPassword', data)
}
/**
 * 退出登录
 * @param {data} data
 */
export function systemUserLogout (data) {
    return request.post('/system.v1.User/Logout', data)
}
