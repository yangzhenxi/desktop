<template>
  <a-modal
    title="新增桌面"
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
// import { usermanageAddOu } from '@/api/CloudDesktop/userManage'
// import { nameRepeatValidator } from '@/utils/validator'
// import { debounce } from '@/utils/util'
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
    Add () {
      this.visible = true
    //   this.baseDN = null
    //   this.baseDN = record.name
    //   this.validatorName = TPgroupNameList
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
        if (!errors) {
            this.confirmLoading = true
            values.baseDN = this.baseDN
            // usermanageAddOu(values).then(res => {
            //     this.$message.success('添加成功')
            //     this.$emit('ok', res)
            //     this.visible = false
            //     this.confirmLoading = false
            // }).catch(err => {
            //     this.confirmLoading = false
            //     return err
            // })
        }
        this.confirmLoading = false
      })
    }
                // 校验重名称
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
    //         field: 'name'
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
