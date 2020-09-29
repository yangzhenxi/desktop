<template>
  <div class="step1">
    <a-form
      :form="form"
      style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item
        label="模版名称"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        <a-input
          placeholder="请输入模版名称"
          v-decorator="['name', { rules: [{required: true, message: '请输入模版名称'},{validator}] }]" />
      </a-form-item>
      <a-form-item
        label="所属分组"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        <a-tree-select
          style="width: 100%"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto',background:'#333b54' }"
          :tree-data="data.TPgroupList"
          placeholder="请选择所属分组"
          tree-default-expand-all
          v-decorator="['group', { rules: [{required: true, message: '请选择所属分组'}] }]">
        </a-tree-select>
      </a-form-item>
      <a-form-item
        label="系统镜像"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        <a-select
          placeholder="请选择系统镜像"
          v-decorator="['image', { rules: [{required: true, message: '请选择系统镜像'}] }]">
          <a-select-option
            v-for="(i,index) in data.ImageList"
            :key="index"
            :value="i.name">{{ i.name }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="软件信息"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        <a-textarea placeholder="请输入软件信息" :rows="4" v-decorator="['software', { rules: [{required: true, message: '请输入软件信息'}] }]" />
      </a-form-item>
      <a-form-item :wrapperCol="{span: 16, offset: 8}">
        <a-button
          type="dashed"
          style="margin-right:10px;"
          @click="close">关闭</a-button>
        <a-button
          type="primary"
          :loading="loading"
          @click="nextStep">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { nameRepeatValidator } from '@/utils/validator'
import { debounce } from '@/utils/util'
import { DesktopTemplateGetAllTask } from '@/api/CloudDesktop/DesktopManagem'
export default {
  name: 'Step1',
  props: {
    data: {
      type: Object,
      required: true
    },
    validatorName: {
        type: Array,
      required: true
    }
  },
  data () {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      loading: false
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
          this.loading = true
          setInterval(() => {
            this.loading = false
            this.$emit('nextStep', values)
          }, 500)
        }
      })
    },
    // 校验重名称
    validator: debounce(function (rule, value, callback) {
        nameRepeatValidator({
            data: async () => {
                try {
                    const taskName = this.deepGet(await DesktopTemplateGetAllTask().res, 'data', [])
                    console.log(taskName)
                    console.log(this.validatorName)
                    const data = this.validatorName
                    return data
                } catch (error) {
                    return []
                }
            },
            field: 'name'
        },
        { rule, value, callback }
        )
      })
  }
}
</script>

<style lang="less" scoped>
.step1 {
  margin-top: 40px;
  border: 1px solid #cccccc;
  border-radius: 5px;
}
/deep/input#name,/deep/input#username,/deep/input#mail,/deep/input#phone {
        background: content-box;
        height: 0;
        padding: 1.2em .5em;
        color: white !important;
}
/deep/input#name::first-line, /deep/input#username::first-line, /deep/input#mail::first-line, /deep/input#phone::first-line{
      color: white;
}

</style>
