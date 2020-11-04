<template>
  <page-header-wrapper :title="false">
    <a-card>
      <a-row :gutter="16">
        <a-col :span="5">
          <a-list
            item-layout="vertical"
            size="large"
            :data-source="roleList">
            <a-list-item
              slot="renderItem"
              key="item.id"
              slot-scope="item"
              :class=" role && role.id === item.id ? 'ant-list-item-active' : ''">
              <a-list-item-meta
                v-if="item.id"
                @click="handelRole(item.id)"> <span slot="title">{{ item.name }}</span></a-list-item-meta>
              <a-list-item-meta
                @click="$refs.Add.Add(roleList)"
                v-else> <span slot="title">{{ item.name }} </span></a-list-item-meta>
              <div
                v-if="item.id"
                slot="extra">
                <a slot="actions">
                  <a-icon
                    class="icon"
                    type="edit"
                    @click="$refs.Edit.Edit(item,roleList)"></a-icon>
                </a>
                <a slot="actions">
                  <a-icon
                    style="margin-left:20px"
                    type="delete"
                    class="icon"
                    @click="DelectRole(item)"></a-icon>
                </a>
              </div>
            </a-list-item>
          </a-list>
        </a-col>
        <a-col :span="5">
          <a-list
            item-layout="vertical"
            size="large"
            :data-source="roleModuleList">
            <a-list-item
              slot="renderItem"
              key="index"
              :class=" module && module === item.module ? 'ant-list-item-active' : ''"
              @click="handelroleModule(item)"
              slot-scope="item">
              {{ item.alias }}
            </a-list-item>
          </a-list>
        </a-col>
        <empty
          v-if="!roleModule.length"
          :isEmpty="!roleModule.length" />
        <a-col
          v-else
          :span="14"
          class="roleList">
          <a-form :form="form">
            <a-form-item
              v-for="(rule,index) in roleModule"
              :key="index">
              <a-row
                :gutter="16"
                type="flex"
                justify="space-between">
                <a-col :span="24">
                  {{ rule.label }}
                </a-col>
              </a-row>
              <a-divider />
              <a-row :gutter="16">
                <a-col :span="24">
                  <a-checkbox
                    :disabled="diasbled"
                    v-if="rule.active.length>0"
                    :indeterminate="rule.indeterminate"
                    @change="onChangeCheckAll($event,rule)"
                    :checked="rule.checkedAll">
                    全选
                  </a-checkbox>
                </a-col>
                <a-col :span="24">
                  <a-checkbox-group
                    :disabled="diasbled"
                    v-model="rule.selected"
                    @change="onChangechecked(rule)">
                    <a-row :gutter="[0,16]">
                      <a-col v-for="(i,indexs) in rule.active" :key="indexs" :span="6">
                        <a-checkbox :value="i">
                          {{ i }}
                        </a-checkbox>
                      </a-col>
                    </a-row>
                  </a-checkbox-group>
                </a-col>
              </a-row>
            </a-form-item>
            <a-form-item :wrapperCol="{span:3,offset:21}">
              <a-button
                type="primary"
                @click="handlesubmit(role)">提交</a-button>
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
    </a-card>
    <add
      ref="Add"
      @ok="loadData()"></add>
    <edit
      ref="Edit"
      @ok="loadData()"></edit>
  </page-header-wrapper>
</template>

