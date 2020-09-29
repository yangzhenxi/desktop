import request from '@/utils/request'
const desktop = '/desktop.v1.Desktop'
/**
 * 获取桌面列表
 * @param {data} data
 */
export function CloudDesktopTPList (data) {
  return request.post(`${desktop}/List`, data)
}
