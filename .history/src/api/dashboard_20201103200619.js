import request from '@/utils/request'

/**
 *  获取CPU信息
 * @param {data} data
 */
export function GetCpu () {
    return request.post('/dashboard.v1.Dashboard/CPU')
}

/**
 *  获取CPU信息
 * @param {data} data
 */
export function GetMemory () {
    return request.post('/dashboard.v1.Dashboard/Memory')
}
/**
 *  获取CPU信息
 * @param {data} data
 */
export function GetStorage () {
    return request.post('/dashboard.v1.Dashboard/Storage')
}
