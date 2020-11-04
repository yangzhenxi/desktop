<template>
  <div class="step1">
    <a-spin :spinning="SpinningLoading">
      <a-form
        :form="form"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        style="max-width: 500px; margin: 40px auto 0;">
        <a-form-item label="桌面名称">
          <a-input
            autocomplete="off"
            placeholder="请输入桌面名称"
            v-decorator="['name', { rules: [{required: true, message: '请输入桌面名称'},{validator}],validateFirst: true }]" />
        </a-form-item>
        <a-form-item
          label="名称前缀"
        >
          <a-input
            autocomplete="off"
            placeholder="请输入名称前缀"
            v-decorator="['naming_scheme', { rules: [{required: true, message: '请输入名称前缀'},{validator:namingScheme}] }]" />
        </a-form-item>
        <a-form-item label="名称格式">
          <a-select
            placeholder="请选择名称格式"
            v-decorator="['naming_scheme_type', { rules: [{required: true, message: '请选择名称格式'}] }]">
            <a-select-option value="DESKTOP_NAMING_SCHEME_TYPE_ALPHABETIC">字母填充</a-select-option>
            <a-select-option value="DESKTOP_NAMING_SCHEME_TYPE_NUMERIC">数字填充</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="DN">
          <a-tree-select
            style="width: 100%"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto',background:'#333b54' }"
            :tree-data="ou"
            placeholder="请选择分组"
            tree-default-expand-all
            v-decorator="['dn', { rules: [{required: true, message: '请选择分组'}] }]">
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
          <a-radio-group v-decorator="['desktop_type', { rules: [{required: true, message: '请选择桌面类型'}] }]">
            <a-radio value="DESKTOP_TYPE_RANDOM">随机桌面</a-radio>
            <a-radio value="DESKTOP_TYPE_STATIC_DISCARD">静态还原</a-radio>
            <a-radio value="DESKTOP_TYPE_STATIC_STORE">静态不还原</a-radio>
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
    </a-spin>
  </div>
</template>

<script>
import { namingScheme, DesktopnameValidator } from '@/utils/validator'
import { debounce, deepGet } from '@/utils/util'
import { mapState, mapMutations } from 'vuex'
import { CloudDesktopOUList } from '@/api/CloudDesktop/CloudDesktop'
import { DesktopTemplateAllList, DesktopTemplateVersionList, CloudDesktopTestName } from '@/api/CloudDesktop/DesktopManagem'
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
      ou: [],
      SpinningLoading: false

    }
  },
  created () {
      this.getOUList()
  },
      mounted () {
        if (this.formValue) {
            this.$nextTick(() => {
                this.form.setFieldsValue({
                    name: this.formValue.name,
                    naming_scheme_type: this.formValue.naming_scheme_type,
                    dn: this.formValue.dn,
                    template: this.formValue.template,
                    version: this.formValue.version,
                    naming_scheme: this.formValue.naming_scheme,
                    count: this.formValue.count,
                    desktop_type: this.formValue.desktop_type
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
      const { form: { validateFields } } = this
      // 先校验，通过表单校验后，才进入下一步
      validateFields((err, values) => {
        if (!err) {
          this.loading = true
          setTimeout(() => {
          this.SET_VERSION(this.version)
          this.SET_TPLIST(this.TPList)
          this.SET_FORMVALUE(values)
            this.loading = false
            this.$emit('nextStep', values)
          }, 500)
        }
      })
    },
    async getOUList () {
            this.SpinningLoading = true
       const res = deepGet((await CloudDesktopOUList()), 'ou', [])
       this.Recursion(res[0].children)
       this.TPList = deepGet((await DesktopTemplateAllList()), 'data')
        this.TPList.forEach(u => {
            u.id = parseInt(u.id)
        })
        this.SpinningLoading = false
    },
    async getVersion (e) {
      this.version = deepGet((await DesktopTemplateVersionList({ templateId: e })), 'data', [])
      this.version.forEach(u => {
            u.id = parseInt(u.id)
      })
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
    },
    namingScheme,
    // 校验重名称
    validator: debounce(function (rule, value, callback) {
        async DesktopnameValidator({
            data: () => {
                try {
                    await CloudDesktopTestName({ name: value })
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

/deep/input.ant-input-number-input,label.ant-radio-wrapper {
    color: white;
}
</style>
