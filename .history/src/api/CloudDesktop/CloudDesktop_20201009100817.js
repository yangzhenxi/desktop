import request from '@/utils/request'
const desktop = '/desktop.v1.Desktop'
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
export function CloudDesktopTPAdd (data) {
  return request.post(`${desktop}/Add`, data)
}
