<template>
  <a-modal
    title="桌面用户组-新增组"
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
import { usermanageAddOu, usermanageListOU } from '@/api/CloudDesktop/userManage'
import { nameRepeatValidator } from '@/utils/validator'
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
      this.visible = true
      this.baseDN = null
      this.baseDN = record.name
      await usermanageListOU().then(res => {
          res.ou[0].children[0].children.forEaach(u => {

          })
      })
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
        if (!errors) {
            this.confirmLoading = true
            values.baseDN = this.baseDN
            usermanageAddOu(values).then(res => {
                this.$message.success('添加成功')
                this.$emit('ok', res)
                this.visible = false
                this.confirmLoading = false
            }).catch(err => {
                this.confirmLoading = false
                return err
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
            field: 'name'
        },
        { rule, value, callback }
        )
      }),
      nameRecursion (Array, data) {
          Array.forEach(u => {
            this.validatorName.push(u)
            if (u.children.length > 0) {
          // 执行递归
          this.Recursion(u.children, this.obj)
        }
          })
      }
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
