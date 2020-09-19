2<template>
  <div class="step2">
    <a-form
      :form="form"
      style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item
        label="数据中心"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText">
        <a-select
          placeholder="请选择数据中心"
          v-decorator="['dataCenter', { rules: [{required: true, message: '请选择数据中心'}] }]">
          <a-select-option v-for="(i,index) in this.data.DataCenterList" :key="index" :value="i.name">{{ i.name }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="集群/主机"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText">
        <a-select
          placeholder="请选择集群/主机"
          v-decorator="['group', { rules: [{required: true, message: '请选择集群/主机'}] }]">
          <a-select-option value="1">ant-design@alipay.com</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="资源池"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText">
        <a-select
          placeholder="请选择资源池"
          v-decorator="['group', { rules: [{required: true, message: '请选择资源池'}] }]">
          <a-select-option value="1">ant-design@alipay.com</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="cpu核心数"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText">
        <a-select
          placeholder="请选择cpu核心数"
          v-decorator="['group', { rules: [{required: true, message: '请选择cpu核心数'}] }]">
          <a-select-option value="1">1</a-select-option>
          <a-select-option value="2">2</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="插槽核心"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText">
        <a-select
          placeholder="请输入插槽核心"
          v-decorator="['group', { rules: [{required: true, message: '请输入插槽核心'}] }]">
          <a-select-option value="1">1</a-select-option>
          <a-select-option value="2">2</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="内存"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText">
        <div class="slider_title">
          <div></div>
          <a-tag color="#2db7f5">
            30GB
          </a-tag>
        </div>
        <a-slider
          v-model="inputValue"
          :min="1"
          :max="30" />
      </a-form-item>
      <a-form-item
        label="系统盘"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText">
        <div class="slider_title">
          <div></div>
          <a-tag color="#2db7f5">
            80GB
          </a-tag>
        </div>
        <a-slider
          v-model="inputValue1"
          :min="1"
          :max="80" />
      </a-form-item>
      <a-form-item
        label="网络"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText">
        <a-select
          placeholder="请选择网络"
          v-decorator="['group', { rules: [{required: true, message: '付款账户必须填写'}] }]">
        </a-select>
      </a-form-item>
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button @click="prevStep">上一步</a-button>
        <a-button
          :loading="loading"
          style="margin-left: 8px"
          type="primary"
          @click="nextStep">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'Step2',
   props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      inputValue1: 1,
      inputValue: 1,
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      loading: false,
      timer: 0
    }
  },
  created () {
      this.getdataCenter()
  },
  methods: {
      // 解析datacenterList的数据
      getdataCenter () {
          console.log(this.form.getFieldsValue(['dataCenter']))
        this.data.DataCenterList.forEach(u => u)
      },
    nextStep () {
      const that = this
      const {
        form: { validateFields }
      } = this
      that.loading = true
      validateFields((err, values) => {
        if (!err) {
          console.log('表单 values', values)
          that.timer = setTimeout(function () {
            that.loading = false
            that.$emit('nextStep')
          }, 1500)
        } else {
          that.loading = false
        }
      })
    },
    prevStep () {
      this.$emit('prevStep')
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="less" scoped>
.stepFormText {
  margin-bottom: 24px;
  .ant-form-item-label,
  .ant-form-item-control {
    line-height: 22px;
  }
}
.ant-slider {
  margin-top: 0px;
}
.slider_title {
  display: flex;
  justify-content: space-between;
}
.step2 {
  margin-top: 40px;
  border: 1px solid #cccccc;
  border-radius: 5px;
}
/deep/label[title='内存'],
/deep/label[title='系统盘'] {
  color: white;
}
</style>
