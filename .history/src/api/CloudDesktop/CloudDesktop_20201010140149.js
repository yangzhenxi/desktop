import request from '@/utils/request'
const desktop = '/desktop.v1.Desktop'
const Host = '/desktop.v1.HostUnit'
const Session = '/desktop.v1.Session'
const Machine = '/desktop.v1.Machine'
const Policy = '/desktop.v1.Machine'
/**
 * 获取桌面列表
 * @param {data} data
 */
export function CloudDesktopTPList (data) {
  return request.post(`${desktop}/List`, data)
}
/**
 * 添加桌面列表
 * @param {data} data
 */
export function CloudDesktopTPAdd (data) {
  return request.post(`${desktop}/Add`, data)
}
/**
 * 获取托管资源
 * @param {data} data
 */
export function CloudDesktopHostList (data) {
  return request.post(`${Host}/List`, data)
}
/**
 * 获取会话列表
 * @param {data} data
 */
export function CloudDesktopSessionList (data) {
  return request.post(`${Session}/List`, data)
}
/**
 * 停止会话列表
 * @param {data} data
 */
export function CloudDesktopSessionStop (data) {
  return request.post(`${Session}/Stop`, data)
}
/**
 * 获取交付组下的桌面
 * @param {data} data
 */
export function CloudDesktopMachineList (data) {
  return request.post(`${Machine}/List`, data)
}
/**
 * 计算机开关机
 * @param {data} data
 */
export function CloudDesktopMachinePower (data) {
  return request.post(`${Machine}/Power`, data)
}
/**
 * 修改计算机的维护模式
 * @param {data} data
 */
export function CloudDesktopMachineSetMaintenanceMode (data) {
  return request.post(`${Machine}/SetMaintenanceMode`, data)
}
/**
 * 云桌面策略相关接口
 * List 获取列表
 * @param {data} data
 */
export function CloudDesktopPolicyList (data) {
  return request.post(`${Policy}/List`, data)
}
/**
 * Patch 修改
 * @param {data} data
 */
export function CloudDesktopPolicyPatch (data) {
  return request.post(`${Policy}/Patch`, data)
}
