<template>
  <div>
    <a-modal
      title="编辑云桌面"
      :width="640"
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
          <a-form-item
            label="桌面名称"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol">
            <a-input placeholder="请输入桌面名称" v-decorator="['name', { rules: [{required: true, message: '请输入桌面名称'}] }]" />
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>
  </div>

</template>

<script>
import { debounce } from '@/utils/util'
import { mixinFormModal } from '@/utils/mixin'
import { TreeValidator } from '@/utils/validator'
import { CloudDesktopTPPatch } from '@/api/CloudDesktop/CloudDesktop'
export default {
  mixins: [mixinFormModal],
  name: 'UserManageTabAdd',
  data () {
    return {
        record: Object
    }
  },
  methods: {
    Edit (record) {
      this.record = record
      this.visible = true
      this.$nextTick(() => {
          this.form.setFieldsValue({
              name: this.record.name
          })
      })
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
          this.confirmLoading = true
        if (!errors) {
            values.id = this.record.id
            try {
                await CloudDesktopTPPatch(values)
                this.$message.success('修改成功')
                this.confirmLoading = false
                this.$emit('ok', values.name)
            } catch {
                this.$message.error('修改失败')
                this.confirmLoading = false
            }
          this.visible = false
        }
      })
    },
            //                 // 校验重名称
    validator: debounce(function (rule, value, callback) {
            TreeValidator(
                {
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
/deep/.ant-modal-content {
  background:#272E48;
  color: white;
}
/deep/.ant-modal-title,
/deep/.ant-modal-close-x,
/deep/.ant-form-item-required {
  color: white;
}
/deep/.ant-modal-header {
  background: none;
}
.container {
  margin-top: 40px;
  border: 1px solid #cccccc;
  border-radius: 5px;
}
/deep/input#versionName {
        background: content-box;
        height: 0;
        padding: 1.2em .5em;
        color: white !important;
}
/deep/input#versionName::first-line{
      color: white;
}
/deep/input.ant-input-number-input,label.ant-radio-wrapper {
    color: white;
}

</style>
