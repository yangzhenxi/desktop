import storage from 'store'
import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
          login(userInfo)
            .then(response => {
              const result = response.data
              storage.set(ACCESS_TOKEN, result.value, parseInt(result.expired) * 1000)
              commit('SET_TOKEN', result.token)
              resolve()
            })
            .catch(error => {
              reject(error)
            })
        })
      },

    // 获取用户信息
        // 获取用户信息
        GetInfo ({ commit }) {
            return new Promise((resolve, reject) => {
              getInfo()
                .then(response => {
                  // const result = response.result // 角色信息
                  const data = response.data // 角色信息
                  if (data.role && data.role.resources.length > 0) { // 判断该用户是否有role
                    const role = data.role
                    role.resources = data.role.resources
                      let Allarr = []
                      const menuArr = ['dashboard']
                      console.log(role.resources[0].name)
                      if (role.resources[0].name === 'all') {
                          console.log(1)
                           Allarr = ['dashboard', 'usergroup', 'system', 'user', 'role', 'template', 'machine', 'desktop', 'framwork', 'CloudDesktop', 'DesktopManagem', 'cloudDesktopmanage', 'terminalmanage', 'Desktopuse', 'server', 'operating', 'config', 'network', 'user', 'info']
                      } else {
                          console.log(2)
                          role.resources.forEach(u => {
                              if (u.act === 'list') {
                                  menuArr.push(u.object)
                                  menuArr.push(u.module)
                              }
                          })
                      }
                      if (Allarr.length > 0) {
                          role.permissionList = Allarr
                      } else if (menuArr.length > 0) {
                          role.permissionList = menuArr
                      }
                      console.log(role.permissionList)
                    commit('SET_ROLES', data.role)
                    commit('SET_INFO', data)
                  } else {
                    reject(new Error('getInfo: roles must be a non-null array !'))
                  }
                  commit('SET_NAME', { name: data.name, welcome: welcome() })
                  commit('SET_AVATAR', data.avatar)
                  resolve(response)
                })
                .catch(error => {
                  reject(error)
                })
            })
          },

    // 登出
    Logout ({ commit, state }) {
        return new Promise(resolve => {
          logout(state.token)
            .then(() => {
              resolve()
            })
            .catch(() => {
              resolve()
            })
            .finally(() => {
              commit('SET_TOKEN', '')
              commit('SET_ROLES', [])
              storage.remove(ACCESS_TOKEN)
            })
        })
      }
  }
}

export default user
