<template>
  <div>
    <a-modal
      title="修改角色信息"
      :width="640"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel">
      <a-form :form="form">
        <a-form-item
          label="角色名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input
            placeholder="请输入角色名称"
            v-decorator="['name',
                          { rules: [
                              { required: true, message: '请输入角色名称' },
                              { min: 2,max:6, message: '名称长度为2-6个字符' },
                              { validator }],
                            validateFirst: true
                          }]" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { mixinFormModal } from '@/utils/mixin'
import { systemRolePatch } from '@/api/system/role'
import { nameRepeatValidator } from '@/utils/validator'
import { debounce } from '@/utils/util'

export default {
  mixins: [mixinFormModal],
  data () {
    return {
        record: []
    }
  },
  methods: {
    Edit (item) {
        this.$nextTick(() => {
        setTimeout(() => {
          this.form.setFieldsValue(
            this.pick(item, ['name'])
          )
        })
      })
        this.record = item
        this.visible = true
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
        if (!errors) {
          this.confirmLoading = true
          const obj = {
            role: {
              name: values.name,
              id: this.record.id
            }
          }
          systemRolePatch(obj)
            .then((res) => {
              this.$message.success('修改成功')
              this.confirmLoading = false
              this.$emit('ok', res)
              this.visible = false
            })
            .catch(() => {
              this.confirmLoading = false
            })
        }
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
/deep/.ant-checkbox-wrapper {
  color: white !important;
}
/deep/.ant-form-item-label > label {
  color: white !important;
}
</style>
