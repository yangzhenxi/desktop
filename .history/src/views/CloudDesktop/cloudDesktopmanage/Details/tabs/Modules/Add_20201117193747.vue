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
          label="创建数量"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input-number
            :min="1"
            :max="99"
            style="width:100%;"
            v-decorator="['count',
                          { rules: [
                            { required: true, message: '请设置要创建的桌面数量' },
                          ],
                          }]" />
        </a-form-item>
        <a-form-item
          label="桌面位置"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-tree-select
            style="width: 100%"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto',background:'#333b54' }"
            :tree-data="ou"
            placeholder="请选择分组"
            tree-default-expand-all
            v-decorator="['dn']">
          </a-tree-select>
        </a-form-item>
        <a-form-item
          label="桌面类型"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-radio-group disabled v-decorator="['type']">
            <a-radio value="DESKTOP_TYPE_RANDOM">随机桌面</a-radio>
            <a-radio value="DESKTOP_TYPE_STATIC_DISCARD">静态还原</a-radio>
            <a-radio value="DESKTOP_TYPE_STATIC_STORE">静态不还原</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { deepGet } from '@/utils/util'
import { mixinFormModal } from '@/utils/mixin'
import { mapState, mapMutations } from 'vuex'
import { CloudDesktopAddMachine, CloudDesktopOUList } from '@/api/CloudDesktop/CloudDesktop'
export default {
    mixins: [mixinFormModal],
    name: 'UserManageTabAdd',
    data () {
        return {
            baseDN: null,
            ou: [],
            validatorName: []
        }
    },
    computed: {
        ...mapState({
            'Data': state => state.cloudDesktop.DetailsData,
            'DN': state => state.cloudDesktop.dn
        })
    },
    methods: {
        ...mapMutations(['SET_DETAILSDATA']),
        async Add (record) {
            this.visible = true
            this.loading = true
            this.ou = []
            const res = this.deepGet((await CloudDesktopOUList()), 'ou', [])
			this.Recursion(res[0].children[0].children)
			console.log(this.DN)
            this.$nextTick(() => {
                this.form.setFieldsValue({
                    type: this.Data.desktop_type,
                    dn: this.DN.dn
                })
            })
          this.loading = false
        },
        handleSubmit () {
            this.form.validateFields(async (errors, values) => {
                if (!errors) {
                    this.confirmLoading = true
                    const obj = {
                        id: this.Data.id,
                        count: values.count
                    }
                   await CloudDesktopAddMachine(obj).then(res => {
                        this.$message.success('开始添加中')
                        this.confirmLoading = false
                        this.visible = false
                    }).catch(() => {
                        this.$message.error('添加失败')
                        this.confirmLoading = false
                    })
                }
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
        deepGet
    }
}
</script>

<style lang="less" scoped>
/deep/input.ant-input-number-input,/deep/label.ant-radio-wrapper {
    color: white;
}
/deep/.ant-radio-disabled + span {
    color: white;
    cursor: not-allowed;
}
</style>
