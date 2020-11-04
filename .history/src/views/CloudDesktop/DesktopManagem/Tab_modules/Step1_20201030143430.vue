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
          v-decorator="['name', { rules: [{required: true, message: '请输入模版名称'},{min:1,max:13,message:'模版长度为1-13个字符以内'},{validator}]
          }]" />
      </a-form-item>
      <a-form-item
        label="所属分组"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        <a-tree-select
          style="width: 100%"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto',background:'#333b54' }"
          :tree-data="TPgroupList"
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
            v-for="(i,index) in ImageList"
            :key="index"
            :value="i.name">{{ i.name }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="软件信息"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol">
        <a-textarea
          placeholder="请输入软件信息"
          :rows="4"
          v-decorator="['software', { rules: [{required: true, message: '请输入软件信息'}] }]" />
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
import { mapState, mapMutations } from 'vuex'
import { nameRepeatValidator } from '@/utils/validator'
import { debounce, deepGet } from '@/utils/util'
import { DesktopTemplateGetAllTask, DesktopTemplateAllList } from '@/api/CloudDesktop/DesktopManagem'
export default {
    name: 'Step1',
    data () {
        return {
            labelCol: { lg: { span: 5 }, sm: { span: 5 } },
            wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
            form: this.$form.createForm(this),
            loading: false
        }
    },
    computed: {
        ...mapState({
            'formValue': state => state.DesktopManage.formValue,
            'ImageList': state => state.DesktopManage.ImageList,
            'TPgroupList': state => state.DesktopManage.TPgroupList
        })
    },
    mounted () {
        if (this.formValue) {
            this.$nextTick(() => {
                this.form.setFieldsValue({
                    name: this.formValue.name,
                    group: this.formValue.group,
                    software: this.formValue.software,
                    image: this.formValue.image
                })
            })
        }
    },
    methods: {
        ...mapMutations(['SET_FORMVALUE']),
        close () {
            this.$emit('close')
        },
        nextStep () {
            this.loading = true
            const { form: { validateFields } } = this
            // 先校验，通过表单校验后，才进入下一步
            validateFields((err, values) => {
                if (!err) {
                    this.SET_FORMVALUE(values)
                    setInterval(() => {
                        this.loading = false
                        this.$emit('nextStep')
                    }, 500)
                } else {
                    this.loading = false
                }
            })
        },
        // 校验重名称
        validator: debounce(function (rule, value, callback) {
            nameRepeatValidator(
                {
                    data: async () => {
                        try {
                            const validatorName = deepGet(await DesktopTemplateAllList(), 'data', [])
                            const taskName = deepGet(await DesktopTemplateGetAllTask(), 'data', [])
                            taskName.forEach(u => {
                                validatorName.push({ name: u.tp_name })
                            })
                            const data = validatorName
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
/deep/input#name,
/deep/input#username,
/deep/input#mail,
/deep/input#phone {
    background: content-box;
    height: 0;
    padding: 1.2em 0.5em;
    color: white !important;
}
/deep/input#name::first-line,
/deep/input#username::first-line,
/deep/input#mail::first-line,
/deep/input#phone::first-line {
    color: white;
}
</style>
