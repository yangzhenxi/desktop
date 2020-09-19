<template>
  <a-modal
    title="编辑组"
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
            v-decorator="['name',
                          { rules: [
                              { required: true, message: '请输入名称！' }
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
import { nameRepeatValidator } from '@/utils/validator'
import { debounce } from '@/utils/util'
import { DesktopTemplateEdit } from '@/api/CloudDesktop/DesktopManagem'

export default {
  mixins: [mixinFormModal],
  name: 'UserManageTabAdd',
  data () {
    return {
        record: {},
        validatorName: []
    }
  },
  methods: {
    Edit (record, TPgroupNameList) {
      this.visible = true
        this.record = record
      this.validatorName = TPgroupNameList

    this.$nextTick(() => {
        this.form.setFieldsValue({ name: record.title })
      })
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
        if (!errors) {
            const obj = {
                group: {
                    'name': values.name,
                    'id': this.record.key
                }
            }
            DesktopTemplateEdit(obj).then(res => {
                this.$message.success('修改成功')
                this.$emit('ok', res)
            })
          this.confirmLoading = true
          this.visible = false
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
    },
    onChange (checked) {
      console.log(`a-switch to ${checked}`)
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
.ant-form-vertical .ant-form-item {
  padding-bottom: 0px;
  margin-bottom: 10px;
}
/deep/.ant-modal-header {
  background: none;
}
/deep/.ant-modal-title,
/deep/.ant-form-item-required {
  color: white !important;
}
/deep/.ant-modal-content {
  background:#272E48;
  color: white;
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
</style>
