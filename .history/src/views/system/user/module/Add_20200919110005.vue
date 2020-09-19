<template>
  <a-modal
    title="新建用户"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @change="handleCancel"
    destroyOnClose>
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-form-item
          label="姓名"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input
            placeholder="请输入姓名"
            v-decorator="['name', { rules: [
                                      { required: true, message: '请输入姓名' },
                                      {max:10,min:2,message:' 姓名长度为2-10个字符以内!'},
                                      {validator:namechineValidator}
                                    ],
                                    validateFirst: true
            }]" />
        </a-form-item>
        <a-form-item
          label="用户名"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input
            placeholder="请输入用户名"
            v-decorator="['username', { rules: [{required: true, message: '请输入用户名！'},{max:20,min:5,message:' 用户名长度为5-20个字符以内!'},{validator:nameValidator}],validateFields: true
            }]" />
        </a-form-item>
        <a-form-item
          label="角色"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-select
            placeholder="请选择角色"
            v-decorator="['role_id', { rules: [{required: true, message: '请选择角色'}] }]">
            <a-select-option
              v-for="i in roleList"
              :key="i.id"
              :value="i.id">
              {{ i.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="锁定状态"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-switch
            v-decorator="['locked']"
            :checked="checked"
            @change="onChange"
            checkedChildren="启用"
            unCheckedChildren="禁用" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { mixinFormModal } from '@/utils/mixin'
import { systemUserAdd } from '@/api/system/user'
import { nameValidator, telValidator, namechineValidator, nameRepeatValidator } from '@/utils/validator'
import { debounce } from '@/utils/util'

export default {
  mixins: [mixinFormModal],
  data () {
    return {
      roleList: Array,
      checked: true,
      userList: []
    }
  },
  methods: {
    Add (recard, userList) {
      this.roleList = recard
      this.userList = userList
      this.visible = true
      this.checked = true
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
        this.confirmLoading = true
        if (!errors) {
          try {
            values.locked = !this.checked
            const obj = {
              user: values
            }
            systemUserAdd(obj).then((res) => {
              this.confirmLoading = false
              this.$message.success('新建成功！')
              this.$emit('ok')
              this.visible = false
            })
          } catch (error) {
            this.confirmLoading = false
          }
        }
        this.confirmLoading = false
      })
    },
    onChange () {
      this.checked = !this.checked
    },
    // 校验重名称
    validator: debounce(function (rule, value, callback) {
      nameRepeatValidator(
        {
          data: () => {
            try {
              const data = this.validatorName
              return data
            } catch (error) {
              return []
            }
          },
          field: 'username'
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
</style>
