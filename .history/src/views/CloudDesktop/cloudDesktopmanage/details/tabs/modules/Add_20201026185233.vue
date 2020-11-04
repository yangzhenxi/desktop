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
          label="桌面位置"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input
            v-decorator="['dn',
                          { rules: [
                              { required: true, message: '请输入名称！' },
                            ],
                            validateFirst: true
                          }]" />
        </a-form-item>
        <a-form-item
          label="桌面类型"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input
            v-decorator="['type',
                          { rules: [
                              { required: true, message: '请选择桌面类型' },
                            ],
                            validateFirst: true
                          }]" />
        </a-form-item>
        <a-form-item
          label="创建数量"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input-number
            :min="1"
            :max="10"
            v-decorator="['count',
                          { rules: [
                            { required: true, message: '请选择要创建的桌面数量' },
                          ],
                          }]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { mixinFormModal } from '@/utils/mixin'
import { mapState, mapMutations } from 'vuex'
import { CloudDesktopAddMachine } from '@/api/CloudDesktop/CloudDesktop'
export default {
    mixins: [mixinFormModal],
    name: 'UserManageTabAdd',
    data () {
        return {
            baseDN: null,
            validatorName: []
        }
    },
    computed: {
        ...mapState({
            'Data': state => state.cloudDesktop.DetailsData
        })
    },
    methods: {
        ...mapMutations(['SET_DETAILSDATA']),
        async Add (record) {
            this.visible = true
            this.$nextTick(() => {
                this.form.setFieldsValue({
                    type: this.Data.desktop_type
                    // dn: this.formValue.dn
                })
            })
        },
        handleSubmit () {
            this.form.validateFields(async (errors, values) => {
                if (!errors) {
                    const obj = {
                        id: 1,
                        count: values.count
                    }
                    CloudDesktopAddMachine(obj)
                    this.confirmLoading = true
                }
                this.confirmLoading = false
            })
        }
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
