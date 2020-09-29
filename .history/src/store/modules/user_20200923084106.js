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
          //   role.permissions = data.role.resources
          //   console.log(role.permissions)
          //   role.permissions.map(per => {
          //     if (per.actionEntitySet != null && per.actionEntitySet.length > 0) { // 判断该用户的权限是否存在
          //       const action = per.actionEntitySet.map(action => {
          //         return action.action
          //       })
          //       per.actionList = action // 所有页面的权限
          //     }
          //   })
              let Allarr = []
              const menuArr = ['dashboard']
              if (role.resources[0].name === 'all') {
                   Allarr = ['dashboard', 'usergroup', 'system', 'user', 'role', 'template', 'machine', 'desktop', 'framwork', 'CloudDesktop', 'DesktopManagem', 'cloudDesktopmanage', 'terminalmanage', 'Desktopuse', 'server', 'operating', 'config', 'network', 'user', 'info']
              } else {
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
  