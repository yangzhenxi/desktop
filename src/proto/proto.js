/* eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars */
'use strict'

var $protobuf = require('protobufjs/light')

var $root = ($protobuf.roots['default'] || ($protobuf.roots['default'] = new $protobuf.Root()))
.addJSON({
  system: {
    nested: {
      v1: {
        options: {
          go_package: 'rpc/system/v1;system_v1'
        },
        nested: {
          Account: {
            methods: {
              Login: {
                requestType: 'AccountLoginReq',
                responseType: 'AccountLoginResp'
              }
            }
          },
          AccountLoginReq: {
            fields: {
              username: {
                type: 'string',
                id: 1
              },
              password: {
                type: 'string',
                id: 2
              }
            }
          },
          AccountLoginResp: {
            fields: {
              code: {
                type: 'int32',
                id: 1
              },
              msg: {
                type: 'string',
                id: 2
              },
              data: {
                type: 'token',
                id: 3
              }
            }
          },
          token: {
            fields: {
              value: {
                type: 'string',
                id: 1
              },
              expired: {
                type: 'int64',
                id: 2
              }
            }
          },
          Department: {
            methods: {
              List: {
                requestType: 'DepartmentListReq',
                responseType: 'DepartmentListResp'
              },
              Add: {
                requestType: 'DepartmentAddReq',
                responseType: 'DepartmentAddResp'
              },
              Delete: {
                requestType: 'DepartmentDeleteReq',
                responseType: 'DepartmentDeleteResp'
              },
              Patch: {
                requestType: 'DepartmentPatchReq',
                responseType: 'DepartmentPatchResp'
              }
            }
          },
          dep: {
            fields: {
              id: {
                type: 'int64',
                id: 1
              },
              name: {
                type: 'string',
                id: 2
              },
              parent: {
                type: 'int64',
                id: 3
              },
              departments: {
                rule: 'repeated',
                type: 'dep',
                id: 4
              },
              description: {
                type: 'string',
                id: 5
              },
              created: {
                type: 'int64',
                id: 6
              }
            }
          },
          DepartmentListReq: {
            fields: {
              root: {
                type: 'int64',
                id: 1
              }
            }
          },
          DepartmentListResp: {
            fields: {
              code: {
                type: 'int32',
                id: 1
              },
              msg: {
                type: 'string',
                id: 2
              },
              data: {
                type: 'dep',
                id: 3
              }
            }
          },
          DepartmentAddReq: {
            fields: {
              department: {
                type: 'dep',
                id: 1
              }
            }
          },
          DepartmentAddResp: {
            fields: {
              code: {
                type: 'int32',
                id: 1
              },
              msg: {
                type: 'string',
                id: 2
              },
              data: {
                type: 'int64',
                id: 3
              }
            }
          },
          DepartmentDeleteReq: {
            fields: {
              id: {
                type: 'int64',
                id: 1
              }
            }
          },
          DepartmentDeleteResp: {
            fields: {
              code: {
                type: 'int32',
                id: 1
              },
              msg: {
                type: 'string',
                id: 2
              }
            }
          },
          DepartmentPatchReq: {
            fields: {
              department: {
                type: 'dep',
                id: 1
              }
            }
          },
          DepartmentPatchResp: {
            fields: {
              code: {
                type: 'int32',
                id: 1
              },
              msg: {
                type: 'string',
                id: 2
              }
            }
          },
          Resource: {
            methods: {
              List: {
                requestType: 'ResourceListReq',
                responseType: 'ResourceListResp'
              }
            }
          },
          res: {
            fields: {
              module: {
                type: 'string',
                id: 1
              },
              object: {
                type: 'string',
                id: 2
              },
              act: {
                type: 'string',
                id: 3
              },
              name: {
                type: 'string',
                id: 4
              }
            }
          },
          ResourceListReq: {
            fields: {}
          },
          ResourceListResp: {
            fields: {
              code: {
                type: 'int32',
                id: 1
              },
              message: {
                type: 'string',
                id: 2
              },
              data: {
                rule: 'repeated',
                type: 'res',
                id: 3
              }
            }
          },
          Role: {
            methods: {
              List: {
                requestType: 'RoleListReq',
                responseType: 'RoleListResp'
              },
              Get: {
                requestType: 'RoleGetReq',
                responseType: 'RoleGetResp'
              },
              Add: {
                requestType: 'RoleAddReq',
                responseType: 'RoleAddResp'
              },
              Patch: {
                requestType: 'RolePatchReq',
                responseType: 'RolePatchResp'
              },
              Delete: {
                requestType: 'RoleDeleteReq',
                responseType: 'RoleDeleteResp'
              },
              PatchPermission: {
                requestType: 'RolePatchPermissionReq',
                responseType: 'RolePatchPermissionResp'
              }
            }
          },
          r: {
            fields: {
              id: {
                type: 'int64',
                id: 1
              },
              name: {
                type: 'string',
                id: 2
              },
              created: {
                type: 'int64',
                id: 3
              },
              resources: {
                rule: 'repeated',
                type: 'res',
                id: 4
              }
            }
          },
          RoleListReq: {
            fields: {}
          },
          RoleListResp: {
            fields: {
              code: {
                type: 'int32',
                id: 1
              },
              message: {
                type: 'string',
                id: 2
              },
              data: {
                rule: 'repeated',
                type: 'r',
                id: 3
              }
            }
          },
          RoleGetReq: {
            fields: {
              id: {
                type: 'int64',
                id: 1
              }
            }
          },
          RoleGetResp: {
            fields: {
              code: {
                type: 'int32',
                id: 1
              },
              message: {
                type: 'string',
                id: 2
              },
              data: {
                type: 'r',
                id: 3
              }
            }
          },
          RoleAddReq: {
            fields: {
              role: {
                type: 'r',
                id: 1
              }
            }
          },
          RoleAddResp: {
            fields: {
              code: {
                type: 'int32',
                id: 1
              },
              message: {
                type: 'string',
                id: 2
              },
              data: {
                type: 'int64',
                id: 3
              }
            }
          },
          RolePatchReq: {
            fields: {
              role: {
                type: 'r',
                id: 1
              }
            }
          },
          RolePatchResp: {
            fields: {
              code: {
                type: 'int32',
                id: 1
              },
              message: {
                type: 'string',
                id: 2
              }
            }
          },
          RoleDeleteReq: {
            fields: {
              id: {
                type: 'int64',
                id: 1
              }
            }
          },
          RoleDeleteResp: {
            fields: {
              code: {
                type: 'int32',
                id: 1
              },
              message: {
                type: 'string',
                id: 2
              }
            }
          },
          RolePatchPermissionReq: {
            fields: {
              role: {
                type: 'r',
                id: 1
              }
            }
          },
          RolePatchPermissionResp: {
            fields: {
              code: {
                type: 'int32',
                id: 1
              },
              message: {
                type: 'string',
                id: 2
              }
            }
          },
          User: {
            methods: {
              List: {
                requestType: 'UserListReq',
                responseType: 'UserListResp'
              },
              Get: {
                requestType: 'UserGetReq',
                responseType: 'UserGetResp'
              },
              Add: {
                requestType: 'UserAddReq',
                responseType: 'UserAddResp'
              },
              Delete: {
                requestType: 'UserDeleteReq',
                responseType: 'UserDeleteResp'
              },
              Patch: {
                requestType: 'UserPatchReq',
                responseType: 'UserPatchResp'
              },
              ResetPassword: {
                requestType: 'UserResetPasswordReq',
                responseType: 'UserResetPasswordResp'
              },
              Info: {
                requestType: 'UserInfoReq',
                responseType: 'UserInfoResp'
              },
              PatchPassword: {
                requestType: 'UserPatchPasswordReq',
                responseType: 'UserPatchPasswordResp'
              },
              Logout: {
                requestType: 'UserLogoutReq',
                responseType: 'UserLogoutResp'
              }
            }
          },
          u: {
            fields: {
              id: {
                type: 'int64',
                id: 1
              },
              username: {
                type: 'string',
                id: 2
              },
              name: {
                type: 'string',
                id: 3
              },
              phone: {
                type: 'string',
                id: 4
              },
              mail: {
                type: 'string',
                id: 5
              },
              locked: {
                type: 'bool',
                id: 6
              },
              created: {
                type: 'int64',
                id: 7
              },
              departmentId: {
                type: 'int64',
                id: 8
              },
              roleId: {
                type: 'int64',
                id: 9
              },
              department: {
                type: 'dep',
                id: 10
              },
              role: {
                type: 'r',
                id: 11
              }
            }
          },
          UserListReq: {
            fields: {
              page: {
                type: 'int32',
                id: 1
              },
              size: {
                type: 'int32',
                id: 2
              }
            }
          },
          UserListResp: {
            fields: {
              code: {
                type: 'int32',
                id: 1
              },
              msg: {
                type: 'string',
                id: 2
              },
              data: {
                type: 'users',
                id: 3
              }
            },
            nested: {
              users: {
                fields: {
                  total: {
                    type: 'int64',
                    id: 1
                  },
                  users: {
                    rule: 'repeated',
                    type: 'u',
                    id: 2
                  }
                }
              }
            }
          },
          UserGetReq: {
            fields: {
              id: {
                type: 'int64',
                id: 1
              }
            }
          },
          UserGetResp: {
            fields: {
              code: {
                type: 'int32',
                id: 1
              },
              msg: {
                type: 'string',
                id: 2
              },
              data: {
                type: 'u',
                id: 3
              }
            }
          },
          UserAddReq: {
            fields: {
              user: {
                type: 'u',
                id: 1
              }
            }
          },
          UserAddResp: {
            fields: {
              code: {
                type: 'int32',
                id: 1
              },
              msg: {
                type: 'string',
                id: 2
              },
              data: {
                type: 'int64',
                id: 3
              }
            }
          },
          UserDeleteReq: {
            fields: {
              id: {
                type: 'int64',
                id: 1
              }
            }
          },
          UserDeleteResp: {
            fields: {
              code: {
                type: 'int32',
                id: 1
              },
              msg: {
                type: 'string',
                id: 2
              }
            }
          },
          UserPatchReq: {
            fields: {
              user: {
                type: 'u',
                id: 1
              }
            }
          },
          UserPatchResp: {
            fields: {
              code: {
                type: 'int32',
                id: 1
              },
              msg: {
                type: 'string',
                id: 2
              }
            }
          },
          UserResetPasswordReq: {
            fields: {
              id: {
                type: 'int64',
                id: 1
              }
            }
          },
          UserResetPasswordResp: {
            fields: {
              code: {
                type: 'int32',
                id: 1
              },
              msg: {
                type: 'string',
                id: 2
              }
            }
          },
          UserInfoReq: {
            fields: {}
          },
          UserInfoResp: {
            fields: {
              code: {
                type: 'int32',
                id: 1
              },
              msg: {
                type: 'string',
                id: 2
              },
              data: {
                type: 'u',
                id: 3
              }
            }
          },
          UserPatchPasswordReq: {
            fields: {
              old: {
                type: 'string',
                id: 1
              },
              'new': {
                type: 'string',
                id: 2
              }
            }
          },
          UserPatchPasswordResp: {
            fields: {
              code: {
                type: 'int32',
                id: 1
              },
              msg: {
                type: 'string',
                id: 2
              }
            }
          },
          UserLogoutReq: {
            fields: {}
          },
          UserLogoutResp: {
            fields: {
              code: {
                type: 'int32',
                id: 1
              },
              msg: {
                type: 'string',
                id: 2
              }
            }
          }
        }
      }
    }
  }
})

module.exports = $root
