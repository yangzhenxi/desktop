<template>
  <div>
    <a-modal
      title="新建导航信息"
      :width="640"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel">
      <a-form :form="form">
        <a-form-item
          label="父级导航"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-select
            placeholder="请选择父级导航"
            v-decorator="['nav', { rules: [{ required: true, message: '请选择父级导航' }] }]">
            <a-select-option
              v-for="item in navList"
              :key="deepGet(item, 'id')"
              :value="deepGet(item, 'id')">{{ deepGet(item, 'name') }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="顺序"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input
            placeholder="请输入顺序"
            v-decorator="['order',
                          { rules: [
                              { required: true, message: '请输入顺序' },
                            ],
                            validateFirst: true
                          }]" />
        </a-form-item>
        <a-form-item
          label="名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input
            placeholder="请输入名称"
            v-decorator="['name',
                          { rules: [
                              { required: true, message: '请输入名称' },
                            ],
                            validateFirst: true
                          }]" />
        </a-form-item>
        <a-form-item
          label="备注"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input
            placeholder="请输入备注"
            v-decorator="['Remarks',
                          { rules: [
                              { required: true, message: '请输入备注' },
                            ],
                            validateFirst: true
                          }]" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { mixinFormModal } from '@/utils/mixin'

export default {
  mixins: [mixinFormModal],
  data () {
    return {
      navList: [
        {
          id: 1,
          name: '无父级导航'
        }
      ],
      record: null
    }
  },
  methods: {
    Add (record) {
        this.record = record
        this.$nextTick(() => {
            setTimeout(() => {
                this.form.setFieldsValue(this.pick(this.record, ['order']))
            })
        })
      this.visible = true
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
        if (!errors) {
          console.log('todo...')
          this.visible = false
        }
      })
    }
  }
}
</script>

<style>
</style>
