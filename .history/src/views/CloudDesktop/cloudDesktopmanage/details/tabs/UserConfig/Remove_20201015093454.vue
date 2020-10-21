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
        <a-form-item label="添加的用户">
          <a-select
            mode="multiple"
            placeholder="请选择添加的用户"
            v-decorator="['sids', { rules: [{required: true, message: '请选择绑定的用户组'}] }]">
            <a-select-option
              v-for="(i,index) in UserAll"
              :key="index"
              :value="i.objectSid">{{ i.username }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="添加绑定的用户组">
          <a-select
            mode="multiple"
            placeholder="请选择绑定的用户组"
            v-decorator="['sids', { rules: [{required: true, message: '请选择绑定的用户组'}] }]">
            <a-select-option
              v-for="(i,index) in GroupAll"
              :key="index"
              :value="i.objectSid">{{ i.name }}</a-select-option>
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
        Users: []
    }
  },
  methods: {
    async Add (record) {
      this.record = record
      this.Group = this.deepGet(this.deepGet(await CloudDesktopPolicyList({ desktop_id: this.record.id }), 'data', []), 'groups', [])
      this.Users = this.deepGet(this.deepGet(await CloudDesktopPolicyList({ desktop_id: this.record.id }), 'data', []), 'users', [])
      this.visible = true
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
        if (!errors) {
          this.confirmLoading = true
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
