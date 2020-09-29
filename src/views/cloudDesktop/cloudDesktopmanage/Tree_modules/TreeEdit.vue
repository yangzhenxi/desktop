<template>
  <a-modal
    title="修改桌面"
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
// import { usermanageEditOu } from '@/api/CloudDesktop/userManage'
// import { debounce } from '@/utils/util'
// import { nameRepeatValidator } from '@/utils/validator'

export default {
  mixins: [mixinFormModal],
  name: 'UserManageTabEdit',
  data () {
    return {
baseDN: null
    }
  },
  methods: {
    Edit (record, treeeventObj, TPgroupNameList) {
      this.visible = true
    //   this.baseDN = null
    //   this.baseDN = record.name
    //   this.validatorName = TPgroupNameList

      this.$nextTick(() => {
        this.form.setFieldsValue({ newName: treeeventObj.title })
      })
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
        if (!errors) {
            this.confirmLoading = true
            values.baseDN = this.baseDN
            // usermanageEditOu(values).then(res => {
            //     this.$message.success('修改成功')
            //     this.$emit('ok')
            //     this.visible = false
            //     this.confirmLoading = false
            // }).catch(() => {
            //     this.confirmLoading = false
            // })
        }
      })
    }
    //                 // 校验重名称
    // validator: debounce(function (rule, value, callback) {
    //     nameRepeatValidator({
    //         data: () => {
    //             try {
    //                 const data = this.validatorName
    //                 return data
    //             } catch (error) {
    //                 return []
    //             }
    //         },
    //         field: 'name',
    //         initialValue: this.deepGet(this.record, 'name')
    //     },
    //     { rule, value, callback }
    //     )
    //   })
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
