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
      <a-form
        :form="form"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        <a-form-item label="移除的用户">
          <a-select
            mode="multiple"
            placeholder="请选择移除的用户"
            v-decorator="['Usersids']">
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
            v-decorator="['Groupsisd']">
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
      this.visible = true
      this.record = record
      this.loading = true
      const PolicyList = this.deepGet(await CloudDesktopPolicyList({ desktop_id: this.record.id }), 'data', [])
      this.Group = this.deepGet(PolicyList, 'groups', [])
      this.Users = this.deepGet(PolicyList, 'users', [])
      this.sids = [...this.Group.map(u => u.sid), ...this.Users.map(u => u.sid)]
      this.loading = false
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
        if (!errors) {
            this.confirmLoading = true
            console.log(values.Usersids)
            console.log(values.Groupsisd)
            const RemoveSids = [...values.Usersids, ...values.Groupsisd]
            console.log(RemoveSids)
            const obj = {
                desktop_id: this.record.id,
                sids: [...this.sids].filter(u => [...RemoveSids].every(y => y.sid !== u.sid))
            }
            CloudDesktopPolicyPatch(obj).then(res => {
                this.$message.success('移除成功')
                this.confirmLoading = false
                this.visible = false
                this.$emit('ok')
            }).catch(() => {
                this.confirmLoading = false
                this.visible = false
            })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
