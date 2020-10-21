import request from '@/utils/request'

/**
 *  关于我们
 * @param {data} data
 */
export function systemAboutUs () {
    return request.post('/system.v1.aboutUs/Get')
  }
