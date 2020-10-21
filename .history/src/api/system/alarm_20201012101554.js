import request from '@/utils/request'

/**
 *  警报列表
 * @param {data} data
 */
export function systemAlertList () {
    return request.post('/system.v1.Alert/List')
  }
/**
 *  警报列表
 * @param {data} data
 */
export function systemAlertDelete () {
    return request.post('/system.v1.Alert/Delete')
  }
