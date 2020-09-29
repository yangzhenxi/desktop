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
import { mixinFormModal } from '@/utils/mixin'
import { userModifyusergroup } from '@/api/CloudDesktop/usergroup'
import { debounce } from '@/utils/util'
import { nameRepeatValidator } from '@/utils/validator'

export default {
  mixins: [mixinFormModal],
  name: 'UserManageTabAdd',
  data () {
    return {
      baseDN: null,
    validatorName: [],
    record: []

    }
  },
  methods: {
    Edit (record, TPgroupNameList) {
      this.visible = true
      this.baseDN = record.baseDN
      this.validatorName = TPgroupNameList
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
                // 校验重名称
    validator: debounce(function (rule, value, callback) {
        nameRepeatValidator({
            data: () => {
                try {
                    const data = this.validatorName
                    return data
                } catch (error) {
                    return []
                }
            },
            field: 'name',
            initialValue: this.deepGet(this.record, 'title')
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
