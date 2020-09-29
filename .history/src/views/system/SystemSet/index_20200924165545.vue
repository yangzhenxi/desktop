<template>
  <page-header-wrapper>
    <a-modal
      title="新建角色信息"
      :width="880"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel">
      <a-form
        :form="form"
        layout="vertical">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="角色类型">
              <a-select
                placeholder="请选择角色类型"
                v-decorator="['nav', { rules: [{ required: true, message: '请选择角色类型' }] }]">
                <a-select-option
                  v-for="item in navList"
                  :key="deepGet(item, 'id')"
                  :value="deepGet(item, 'id')">{{ deepGet(item, 'name') }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="角色名称">
              <a-input
                placeholder="请输入角色名称"
                v-decorator="['order',
                              { rules: [
                                  { required: true, message: '请输入角色名称' },
                                ],
                                validateFirst: true
                              }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item label="管理权限">
          <s-table
            ref="table"
            :columns="columns"
            :data="loadData">
            <template
              slot="Authority"
              slot-scope="text,record">
              <a-checkbox-group v-model="checkedList" :options="record.Authority" @change="onChange" />
            </template>
            <template slot="action">
              <a-checkbox
                :indeterminate="indeterminate"
                :checked="checkAll"
                @change="onCheckAllChange()">
                全选
              </a-checkbox>
            </template>
          </s-table>
        </a-form-item>
      </a-form>
    </a-modal>
  </page-header-wrapper>
</template>

<script>
import { mixinFormModal } from '@/utils/mixin'
import { STable } from '@/components'
const plainOptions = ['Apple', 'Pear', 'Orange']
export default {
  mixins: [mixinFormModal],
  components: {
    STable
  },
  data () {
    return {
      visible: true,
      indeterminate: false,
      checkAll: false,
      checkedList: [],
      plainOptions,
      boole: true,
      columns: [
        {
          title: '导航名称',
          dataIndex: 'name',
          sorter: true
        },
        {
          title: '权限分配',
          dataIndex: 'Authority',
          sorter: true,
          scopedSlots: { customRender: 'Authority' },
          width: 550
        },
        {
          title: '全选',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          width: 100
        }
      ],
      navList: [
        {
          id: 1,
          name: '无父级导航'
        }
      ],
      loadData: async (parameter) => {
        return new Promise((resolve) => {
          resolve({
            data: [
              {
                key: 2,
                name: '首页',
                Authority: ['删除', '操作', '预览']
              },
              {
                key: 1,
                name: '首页',
                Authority: ['显示', '查看', '添加']
              }
            ],
            pageSize: 10,
            pageNo: 1,
            totalPage: 1,
            totalCount: 0
          })
        }).then((res) => {
          return res
        })
      }
    }
  },
  filters: {
      checkAllData (value) {
        this.plainOptions = value
        return this.plainOptions
      }
  },
  methods: {
    Add () {
      this.visible = true
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
        if (!errors) {
          console.log('todo...')
          this.visible = false
        }
      })
    },
    onChange (checkedList) {
      this.indeterminate = !!checkedList.length && checkedList.length < this.plainOptions.length
      this.checkAll = checkedList.length === this.plainOptions.length
    },
    onCheckAllChange (e) {
      Object.assign(this, {
        checkedList: e.target.checked ? this.plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked
      })
    }
  }
}
</script>

<style>
</style>
