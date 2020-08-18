<template>
  <div>
    <a-modal
      title="新建角色信息"
      :width="880"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel">
      <a-form
        :form="form"
        layout="vertical">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="角色类型">
              <a-select
                placeholder="请选择角色类型"
                v-decorator="['nav', { rules: [{ required: true, message: '请选择角色类型' },{validator:this.roleAdmin}] }]">
                <a-select-option
                  v-for="item in navList"
                  :key="deepGet(item, 'id')"
                  :value="deepGet(item, 'id')">{{ deepGet(item, 'name') }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="角色名称">
              <a-input
                placeholder="请输入角色名称"
                v-decorator="['order',
                              { rules: [
                                  { required: true, message: '请输入角色名称' },
                                ],
                                validateFirst: true
                              }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item label="管理权限">
          <s-table
            ref="table"
            :columns="columns"
            :data="loadData">
            <template
              slot="Authority"
              slot-scope="text,recred">
              <a-checkbox-group
                :disabled="disabled"
                :defaultValue="defaultValue"
                :value="defaultValue">
                <a-checkbox
                  v-for="(item,index) in text"
                  :key="index"
                  :value="item.id"
                  :ref="item.id"
                  @change="onChange(recred,item.id)">
                  {{ item.title }}
                </a-checkbox>
              </a-checkbox-group>
            </template>
            <template
              slot="action"
              slot-scope="text,recred">
              <a-checkbox-group
                :defaultValue="AlldefaultValue"
                :value="AlldefaultValue"
                :disabled="disabled">
                <a-checkbox
                  @change="Allchecked(recred)"
                  :ref="recred.name"
                  :value="recred.name">
                  全选
                </a-checkbox>
              </a-checkbox-group>
            </template>
          </s-table>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { mixinFormModal } from '@/utils/mixin'
import { STable } from '@/components'
import { arrayRemoveItem, isContained } from '@/utils/util'

export default {
  mixins: [mixinFormModal],
  components: {
    STable
  },
  data () {
    return {
      defaultValue: [],
      disabled: false,
      AlldefaultValue: [],
      columns: [
        {
          title: '导航名称',
          dataIndex: 'name',
          sorter: true
        },
        {
          title: '权限分配',
          dataIndex: 'Authority',
          sorter: true,
          scopedSlots: { customRender: 'Authority' },
          width: 550
        },
        {
          title: '全选',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          width: 100
        }
      ],
      navList: [
        {
          id: 1,
          name: '无父级导航'
        },
        {
          id: 2,
          name: '超级管理员'
        }
      ],
      loadData: async (parameter) => {
        return new Promise((resolve) => {
          resolve({
            data: [
              {
                key: 111,
                name: '首页',
                Authority: [
                  {
                    id: '1',
                    title: '显示'
                  },
                  {
                    id: '2',
                    title: '查看'
                  },
                  {
                    id: '3',
                    title: '添加'
                  }
                ]
              },
              {
                key: 2222,
                name: '云桌面',
                Authority: [
                  {
                    id: '4',
                    title: '显示'
                  },
                  {
                    id: '5',
                    title: '查看'
                  },
                  {
                    id: '6',
                    title: '在线编辑'
                  }
                ],
                children: [
                  {
                    key: 21,
                    name: '用户管理',
                    Authority: [
                      {
                        id: '7',
                        title: '发布版本'
                      },
                      {
                        id: '8',
                        title: '删除'
                      },
                      {
                        id: '9',
                        title: '在线遍历'
                      }
                    ]
                  },
                  {
                    key: 22,
                    name: '桌面授权管理',
                    Authority: [
                      {
                        id: '10',
                        title: '发布版本'
                      },
                      {
                        id: '11',
                        title: '删除'
                      },
                      {
                        id: '12',
                        title: '在线遍历'
                      }
                    ]
                  },
                  {
                    key: 23,
                    name: '云桌面管理',
                    Authority: [
                      {
                        id: '13',
                        title: '发布版本'
                      },
                      {
                        id: '14',
                        title: '删除'
                      },
                      {
                        id: '15',
                        title: '在线遍历'
                      }
                    ]
                  }
                ]
              },
              {
                key: 3333,
                name: '云基础架构',
                Authority: [
                  {
                    id: '21',
                    title: '发布版本'
                  }
                ],
                children: [
                  {
                    key: 31,
                    name: '服务器管理',
                    Authority: [
                      {
                        id: '16',
                        title: '发布版本'
                      }
                    ]
                  },
                  {
                    key: 32,
                    name: '操作系统管理',
                    Authority: [
                      {
                        id: '17',
                        title: '删除'
                      },
                      {
                        id: '18',
                        title: '在线遍历'
                      }
                    ]
                  },
                  {
                    key: 33,
                    name: '配置管理',
                    Authority: [
                      {
                        id: '19',
                        title: '删除'
                      },
                      {
                        id: '20',
                        title: '在线遍历'
                      }
                    ]
                  }
                ]
              },
              {
                key: 4444,
                name: '系统',
                Authority: [
                  {
                    id: '21',
                    title: '删除'
                  }
                ]
              }
            ],
            pageSize: 10,
            pageNo: 1,
            totalPage: 1,
            totalCount: 0
          })
        }).then((res) => {
          return res
        })
      }
    }
  },
  methods: {
    Add () {
      this.visible = true
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
        if (!errors) {
          console.log(this.defaultValue)
          this.visible = false
        }
      })
    },
    onChange (recred, id) {
      if (!this.$refs[id][0].$children[0].checked) {
        this.defaultValue.push(this.$refs[id][0].value)
      } else {
        this.arrayRemoveItem(this.defaultValue, this.$refs[id][0].value)
        this.arrayRemoveItem(this.AlldefaultValue, recred.name)
      }
      const mapId = recred.Authority.map((u) => u.id)
      if (this.isContained(this.defaultValue, mapId)) {
        this.AlldefaultValue.push(recred.name)
      }
    },
    Allchecked (recred) {
      const mapId = recred.Authority.map((u) => u.id)
      if (!this.$refs[recred.name].$children[0].checked) {
        this.AlldefaultValue.push(recred.name)
        this.defaultValue.push(...mapId)
      } else {
        this.arrayRemoveItem(this.AlldefaultValue, recred.name)
        mapId.forEach((u) => {
          this.arrayRemoveItem(this.defaultValue, u)
        })
      }
    },
    roleAdmin (rule, value, callback) {
      this.disabled = false
      this.defaultValue = []
      this.AlldefaultValue = []
      if (value === 2) {
        this.disabled = true
        this.defaultValue = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21']
        this.AlldefaultValue = ['首页', '云桌面', '用户管理', '桌面授权管理', '云桌面管理', '云基础架构', '服务器管理', '操作系统管理', '配置管理', '系统']
        callback()
      }
      callback()
    },
    arrayRemoveItem,
    isContained
  }
}
</script>

<style>
</style>