<script>
import { mixinTable } from '@/utils/mixin'
import Add from './manage/Add'
import Edit from './manage/Edit'
import Empty from '@/components/Empty'
import {
  systemRoleList,
  systemRoleResourceList,
  systemRoleDelete,
  systemRolePatchPermission,
  systemRoleGet
} from '@/api/system/role'
export default {
  mixins: [mixinTable],
  components: {
    Add,
    Edit,
    Empty
  },
  data () {
    return {
      form: this.$form.createForm(this),
      ruleList: [], // 权限集合
      roleList: [], // 角色集合
      role: {
        // 当前角色
        id: String
      },
      module: null, // 当前模块
      roleModuleList: [], // 模块的权限集合
      roleModule: [], // 当前权限的集合
      indeterminate: true,
      AllroleDataList: [], // 全部权限的数据，没有处理过的
      UpRoleData: {
        // 修改角色权限的数据
        role: {}
      },
      disabled: false
    }
  },
  async created () {
    this.loadData()
  },

  methods: {
    // 删除角色
    DelectRole (record) {
      this.$confirm({
        title: '是否要删除' + record.name + '?',
        content: '点击确定即可删除当前角色',
        onOk: () => {
          const delect = {
            id: record.id
          }
          systemRoleDelete(delect).then((res) => {
            this.$message.success('删除成功')
            this.loadData()
          })
        }
      })
    },
    // 初始化数据
    async loadData (id) {
      const [res0, res1] = await Promise.all(
        [systemRoleResourceList(), systemRoleList()].map((api) => api.catch((e) => []))
      )
      const ruleList = this.deepGet(res0, 'data', [])
      const roleList = this.deepGet(res1, 'data', [])
      // 权限
      const _ruleList = []
      ruleList.map((u) => {
        const alias = this.deepGet(u, 'name').split('-')
        const module = this.deepGet(u, 'module')
        const object = this.deepGet(u, 'object')
        const name = this.deepGet(u, 'name')
        const _rule = _ruleList.find((o) => {
            // if (o.label === alias[1] && o.object === object) {
            //     console.log(o)
            // }
            return o.label === alias[1] && o.module === module
        })
        if (_rule) {
          _rule.active.push(alias[2])
        } else {
          _ruleList.push({
            label: alias[1],
            module,
            name,
            object,
            indeterminate: false,
            checkedAll: false,
            selected: [],
            active: [alias[2]]
          })
        }
        if (!this.roleModuleList.find((o) => o.module === module)) {
          this.roleModuleList.push({
            alias: alias[0],
            module
          })
        }
      })
      this.AllroleDataList = ruleList
      this.ruleList = _ruleList
      this.module = this.roleModuleList[0].module
      this.changeModule()
      // 角色
      const _roleList = roleList.map((u) => u)
      this.role.id = roleList[0].id
      if (id) {
        this.initRole(id)
      } else {
        this.initRole()
      }
      _roleList.push({
        name: '新增'
      })
      this.roleList = _roleList
    },
    // 初始化时第一个角色的详情
    initRole (id) {
      if (id) {
        this.role.id = id
      }
      this.diasbled = false
      systemRoleGet(this.role).then((res) => {
        const _data = res.data.resources
        // 系统管理员
        this.ruleList.forEach((u) => {
          u.selected = []
          this.disabled = false
          u.checkedAll = false
        })
        if (_data.length > 0) {
          if (_data[0].name === 'all' && _data[0].act === '*' && _data[0].module === '*') {
            this.ruleList.forEach((u) => {
              u.selected = u.active
              u.checkedAll = true
              this.diasbled = true
            })
          }
        }
        this.ruleList.forEach((u) => {
          _data.forEach((o) => {
            const alias = o.name.split('-')[2]
            if (u.module === o.module && u.label === o.name.split('-')[1]) {
              u.active.forEach((item) => {
                if (item === alias) {
                  u.selected.push(item)
                  this.onChangechecked(u)
                }
                if (u.selected.toString() === u.active.toString()) {
                  u.checkedAll = true
                }
              })
            }
          })
        })
      })
    },
    // 切换不同用户的详情
    handelRole (id) {
      this.role.id = id
      this.initRole()
    },
    // 切换模块
    handelroleModule (item) {
      this.module = item.module
      this.changeModule()
    },
    // 改变当前模块的数据
    changeModule () {
      this.roleModule = []
      this.ruleList.forEach((u) => {
        if (u.module === this.module) {
          this.roleModule.push(u)
        }
      })
    },
    // 全选按钮
    onChangeCheckAll (e, rule) {
      Object.assign(rule, {
        selected: e.target.checked ? rule.active : [],
        indeterminate: false,
        checkedAll: e.target.checked
      })
    },
    // 按钮
    onChangechecked (rule) {
      rule.indeterminate = !!rule.selected.length && rule.selected.length < rule.active.length
      rule.checkedAll = rule.selected.length >= rule.active.length
    },
    // 修改权限按钮
    handlesubmit (role) {
      this.UpRoleData.role = {
        id: this.role.id,
        resources: []
      }
      this.AllroleDataList.forEach((item) => {
        this.ruleList.forEach((u) => {
          if (u.selected.length > 0 && u.label === item.name.split('-')[1]) {
            u.selected.forEach((o) => {
              if (item.name.split('-')[2] === o) {
                this.UpRoleData.role.resources.push(item)
              }
            })
          }
        })
      })
      systemRolePatchPermission(this.UpRoleData)
        .then((res) => {
          this.$message.success('修改成功')
          this.loadData(this.role.id)
        })
        .catch(() => {
          this.loadData(this.role.id)
        })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ul.ant-list-items {
  text-align: center;
  font-size: 18px;
  border-radius: 20px;
  font-weight: 700;
  color: while;
}
.ant-list-item-active {
  background-color: rgba(24, 144, 255, 0.2);
  opacity: 1;
  border-radius: 10px;
  transition: 0.5s;
}
list-item-active {
  background-color: rgba(24, 144, 255, 0.2);
  opacity: 1;
}
h4.ant-list-item-meta-title,
/deep/ul.ant-list-items,
/deep/.ant-form-item {
  color: wheat !important;
  cursor: pointer;
}

/deep/.lant-list-item:hover {
  background-color: #1890ff33;
  opacity: 1;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.09);
  transition: 0.5s;
}
/deep/.ant-list-vertical .ant-list-item-extra {
  position: absolute;
  right: 0;
  margin-right: 5px;
}
/deep/.ant-list-vertical .ant-list-item-meta,
/deep/h4.ant-list-item-meta-title {
  margin-bottom: 0px;
}
.icon {
  font-size: 20px;
  color: white;
}
.roleList {
  padding-left: 8px;
  padding-right: 8px;
  border-radius: 20px;
  color: white;
  font-weight: 500;
  padding: 10px;
}
/deep/.ant-form-item label {
  position: relative;
  color: white;
}

/deep/.ant-modal-title {
    margin: 0;
    color: white;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    word-wrap: break-word;
}
/deep/i.anticon.anticon-close.ant-modal-close-icon {
    color: white;
}

.ant-checkbox-group {
    width: 100%;
}
</style>
