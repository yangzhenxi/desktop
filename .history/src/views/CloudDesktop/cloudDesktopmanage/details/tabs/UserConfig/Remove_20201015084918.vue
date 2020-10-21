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
          :titles="['全部用户', '设置'+usergroup.name+'的用户']"
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
      disabled: [],
      data: {
        // 接口传参的数据
        req: []
      }
    }
  },
  methods: {
    Add (record, user, Allusers) {
      this.moveout = []
      this.movein = []
      this.disabled = []
      this.usergroup = {}
      this.movein = record
      this.usergroup = user
      Allusers.forEach((u) => {
        this.flag = false
        record.forEach((o) => {
          if (u.baseDN === o.baseDN) {
            this.flag = true
          }
        })
        if (!this.flag) {
          this.disabled.push(u)
        }
      })
      this.getMock()
      this.visible = true
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
        if (!errors) {
          this.confirmLoading = true
          this.data.req = []
          // 查找添加的用户
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
              this.data.req.push(obj)
            }
          })
          // 查找现在左边的数据
          const left = []
          this.mockData.forEach((u) => {
            this.flag = false
            this.targetKeys.forEach((o) => {
              if (u.key === o) {
                this.flag = true
              }
            })
            // 现在左边的数据
            if (!this.flag) {
              left.push(u)
            }
          })
          // 查找要移除的用户
          left.forEach((u) => {
            this.flag = false
            this.moveout.forEach((o) => {
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
          // 执行接口
          userBatchSetUserGroup(this.data).then((res) => {
            this.$message.success('设置成功')
            this.visible = false
            this.$emit('ok', res)
          })
        }
        this.confirmLoading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
