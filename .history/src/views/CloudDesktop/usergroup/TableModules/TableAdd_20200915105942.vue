<template>
  <a-modal
    title="添加用户"
    :width="700"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    destroyOnClose>
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-transfer
          :data-source="mockData"
          show-search
          :list-style="{
            width: '250px',
            height: '300px',
          }"
          :operations="['移入', '移出']"
          :target-keys="targetKeys"
          :render="item => item.title"
          @change="handleChange">
          <span slot="notFoundContent">
            没数据
          </span>
        </a-transfer>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { mixinFormModal } from '@/utils/mixin'
import { usermanageAllUser } from '@/api/CloudDesktop/userManage'
import { userBatchSetUserGroup } from '@/api/CloudDesktop/usergroup'
export default {
  mixins: [mixinFormModal],
  name: 'UserManageTabAdd',
  data () {
    return {
      mockData: [],
      targetKeys: [],
      movein: [], // 原先选中数据
      moveout: [], // 原先未选中的数据
      flag: Boolean,
      usergroup: {},
      data: { // 接口传参的数据
          req: []
      }
    }
  },
  methods: {
    Add (record, user) {
      this.movein = record
      this.usergroup = user
      this.getMock()
      this.visible = true
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
        if (!errors) {
          this.confirmLoading = true
            this.data.req = []
          this.targetKeys.forEach((u) => {
            this.flag = false
            this.movein.forEach((o) => {
              if (o.baseDN === u) {
                this.flag = true
              }
            })
            if (!this.flag) {
              const obj = {
                baseDN: this.usergroup.baseDN,
                user: u,
                operator: 'add'
              }
              this.req.req.push(obj)
            }
          })

          const left = []
          this.mockData.forEach(u => {
               this.flag = false
              this.targetKeys.forEach(o => {
                  if (u.key === o) {
                      this.flag = true
                  }
              })
              // 现在左边的数据
              if (!this.flag) {
                left.push(u)
              }
          })
            left.forEach(u => {
                this.flag = false
                this.moveout.forEach(o => {
                    if (u.key === o.key) {
                        this.flag = true
                    }
                })
                if (!this.flag) {
                    const obj = {
                        baseDN: this.usergroup.baseDN,
                        user: u.key,
                        operator: 'delete'
                    }
                    this.data.req.push(obj)
                }
            })
          userBatchSetUserGroup(this.data).then((res) => {
            this.$message.success('设置成功')
            this.$emit('ok', res)
            // this.$refs.table.refresh()
          })
        }
        this.confirmLoading = false
      })
    },
    getMock () {
      const targetKeys = []
      const mockData = []
      usermanageAllUser().then((res) => {
        res.list.forEach((u, index) => {
          const obj = {
            key: u.baseDN,
            title: u.username
          }
          this.flag = false
          this.movein.forEach((o) => {
            if (o.baseDN === u.baseDN) {
              this.flag = true
            }
          })
          mockData.push(obj)
          if (this.flag) {
            targetKeys.push(obj.key)
          } else {
              this.moveout.push(obj)
          }
        })
        this.mockData = mockData
        this.targetKeys = targetKeys
      })
    },
    handleChange (targetKeys, direction, moveKeys) {
      console.log(targetKeys, direction, moveKeys)
      this.targetKeys = targetKeys
    },
    getArrDifference (arr1, arr2) {
      return arr1.concat(arr2).filter(function (v, i, arr) {
        return arr.indexOf(v) === arr.lastIndexOf(v)
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/li.ant-transfer-list-content-item {
  color: white;
}
/deep/.ant-transfer-list-header {
  color: white !important;
  background: none;
}
/deep/.ant-transfer-list-search-action .anticon {
  color: white;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
/deep/form.ant-form.ant-form-horizontal {
  display: flex;
  justify-content: center;
}
/deep/.ant-transfer-list-content-item:not(.ant-transfer-list-content-item-disabled):hover {
  background-color: #eeeeee;
  cursor: pointer;
  color: #000;
}
/deep/.ant-transfer-list-body-not-found {
  color: white;
}
</style>
