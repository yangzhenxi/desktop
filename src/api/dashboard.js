import request from '@/utils/request'

/**
 *  获取CPU信息
 * @param {data} data
 */
export function GetCpu () {
    return request.post('/dashboard.v1.Dashboard/CPU')
}

/**
 *  获取内存信息
 * @param {data} data
 */
export function GetMemory () {
    return request.post('/dashboard.v1.Dashboard/Memory')
}
/**
 *  获取存储信息
 * @param {data} data
 */
export function GetStorage () {
    return request.post('/dashboard.v1.Dashboard/Storage')
}
/**
 *  获取AD用户数
 * @param {data} data
 */
export function GetUserCount () {
    return request.post('/dashboard.v1.Dashboard/UserCount')
}
/**
 *  获取云桌面数量
 * @param {data} data
 */
export function GetDesktop () {
    return request.post('/dashboard.v1.Dashboard/Desktop')
}
/**
 *  获取在线人数
 * @param {data} data
 */
export function GetSession () {
    return request.post('/dashboard.v1.Dashboard/Session')
}
