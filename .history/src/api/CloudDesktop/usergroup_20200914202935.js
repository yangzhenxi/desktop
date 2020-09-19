import request from '@/utils/request'
const desktop = '/desktop.v1.Ad'
/**
 * 获取用户组列表
 * @param {data} data
 */
export function usermanageListusergroup (data = { name: 'ou=Group,ou=Citrix,dc=test,dc=com' }) {
  return request.post(`${desktop}/ListUserGroup`, data)
}
/**
 * 添加用户组
 * @param {data} data
 */
export function usermanageAddusergroup (data) {
  return request.post(`${desktop}/AddUserGroup`, data)
}
/**
 * 添加用户组
 * @param {data} data
 */
export function userModifyusergroup (data) {
  return request.post(`${desktop}/ModifyUserGroup`, data)
}
/**
 * 删除用户组
 * @param {data} data
 */
export function userDelUserGroup (data) {
  return request.post(`${desktop}/DelUserGroup`, data)
}
/**
 * 用户组设置用户
 * @param {data} data
 */
export function userSetUserGroup (data) {
  return request.post(`${desktop}/DelUserGroup`, data)
}
