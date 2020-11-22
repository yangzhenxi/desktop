import request from '@/utils/request'

/**
 *  获取VC地址
 * @param {data} data
 */
export function VcUrl () {
    return request.post('/desktop.v1.Template/VcUrl')
}
