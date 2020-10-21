<template>
  <a-modal
    title="绑定用户"
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
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { mixinFormModal } from '@/utils/mixin'
import { CloudDesktopPolicyPatch, CloudDesktopPolicyList } from '@/api/CloudDesktop/CloudDesktop'
import { usermanageAllUser } from '@/api/CloudDesktop/userManage'
export default {
    mixins: [mixinFormModal],
    data () {
        return {
            UserAll: [],
            record: {},
            oldSid: [],
            confirmLoading: false
        }
    },
    methods: {
        async Add (record) {
          this.visible = true
          this.loading = true
          this.record = record
           const UserAll = this.deepGet(await usermanageAllUser(), 'list', [])
          let Users = this.deepGet(this.deepGet(await CloudDesktopPolicyList({ desktop_id: this.record.id }), 'data', []), 'users', [])
          const Group = this.deepGet(this.deepGet(await CloudDesktopPolicyList({ desktop_id: this.record.id }), 'data', []), 'groups', []).find(u => u.sid)
          this.UserAll = [...UserAll].filter(u => [...Users].every(y => y.objectSid !== u.sid))
            Users = Users.find(u => u.sid)
          this.oldSid = [...Group, ...Users]
        //   console.log(Group)
        //   console.log(Users)
          this.loading = false
        },
        handleSubmit () {
            this.confirmLoading = true
            this.form.validateFields(async (errors, values) => {
                if (!errors) {
                    values.desktop_id = this.record.id
                    values.sids.push(...this.oldSid)
                    CloudDesktopPolicyPatch(values)
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
