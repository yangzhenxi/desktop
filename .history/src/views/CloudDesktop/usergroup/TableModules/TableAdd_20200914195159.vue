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
  usermanageListOU,
  usermanageListuser
} from '@/api/CloudDesktop/userManage'

function isChecked (selectedKeys, eventKey) {
  return selectedKeys.indexOf(eventKey) !== -1
}

export default {
  mixins: [mixinFormModal],
  name: 'UserManageTabAdd',
  data () {
    return {
    targetKeys: [],
    ouList: [],
    dataSource: []
    }
  },
   computed: {
    treeData () {
      return this.handleTreeData(this.ouList, this.targetKeys)
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
        const ou = 'ou=' + res.ou[0].children[0].name + ',ou=Citrix,dc=test,dc=com'
        const data = this.deepGet(await usermanageListuser(ou), 'list')
        data.forEach((u, index) => {
            const obj = {
                key: index,
                baseDN: u.baseDN,
                title: u.username
            }
            this.ouList.push(obj)
        })
        this.flatten(JSON.parse(JSON.stringify(this.ouList)))
    },
    // 选中变灰色
    handleTreeData (data, targetKeys = []) {
        data.forEach(item => {
            item['disabled'] = targetKeys.includes(item.key)
            if (item.children) {
            this.handleTreeData(item.children, targetKeys)
            }
        })
        return data
    },
    flatten (list = []) {
        list.forEach(item => {
            this.dataSource.push(item)
            this.flatten(item.children)
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
