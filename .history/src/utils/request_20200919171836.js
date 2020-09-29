import axios from 'axios'
import store from '@/store'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000 // 请求超时时间
})

const codeMsg = {
    200: '请求成功',
    201: '新建或修改数据成功',
    202: '正在处理流程...',
    204: '删除数据成功',
    400: '请求错误',
    401: '用户验证错误',
    403: 'token 失效',
    404: '服务器找不到请求的资源',
    406: '请求格式错误',
    410: '请求的资源已不存在',
    422: '验证错误',
    500: '服务器错误',
    502: '网关错误',
    503: '服务器维护中',
    504: '网关超时'
  }
// 异常拦截处理器
const errorHandler = (error) => {
    if (error.response) {
     const token = storage.get(ACCESS_TOKEN)
        if (error.response.status === 401) {
          if (token) {
            store.dispatch('Exit').then(() => {
              setTimeout(() => {
                window.location.reload()
              }, 500)
            })
          }
        }
        if (error.response.status >= 400) {
          const message = error.response.status + '  ' + codeMsg[error.response.status]
          const description = error.response.data.msg
          notification.error({ message, description })
        }
      }
      return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  const token = storage.get(ACCESS_TOKEN)
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  return response.data
}, errorHandler)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}
