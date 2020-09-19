import request from '@/utils/request'
const desktop = '/desktop.v1.Template'
/**
 * 获取用户组列表
 * @param {data} data
 */
export function DesktopTemplateGroupList (data = { 'root': 0 }) {
  return request.post(`${desktop}/TemplateGroupList`, data)
}
/**
 * 添加用户组列表
 * @param {data} data
 */
export function DesktopTemplateAdd (data) {
  return request.post(`${desktop}/TemplateGroupAdd`, data)
}
/**
 * 修改用户组列表
 * @param {data} data
 */
export function DesktopTemplateEdit (data) {
  return request.post(`${desktop}/TemplateGroupPatch`, data)
}
/**
 * 删除用户组列表
 * @param {data} data
 */
export function DesktopTemplateDelete (data) {
  return request.post(`${desktop}/TemplateGroupDelete`, data)
}
/**
 * 获取所有模版列表
 * @param {data} data
 */
export function DesktopTemplateAllList (data) {
  return request.post(`${desktop}/List`, data)
}
