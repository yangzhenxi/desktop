<template>
  <a-modal
    title="添加用户"
    :width="700"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    destroyOnClose>
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-transfer
          class="tree-transfer"
          :data-source="dataSource"
          :target-keys="targetKeys"
          :render="item => item.title"
          :show-select-all="false"
          @change="onChange"
        >
          <template
            slot="children"
            slot-scope="{
              props: { direction, selectedKeys },
              on: { itemSelect },
            }"
          >
            <a-tree
              v-if="direction === 'left'"
              blockNode
              checkable
              checkStrictly
              defaultExpandAll
              :checkedKeys="[...selectedKeys, ...targetKeys]"
              :treeData="treeData"
              @check="(_, props) => {onChecked(_, props, [...selectedKeys, ...targetKeys],itemSelect)}"
              @select="(_, props) => {onChecked(_, props, [...selectedKeys, ...targetKeys],itemSelect)}"
            />
          </template>
        </a-transfer>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { mixinFormModal } from '@/utils/mixin'
import {
  usermanageListOU
} from '@/api/CloudDesktop/userManage'
const treeData = [
  { key: '0-0', title: '0-0' },
  {
    key: '0-1',
    title: '0-1',
    children: [{ key: '0-1-0', title: '0-1-0' }, { key: '0-1-1', title: '0-1-1' }]
  },
  { key: '0-2', title: '0-3' }
]

const transferDataSource = []
function flatten (list = []) {
  list.forEach(item => {
    transferDataSource.push(item)
    flatten(item.children)
  })
}
flatten(JSON.parse(JSON.stringify(treeData)))

function isChecked (selectedKeys, eventKey) {
  return selectedKeys.indexOf(eventKey) !== -1
}

function handleTreeData (data, targetKeys = []) {
  data.forEach(item => {
    item['disabled'] = targetKeys.includes(item.key)
    if (item.children) {
      handleTreeData(item.children, targetKeys)
    }
  })
  return data
}

export default {
  mixins: [mixinFormModal],
  name: 'UserManageTabAdd',
  data () {
    return {
    targetKeys: [],
    dataSource: transferDataSource
    }
  },
   computed: {
    treeData () {
      return handleTreeData(treeData, this.targetKeys)
    }
  },
  methods: {
    Add (record) {
      this.visible = true
      this.getOuList()
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
        if (!errors) {
          this.confirmLoading = true
        }
        this.confirmLoading = false
      })
    },
   onChange (targetKeys) {
      this.targetKeys = targetKeys
    },
    onChecked (_, e, checkedKeys, itemSelect) {
      const { eventKey } = e.node
      itemSelect(eventKey, !isChecked(checkedKeys, eventKey))
    },
    // 获取树形用户
    async getOuList () {
        const res = await usermanageListOU()
        res.ou.forEach(u => {

        })
    }
  }
}
</script>

<style lang="less" scoped>
.tree-transfer .ant-transfer-list:first-child {
  width: 50%;
  flex: none;
}
/deep/.ant-transfer-list-header {
    background: none;
    color: white;
    font-weight: 500;
}
/deep/li.ant-tree-treenode-disabled > .ant-tree-node-content-wrapper span {
    color: white;
    cursor: not-allowed;
}
/deep/span.ant-transfer-list-content-item-text {
    color: white;
}
/deep/.ant-transfer-list-content-item:not(.ant-transfer-list-content-item-disabled):hover {
    background-color: #1a233a !important;
    cursor: pointer;
}
</style>
