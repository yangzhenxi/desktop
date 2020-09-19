<template>
  <a-modal
    title="修改用户组"
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
import { userModifyusergroup } from '@/api/CloudDesktop/usergroup'

export default {
  mixins: [mixinFormModal],
  name: 'UserManageTabAdd',
  data () {
    return {
      baseDN: null
    }
  },
  methods: {
    Edit (record) {
      this.visible = true
      this.baseDN = record.baseDN
      this.$nextTick(() => {
        this.form.setFieldsValue({ newName: record.name })
      })
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
        if (!errors) {
          this.confirmLoading = true
          values.baseDN = this.baseDN
          userModifyusergroup(values).then((res) => {
            this.$message.success('添加成功')
            this.$emit('ok', res)
            this.visible = false
            this.confirmLoading = false
          })
        }
        this.confirmLoading = false
      })
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.ant-modal-title,/deep/.ant-form-item-required{
  color: white !important;
}
/deep/input#name {
        background: content-box;
        height: 0;
        padding: 1.2em .5em;
        color: white !important;
}
/deep/input#name::first-line{
      color: white;
}
/deep/i.anticon.anticon-close.ant-modal-close-icon {
    color: white;
}
</style>
