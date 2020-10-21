<template>
  <a-modal
    title="绑定用户"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    destroyOnClose>
    <a-spin :spinning="loading">
      <a-form :form="form">

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { mixinFormModal } from '@/utils/mixin'
import { CloudDesktopPolicyPatch } from '@/api/CloudDesktop/CloudDesktop'
export default {
    mixins: [mixinFormModal],
    data () {
        return {
        }
    },
    methods: {
        async Add (record) {
            this.visible = true
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
        }
    }
}
</script>

<style lang="less" scoped>

</style>
