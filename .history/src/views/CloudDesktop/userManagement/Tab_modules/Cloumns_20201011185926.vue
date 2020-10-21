<template>
  <a-modal
    title="新增用户信息"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    destroyOnClose
  >
    <a-spin :spinning="loading">
      <a-form :form="form" layout="vertical">

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { mixinFormModal } from '@/utils/mixin'
export default {
  mixins: [mixinFormModal],
  name: 'UserManageTabAdd',
  data () {
    return {

    }
  },
  methods: {
    async add (record) {
      this.visible = ''
    },
    handleSubmit () {
    //   this.form.validateFields(async (errors, values) => {
    //   })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
