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
        <a-form-item label="移除的用户">
          <a-select
            mode="multiple"
            placeholder="请选择移除的用户"
            v-decorator="['Usersids', { rules: [{required: true, message: '请选择移除的用户'}] }]">
            <a-select-option
              v-for="(i,index) in Users"
              :key="index"
              :value="i.sid">{{ i.username }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="移除用户组">
          <a-select
            mode="multiple"
            placeholder="请选择要移除用户组"
            v-decorator="['Groupsisd', { rules: [{required: true, message: '请选择要移除用户组'}] }]">
            <a-select-option
              v-for="(i,index) in Group"
              :key="index"
              :value="i.sid">{{ i.name }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { mixinFormModal } from '@/utils/mixin'
import { CloudDesktopPolicyPatch, CloudDesktopPolicyList } from '@/api/CloudDesktop/CloudDesktop'
export default {
  mixins: [mixinFormModal],
  name: 'UserManageTabAdd',
  data () {
    return {
        record: {},
        Group: [],
        Users: [],
        sids: []
    }
  },
  methods: {
    async Add (record) {
      this.record = record
      this.Group = this.deepGet(this.deepGet(await CloudDesktopPolicyList({ desktop_id: this.record.id }), 'data', []), 'groups', [])
      this.Users = this.deepGet(this.deepGet(await CloudDesktopPolicyList({ desktop_id: this.record.id }), 'data', []), 'users', [])
      this.sids = [...this.Group.map(u => u.sid), ...this.Users.map(u => u.sid)]
      this.visible = true
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
        if (!errors) {
            const RemoveSids = [...values.Usersids, ...values.Groupsisd]
            console.log(RemoveSids)
          this.confirmLoading = true
        } else {
          CloudDesktopPolicyPatch()
        }

        this.confirmLoading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
