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
export function DesktopTemplateGroupAdd (data) {
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
export function DesktopTemplateGroupDelete (data) {
  return request.post(`${desktop}/TemplateGroupDelete`, data)
}
/**
 * 获取所有模版列表
 * @param {data} data
 */
export function DesktopTemplateAllList (data) {
  return request.post(`${desktop}/List`, data)
}
/**
 * 获取版本列表
 * @param {data} data
 */
export function DesktopTemplateVersionList (data) {
  return request.post(`${desktop}/VersionList`, data)
}
/**
 * 修改版本信息
 * @param {data} data
 */
export function DesktopTemplateVersionPatch (data) {
  return request.post(`${desktop}/VersionPatch`, data)
}
/**
 * 修改版本信息
 * @param {data} data
 */
export function DesktopTemplateVersionDelete (data) {
  return request.post(`${desktop}/VersionDelete`, data)
}
/**
 * 还原版本
 * @param {data} data
 */
export function DesktopTemplateVersionRevert (data) {
  return request.post(`${desktop}/VersionRevert`, data)
}
/**
 * 合并版本
 * @param {data} data
 */
export function DesktopTemplateVersionMerge (data) {
  return request.post(`${desktop}/VersionMerge`, data)
}
/**
 * 发布模版
 * @param {data} data
 */
export function DesktopTemplatePublish (data) {
  return request.post(`${desktop}/Publish`, data)
}
/**
 * 在线编辑
 * @param {data} data
 */
export function DesktopTemplatePatch (data) {
  return request.post(`${desktop}/Patch`, data)
}
/**
 * 创建模版
 * @param {data} data
 */
export function DesktopTemplateAdd (data) {
  return request.post(`${desktop}/Add`, data)
}
/**
 * 创建模版
 * @param {data} data
 */
export function DesktopTemplateDelete (data) {
  return request.post(`${desktop}/Delete`, data)
}
/**
 * 配置硬件
 * @param {data} data
 */
export function DesktopTemplateConfigure (data) {
  return request.post(`${desktop}/Configure`, data)
}
/**
 * 获取所有的数据中心
 * @param {data} data
 */
export function DesktopTemplateDataCenterList (data) {
  return request.post(`${desktop}/DataCenterList`, data)
}
/**
 * 获取所有的系统镜像
 * @param {data} data
 */
export function DesktopTemplateImageList (data) {
  return request.post(`${desktop}/ImageList`, data)
}
