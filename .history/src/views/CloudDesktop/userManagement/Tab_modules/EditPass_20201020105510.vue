<template>
  <a-modal
    title="修改密码"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    destroyOnClose>
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-form-item
          label="新密码"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input
            type="password"
            placeholder="请输入密码"
            v-decorator="['password',
                          { rules: [
                              { required: true, message: '请输入密码' },
                            ],
                            validateFirst: true
                          }]" />
        </a-form-item>
        <a-form-item
          label="确认密码"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input
            type="password"
            placeholder="请再次输入密码"
            v-decorator="['confirmPassword',
                          { rules: [
                              { required: true, message: '请再次输入密码' },
                              { validator:confirmPassword}
                            ],
                            validateFirst: true
                          }]" />
        </a-form-item>
        <a-form-item
          label="设置"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-checkbox
            v-decorator="['first']"
            style="color:white;">
            首次登录是否修改密码
          </a-checkbox>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { mixinFormModal } from '@/utils/mixin'
import { usermanageEditpassword } from '@/api/CloudDesktop/userManage'
export default {
    mixins: [mixinFormModal],
    name: 'UserManageTabAdd',
    data () {
        return {
            departmentList: [],
            record: [],
            boole: true
        }
    },
    methods: {
        Edit (record) {
            this.record = []
            this.record = record.map(u => u.username)
            this.visible = true
        },
        handleSubmit () {
            this.form.validateFields(async (errors, values) => {
                this.confirmLoading = true
                if (!errors) {
                    const apis = []
                    this.boole = true
                    // const a = this.cutArray(this.record, 40)
                   for (let i = 0; i < this.record.length; i++) {
                       let names = ''
                          if (values.first === undefined) {
                                values.first = false
                            }
                            if (i === 0) {
                                names = u
                            }
                            names = names + '.' + this, record[i]
                        const BatchResetPass = {
                                name: names,
                                password: values.password,
                                pwd_last_set: values.first
                            }
                        apis.push(await usermanageEditpassword(BatchResetPass))
                    }
                    apis.forEach(async u => {
                        await u().then((res) => {
                                console.log(res)
                            })
                            .catch(e => {
                                this.boole = false
                            })
                    })
                    if (this.boole) {
                        this.$message.success('修改成功')
                        this.$emit('ok')
                        this.confirmLoading = false
                        this.visible = false
                    } else {
                        this.confirmLoading = false
                    }
                }
            })
        },
        handleCancel () {
            this.visible = false
        },
        confirmPassword (rule, value, callback) {
            const password = this.form.getFieldValue('password')
            if (value !== password) {
                callback(new Error('两次密码输入不正确，请重新输入'))
            }
            callback()
        },
        cutArray (array, subLength) {
            let index = 0
            const newArr = []
            while (index < array.length) {
                newArr.push(array.slice(index, (index += subLength)))
            }
            return newArr
        }
    }
}
</script>

<style lang="less" scoped>
</style>
