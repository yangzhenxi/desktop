<template>
  <a-modal
    title="修改组织单位"
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
                              { min: 2,max:12, message: '组的长度为2-12' },
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
import { usermanageEditOu } from '@/api/CloudDesktop/userManage'
import { debounce } from '@/utils/util'
import { TreeValidator } from '@/utils/validator'

export default {
  mixins: [mixinFormModal],
  name: 'UserManageTabEdit',
  data () {
    return {
      baseDN: null,
      record: {},
      validatorName: []
    }
  },
  methods: {
    async Edit (record, TPgroupNameList) {
      this.visible = true
      this.baseDN = null
      this.validatorName = []
      this.validatorName = TPgroupNameList
      this.baseDN = record.dn
      this.record = record
      console.log(this.record)
      this.$nextTick(() => {
        this.form.setFieldsValue({ newName: record.name })
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
    // 校验重名称
    validator: debounce(function (rule, value, callback) {
        TreeValidator({
            data: () => {
                try {
                    const data = this.validatorName
                    return data
                } catch (error) {
                    return []
                }
            },
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
/deep/input#name {
        background: content-box;
        height: 0;
        padding: 1.2em .5em;
        color: white !important;
}
/deep/input#name::first-line{
      color: white;
}
</style>
