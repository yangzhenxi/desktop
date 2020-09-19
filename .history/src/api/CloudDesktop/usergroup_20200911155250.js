import request from '@/utils/request'
const desktop = '/desktop.v1.Ad'
/**
 * 获取OU列表
 * @param {data} data
 */
export function usermanageListOU (data = { name: 'ou=Users,ou=Citrix,dc=test,dc=com' }) {
  return request.post(`${desktop}/ListOU`, data)
}
