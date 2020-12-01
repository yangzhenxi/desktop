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
          label="名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input
            placeholder="请输入名称"
            v-decorator="['newName',
                          { rules: [
                              { required: true, message: '请输入名称！' },
                              { min: 2,max:12, message: '用户组的长度为2-12' },
                              {validator}

                            ],
                            validateFirst: true
                          }]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { usermanageAllUser } from '@/api/CloudDesktop/userManage'
import { mixinFormModal } from '@/utils/mixin'
import { userModifyusergroup } from '@/api/CloudDesktop/usergroup'
import { debounce } from '@/utils/util'
import { UserGroupTree } from '@/utils/validator'

export default {
  mixins: [mixinFormModal],
  name: 'UserManageTabAdd',
  data () {
    return {
      baseDN: null,
    validatorName: [],
    record: {}

    }
  },
  methods: {
    async Edit (record, TPgroupNameList) {
		this.visible = true
		this.record = record
		this.baseDN = record.baseDN
		this.validatorName = TPgroupNameList
		this.$nextTick(() => {
			this.form.setFieldsValue({ newName: record.name })
		})
		this.userAll = []
		this.userAll = this.deepGet(await usermanageAllUser({ name: 'ou=Users,ou=Citrix,dc=cloud,dc=com' }), 'list', [])
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
        if (!errors) {
          this.confirmLoading = true
          values.baseDN = this.baseDN
          userModifyusergroup(values).then((res) => {
            this.$message.success('修改成功')
            this.$emit('ok', values.newName)
            this.visible = false
            this.confirmLoading = false
          })
        }
        this.confirmLoading = false
      })
    },
    // 校验重名称
    validator: debounce(function (rule, value, callback) {
        UserGroupTree({
			data: () => this.validatorName,
			userData: () => this.userAll,
            field: 'name',
            initialValue: this.deepGet(this.record, 'name')
        },
        { rule, value, callback }
        )
      })
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
