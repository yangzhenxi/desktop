import request from '@/utils/request'

/**
 * 获取OU列表
 * @param {data} data
 */
export function usermanageListOU (data = { name: 'ou=test3,ou=Citrix,dc=test,dc=com' }) {
  return request.post(`/ad.v1.Ad/ListOU`, data)
}

/**
 *  获取对应OU下的用户列表
 */
export function usermanageListuser (data) {
    return request.post(`/ad.v1.Ad/ListUser`, data)
  }
