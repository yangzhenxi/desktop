import request from '@/utils/request'

/**
 * 角色列表
 * @param {data} data
 */
export function systemRoleList () {
    return request.post('/system.v1.SystemLog/List')
  }
