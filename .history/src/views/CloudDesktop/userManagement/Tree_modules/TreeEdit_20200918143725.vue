<template>
  <a-modal
    title="桌面用户组-修改组"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    destroyOnClose>
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-form-item
          label="姓名"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input
            placeholder="请输入名称"
            v-decorator="['newName',
                          { rules: [
                              { required: true, message: '请输入名称！' },
                            ],
                            validateFirst: true
                          }]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { mixinFormModal } from '@/utils/mixin'
import { usermanageEditOu } from '@/api/CloudDesktop/userManage'

export default {
  mixins: [mixinFormModal],
  name: 'UserManageTabAdd',
  data () {
    return {
baseDN: null
    }
  },
  methods: {
    Edit (record, treeeventObj) {
      this.visible = true
      this.baseDN = null
      this.baseDN = record.name
      this.$nextTick(() => {
        this.form.setFieldsValue({ newName: treeeventObj.title })
      })
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
        if (!errors) {
            this.confirmLoading = true
            values.baseDN = this.baseDN
            usermanageEditOu(values).then(res => {
                this.$message.success('修改成功')
                this.$emit('ok')
                this.visible = false
                this.confirmLoading = false
            }).catch(() => {
                this.confirmLoading = false
            })
        }
      })
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>

<style>
</style>
