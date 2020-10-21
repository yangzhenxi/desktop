<template>
  <a-modal
    title="绑定用户组"
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
        <a-form-item label="添加的用户">
          <a-select
            placeholder="请选择系统镜像"
            v-decorator="['image', { rules: [{required: true, message: '请选择系统镜像'}] }]">
            <a-select-option
              v-for="(i,index) in ImageList"
              :key="index"
              :value="i.name">{{ i.name }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { mixinFormModal } from '@/utils/mixin'
import { CloudDesktopPolicyPatch } from '@/api/CloudDesktop/CloudDesktop'
import { usermanageListOU } from '@/api/CloudDesktop/userManage'
export default {
    mixins: [mixinFormModal],
    data () {
        return {
            UserAll: []
        }
    },
    methods: {
        async Add (record) {
          this.visible = true
          const UserAll = this.deepGet(await usermanageListOU(), 'ou', [])
          this.Recursion(UserAll[0].children[0].children)
          console.log(this.UserAll)
        },
        handleSubmit () {
            this.form.validateFields(async (errors, values) => {
                if (!errors) {
                    this.confirmLoading = true
                    CloudDesktopPolicyPatch(values)
                        .then(res => {
                            this.$message.success('添加成功')
                            this.$emit('ok', res)
                            this.visible = false
                            this.confirmLoading = false
                        })
                        .catch(err => {
                            this.confirmLoading = false
                            return err
                        })
                }
                this.confirmLoading = false
            })
        },
        Recursion (Array, data) {
            Array.forEach((item, index) => {
                const obj = {
                    key: index,
                    title: item.name,
                    value: item.name,
                    children: []
                }
                if (data) {
                    data.children.push(obj)
                } else {
                    this.UserAll.push(obj)
                }
                if (item.children.length > 0) {
                    // 执行递归
                    this.Recursion(item.children, obj)
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>

</style>
