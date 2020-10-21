2<template>
  <div class="step2">
    <a-form
      :form="form"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item
        label="托管资源"
        class="stepFormText">
        <a-select
          placeholder="请选择托管资源"
          @change="handeleChange"
          v-decorator="['network', { rules: [{required: true, message: '请选择托管资源'}] }]">
          <a-select-option v-for="(i,index) in Host" :key="index" :value="i.path">{{ i.name }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="网络"

        class="stepFormText">
        <a-select
          placeholder="请选择网络"
          v-decorator="['network', { rules: [{required: true, message: '请选择网络'}] }]">
          <a-select-option v-for="(i,index) in networks" :key="index" :value="i.path">{{ i.id }}</a-select-option>
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
import { CloudDesktopHostList } from '@/api/CloudDesktop/CloudDesktop'
import { deepGet } from '@/utils/util'
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
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      loading: false,
      Host: [],
      networks: []
    }
  },
  created () {
    this.getHostList()
  },
  methods: {
      // 解析datacenterList的数据
      handeleChange (value) {
         this.Host.forEach(u => {
             if (u.path === value) {
                 this.networks = u.networks
             }
         })
      },
       getHostList () {
           CloudDesktopHostList().then(res => {
              this.Host = deepGet(res, 'data', [])
          })
      },
    nextStep () {
      const that = this
      const {
        form: { validateFields }
      } = this
      that.loading = true
      validateFields((err, values) => {
        if (!err) {
          that.timer = setTimeout(function () {
            that.loading = false
            that.$emit('nextStep', values, that.dataStores)
          }, 500)
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
