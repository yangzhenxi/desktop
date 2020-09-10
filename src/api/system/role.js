import request from '@/utils/request'

/**
 * 角色列表
 * @param {data} data
 */
export function systemRoleList () {
    return request.post('/system.v1.Role/List')
  }
/**
 * 查看角色详情
 * @param {data} data
 */
export function systemRoleGet (data) {
    return request.post('/system.v1.Role/Get', data)
  }
/**
 * 添加角色
 * @param {data} data
 */
export function systemRoleAdd (data) {
    return request.post('/system.v1.Role/Add', data)
  }
/**
 * 角色修改
 * @param {data} data
 */
export function systemRolePatch (data) {
    return request.post('/system.v1.Role/Patch', data)
  }
/**
 * 角色删除
 * @param {data} data
 */
export function systemRoleDelete (data) {
    return request.post('/system.v1.Role/Delete', data)
}
/**
 * 角色权限修改
 * @param {data} data
 */
export function systemRolePatchPermission (data) {
    return request.post('/system.v1.Role/PatchPermission', data)
}
/**
 * 获取资源
 * @param {data} data
 */
export function systemRoleResourceList () {
    return request.post('/system.v1.Resource/List')
}
