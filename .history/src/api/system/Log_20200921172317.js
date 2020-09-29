import request from '@/utils/request'

/**
 * 获取用户日志
 * @param {data} data
 */
export function systemLogList (data) {
    return request.post('/system.v1.SystemLog/List', data)
  }
/**
 * 批量删除用户
 * @param {data} data
 */
export function systemLogList (data) {
    return request.post('/system.v1.SystemLog/List', data)
  }
