<template>
  <a-modal
    title="修改用户"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @change="handleCancel"
    destroyOnClose
  >
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-form-item
          label="姓名"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            placeholder="请输入姓名"
            v-decorator="['name', { rules: [
                                      { required: true, message: '请输入姓名' },
                                      {max:10,min:2,message:' 姓名长度为2-10个字符以内!'},
                                      {validator:nameValidator}
                                    ],
                                    validateFirst: true
            }]" />
        </a-form-item>
        <a-form-item
          label="用户名"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input
            placeholder="请输入用户名"
            disabled
            v-decorator="['username', { rules: [{required: true, message: '请输入用户名！'},{max:20,min:5,message:' 用户名长度为5-20个字符以内!'},{validator:nameValidator}],validateFields: true
            }]" />
        </a-form-item>
        <a-form-item
          label="
            角色"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-select placeholder="请选择角色" v-decorator="['role_id', { rules: [{required: true, message: '请选择角色'}] }]" >
            <a-select-option v-for="i in roleList" :key="i.id" :value="i.id">
              {{ i.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { mixinFormModal } from '@/utils/mixin'
import { systemUserPatch } from '@/api/system/user'
import { nameValidator, telValidator, nameRepeatspecialValidator } from '@/utils/validator'
import { debounce } from '@/utils/util'

export default {
  mixins: [mixinFormModal],
  data () {
    return {
        roleList: Array,
        recard: null
    }
  },
  methods: {
    Edit (recard, role) {
        this.recard = recard
        this.roleList = role
        this.visible = true
            this.$nextTick(() => {
        setTimeout(() => {
          this.form.setFieldsValue(
            this.pick(this.recard, ['name', 'username', 'role_id'])
          )
        })
      })
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
          this.confirmLoading = true
        if (!errors) {
          try {
              values.id = this.recard.id
              const obj = {
                  user: values
              }
              systemUserPatch(obj).then(res => {
                    this.confirmLoading = false
                    this.$message.success('修改成功')
                    this.$emit('ok')
                    this.visible = false
              })
          } catch (error) {
            this.confirmLoading = false
          }
        } else {
          this.confirmLoading = false
        }
      })
    },
                          // 校验重名称
    validator: debounce(function (rule, value, callback) {
        nameRepeatspecialValidator({
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
      }),
    nameValidator,
    telValidator,
    namechineValidator
  }
}
</script>

<style lang="less" scoped>
    /deep/.ant-form-item label {
        position: relative;
        color: white;
    }
</style>
