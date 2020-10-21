<template>
  <div class="step1">
    <a-form
      :form="form"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item
        label="桌面名称"
      >
        <a-input
          autocomplete="off"
          placeholder="请输入桌面名称"
          v-decorator="['name', { rules: [{required: true, message: '请输入桌面名称'}] }]" />
      </a-form-item>
      <a-form-item
        label="名称前缀"
      >
        <a-input
          autocomplete="off"
          placeholder="请输入名称前缀"
          v-decorator="['namingScheme', { rules: [{required: true, message: '请输入名称前缀'}] }]" />
      </a-form-item>
      <a-form-item label="DN">
        <a-tree-select
          style="width: 100%"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto',background:'#333b54' }"
          :tree-data="ou"
          placeholder="请选择分组"
          tree-default-expand-all
          v-decorator="['group', { rules: [{required: true, message: '请选择分组'}] }]">
        </a-tree-select>
      </a-form-item>
      <a-form-item
        label="选择模板："
      >
        <a-select
          placeholder="请选择模版"
          @change="getVersion"
          v-decorator="['template', { rules: [{required: true, message: '请选择模板'}] }]">
          <a-select-option v-for="(i,index) in TPList" :key="index" :value="i.id">{{ i.name }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="版本号"
      >
        <a-select
          placeholder="请选择版本号"
          v-decorator="['version', { rules: [{required: true, message: '请选择版本号'}] }]">
          <a-select-option v-for="(i,index) in version" :key="index" :value="i.id">{{ i.name }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="名称格式">
        <a-select
          placeholder="请选择名称格式"
          v-decorator="['namingSchemeType', { rules: [{required: true, message: '请选择名称格式'}] }]">
          <!-- <a-select-option :value="0">None</a-select-option> -->
          <a-select-option :value="1">Alphabetic</a-select-option>
          <a-select-option :value="2">Numeric</a-select-option>
        </a-select>
      </a-form-item>
      <a-row>
        <a-col :span="12" offset="{2}">
          <a-form-item
            label="起始数字:"
            :labelCol="{span: 10}"
            :wrapperCol="{span: 14}">
            <a-input-number :min="1" :max="10" v-decorator="['Number', { rules: [{required: true, message: '请输入起始数字'}] }]"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="桌面数量:"
            :labelCol="{span: 10}"
            :wrapperCol="{span: 14}">
            <a-input-number :min="1" :max="10" v-decorator="['count', { rules: [{required: true, message: '请输入桌面数量'}] }]"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item label="桌面类型">
        <a-radio-group v-decorator="['DesktopType', { rules: [{required: true, message: '请选择桌面类型'}] }]">
          <a-radio value="Random">随机桌面</a-radio>
          <a-radio value="StaticDiscard">静态还原</a-radio>
          <a-radio value="StaticStore">静态不还原</a-radio>
        </a-radio-group>
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
// import { nameRepeatValidator } from '@/utils/validator'
// import { debounce } from '@/utils/util'
import { deepGet } from '@/utils/util'
import { mapState, mapMutations } from 'vuex'
import { CloudDesktopOUList } from '@/api/CloudDesktop/CloudDesktop'

import { DesktopTemplateAllList, DesktopTemplateVersionList } from '@/api/CloudDesktop/DesktopManagem'
export default {
  name: 'Step1',
  props: {
  },
  data () {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      loading: false,
      TPList: [],
      version: [],
      ou: []
    }
  },
  created () {
      this.getOUList()
      this.getTPList()
  },
      mounted () {
        if (this.formValue) {
            this.$nextTick(() => {
                this.form.setFieldsValue({
                    name: this.formValue.name,
                    namingScheme: this.formValue.namingScheme,
                    group: this.formValue.group,
                    template: this.formValue.template,
                    version: this.formValue.version,
                    NamingSchemeType: this.formValue.NamingSchemeType,
                    count: this.formValue.count,
                    DesktopType: this.formValue.DesktopType
                })
            })
        }
    },
     computed: {
        ...mapState({
            'formValue': state => state.cloudDesktop.formValue,
            'AllVersion': state => state.cloudDesktop.AllVersion,
            'AllTP': state => state.cloudDesktop.AllTP
        })
    },
  methods: {
        ...mapMutations(['SET_FORMVALUE', 'SET_VERSION', 'SET_TPLIST']),
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
          this.SET_VERSION(this.version)
          this.SET_TPLIST(this.TPList)
          this.SET_FORMVALUE(values)
          setInterval(() => {
            this.loading = false
            this.$emit('nextStep', values)
          }, 500)
        }
      })
    },
    async getOUList () {
       const res = deepGet((await CloudDesktopOUList()), 'ou', [])
       this.Recursion(res[0].children)
    },
    async getTPList () {
        this.TPList = deepGet((await DesktopTemplateAllList()), 'data')
    },
    async getVersion (e) {
      this.version = deepGet((await DesktopTemplateVersionList({ templateId: e })), 'data', [])
    },
    Recursion (Array, data) {
        Array.forEach(u => {
            const obj = {
                value: u.dn,
                title: u.name,
                children: []
            }
            if (data) {
                data.children.push(obj)
            } else {
                this.ou.push(obj)
            }
            if (u.children.length > 0) {
                this.Recursion(u.children, obj)
            }
        })
    }
    // 校验重名称
    // validator: debounce(function (rule, value, callback) {
    //     nameRepeatValidator({
    //         data: () => {
    //             try {
    //                 const data = this.validatorName
    //                 return data
    //             } catch (error) {
    //                 return []
    //             }
    //         },
    //         field: 'name'
    //     },
    //     { rule, value, callback }
    //     )
    //   })
  }
}
</script>

<style lang="less" scoped>
.step1 {
  margin-top: 40px;
  border: 1px solid #cccccc;
  border-radius: 5px;
}

/deep/input.ant-input-number-input,label.ant-radio-wrapper {
    color: white;
}
</style>
