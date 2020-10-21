import request from '@/utils/request'
const desktop = '/desktop.v1.Desktop'
const Host = '/desktop.v1.Host'
const Session = '/desktop.v1.Session'
const Machine = '/desktop.v1.Machine'
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
