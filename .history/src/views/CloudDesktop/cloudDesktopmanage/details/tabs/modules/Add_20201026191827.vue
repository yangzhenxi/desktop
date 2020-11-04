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
            disabled
            v-decorator="['dn']" />
        </a-form-item>
        <a-form-item
          label="桌面类型"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-radio-group disabled v-decorator="['type', { rules: [{required: true, message: '请选择桌面类型'}] }]">
            <a-radio value="DESKTOP_TYPE_RANDOM">随机桌面</a-radio>
            <a-radio value="DESKTOP_TYPE_STATIC_DISCARD">静态还原</a-radio>
            <a-radio value="DESKTOP_TYPE_STATIC_STORE">静态不还原</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="创建数量"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input-number
            :min="1"
            :max="99"
            style="width:100%;"
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
                    this.confirmLoading = true
                    const obj = {
                        id: this.Data.id,
                        count: values.count
                    }
                    CloudDesktopAddMachine(obj).then(res => {
                        this.$message.success('添加成功')
                        this.confirmLoading = false
                    }).catch(() => {

                    })
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
/deep/input.ant-input-number-input,label.ant-radio-wrapper {
    color: white;
}
</style>
