<template>
  <a-modal
    title="新增组织单位"
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
            v-decorator="['name',
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
import { usermanageAddOu } from '@/api/CloudDesktop/userManage'
import { TreeValidator } from '@/utils/validator'
import { debounce } from '@/utils/util'
export default {
  mixins: [mixinFormModal],
  name: 'UserManageTabAdd',
  data () {
    return {
      baseDN: null,
      validatorName: []
    }
  },
  methods: {
    async add (record, TPgroupNameList) {
		console.log(record)
      this.visible = true
      this.baseDN = null
      this.validatorName = []
      this.validatorName = TPgroupNameList
      this.baseDN = record.dn
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
        if (!errors) {
          this.confirmLoading = true
          values.baseDN = this.baseDN
          usermanageAddOu(values)
            .then((res) => {
              this.$message.success('添加成功')
              this.$emit('ok', res)
              this.visible = false
              this.confirmLoading = false
            })
            .catch((err) => {
              this.confirmLoading = false
              return err
            })
        }
      })
    },
    // 校验重名称
    validator: debounce(function (rule, value, callback) {
      TreeValidator(
        {
          data: () => {
            try {
                console.log(value)
              const data = this.validatorName
              return data
            } catch (error) {
              return []
            }
          },
          field: 'name'
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
  padding: 1.2em 0.5em;
  color: white !important;
}
/deep/input#name::first-line {
  color: white;
}

</style>
