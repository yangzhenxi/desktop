<template>
  <div class="step1">
    <a-form
      :form="form"
      style="max-width: 500px; margin: 40px auto 0;">
      {{ data.TPgroupList }}
      <a-form-item
        label="模版名称"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        <a-input v-decorator="['name', { initialValue: 'Alex', rules: [{required: true, message: '收款人名称必须核对'}] }]" />
      </a-form-item>
      <a-form-item
        label="所属分组"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        <!-- <a-select
          placeholder="请选择所属分组"
          v-decorator="['group', { rules: [{required: true, message: '付款账户必须填写'}] }]">
          <a-select-option value="1">ant-design@alipay.com</a-select-option>
        </a-select> -->
        <a-tree-select
          style="width: 100%"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          :tree-data="data.TPgroupList"
          placeholder="Please select"
          tree-default-expand-all
          v-decorator="['group', { rules: [{required: true, message: '付款账户必须填写'}] }]"
        >
          <span v-if="key === '0-0-1'" slot="title" slot-scope="{ key, value }" style="color: #08c">
            Child Node1 {{ value }}
          </span>
        </a-tree-select>
      </a-form-item>
      <a-form-item
        label="系统镜像"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        <a-select
          placeholder="请选择系统镜像"
          v-decorator="['Os', { rules: [{required: true, message: '付款账户必须填写'}] }]">
          <a-select-option v-for="(i,index) in data.ImageList" :key="index" :value="i.name">{{ i.name }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :wrapperCol="{span: 16, offset: 8}">
        <a-button
          type="primary"
          style="margin-right:10px;"
          @click="close">关闭</a-button>
        <a-button
          type="primary"
          @click="nextStep">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'Step1',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this)
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    nextStep () {
      const {
        form: { validateFields }
      } = this
      // 先校验，通过表单校验后，才进入下一步
      validateFields((err, values) => {
        if (!err) {
          this.$emit('nextStep')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.step1 {
  margin-top: 40px;
  border: 1px solid #cccccc;
  border-radius: 5px;
}
</style>
