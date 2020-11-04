import request from '@/utils/request'

/**
 *  获取CPU信息
 * @param {data} data
 */
export function systemAboutUs () {
    return request.post('/dashboard.v1.Dashboard/CPU')
}
