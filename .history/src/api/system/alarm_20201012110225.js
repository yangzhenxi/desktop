import request from '@/utils/request'

/**
 *  警报列表
 * @param {data} data
 */
export function systemAlertList () {
    return request.post('/system.v1.Alert/List')
}
/**
 *  警报删除
 * @param {data} data
 */
export function systemAlertDelete (data) {
    return request.post('/system.v1.Alert/Delete', data)
}
