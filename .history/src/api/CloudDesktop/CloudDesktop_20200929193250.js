import request from '@/utils/request'
const desktop = '/desktop.v1.Desktop'
/**
 * 获取桌面列表
 * @param {data} data
 */
export function usermanageListusergroup (data = { name: 'ou=Group,ou=Citrix,dc=cloud,dc=com' }) {
  return request.post(`${desktop}/List`, data)
}
