<template>
  <a-modal
    title="绑定用户组"
    :width="640"
    :visible="visible"
    :confirm-loading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    destroyOnClose>
    <a-spin :spinning="loading">
      <a-form
        :form="form"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol">
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
import { usermanageListusergroup } from '@/api/CloudDesktop/usergroup'

export default {
    mixins: [mixinFormModal],
    data () {
        return {
            GroupAll: [],
            record: {},
            loading: false,
            confirmLoading: false,
            oldSid: []
        }
    },
    methods: {
        async Add (record) {
          this.visible = true
          this.loading = true
          this.record = record
          const GroupAll = this.deepGet(await usermanageListusergroup(), 'group', [])
          let Group = this.deepGet(this.deepGet(await CloudDesktopPolicyList({ desktop_id: this.record.id }), 'data', []), 'groups', [])
          let Users = this.deepGet(this.deepGet(await CloudDesktopPolicyList({ desktop_id: this.record.id }), 'data', []), 'users', []).map(u => {

          })
          this.GroupAll = [...GroupAll].filter(u => [...Group].every(y => y.objectSid !== u.sid))
          Group = Group.find(u => u.sid)
          if (!Group) Group = []
          if (!Users) Users = []
          this.oldSid = [...Group, ...Users]
          this.loading = false
        },
        handleSubmit () {
            this.confirmLoading = true
            this.form.validateFields(async (errors, values) => {
                if (!errors) {
                    const obj = {
                        desktop_id: this.record.id
                    }
                    obj.sids.push(...this.oldSid, ...values.sids)
                    CloudDesktopPolicyPatch(obj)
                        .then(res => {
                            this.$message.success('添加成功')
                            this.$emit('ok', res)
                            this.visible = false
                            this.confirmLoading = false
                        })
                        .catch(err => {
                            this.confirmLoading = false
                            return err
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
