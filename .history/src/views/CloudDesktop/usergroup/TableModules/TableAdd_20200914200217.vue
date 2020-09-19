<template>
  <a-modal
    title="添加用户"
    :width="700"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    destroyOnClose>
    {{ dataSource }}
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
    dataSource: [ { 'key': 0, 'baseDN': 'CN=FM995,OU=Users,OU=Citrix,DC=test,DC=com', 'title': 'FM995' }, { 'key': 1, 'baseDN': 'CN=win7-01,OU=Computer,OU=Citrix,DC=test,DC=com', 'title': 'win7-01$' }, { 'key': 2, 'baseDN': 'CN=abcd,OU=Users,OU=Citrix,DC=test,DC=com', 'title': 'abcd' }, { 'key': 3, 'baseDN': 'CN=abcccc,OU=Users,OU=Citrix,DC=test,DC=com', 'title': 'abcccc' }, { 'key': 4, 'baseDN': 'CN=FMhowlink,OU=Users,OU=Citrix,DC=test,DC=com', 'title': 'FMhowlink' }, { 'key': 5, 'baseDN': 'CN=yzx,OU=Users,OU=Citrix,DC=test,DC=com', 'title': 'yzx' }, { 'key': 6, 'baseDN': 'CN=0909,OU=Users,OU=Citrix,DC=test,DC=com', 'title': '0909' }, { 'key': 7, 'baseDN': 'CN=lin,OU=软件部,OU=Users,OU=Citrix,DC=test,DC=com', 'title': 'lin' }, { 'key': 8, 'baseDN': 'CN=FM123456,OU=Users,OU=Citrix,DC=test,DC=com', 'title': 'FM123456' }, { 'key': 9, 'baseDN': 'CN=ads,OU=Users,OU=Citrix,DC=test,DC=com', 'title': 'ads' }, { 'key': 10, 'baseDN': 'CN=catalog01,OU=Win7,OU=Computer,OU=Citrix,DC=test,DC=com', 'title': 'catalog01$' }, { 'key': 11, 'baseDN': 'CN=catalog02,OU=Win7,OU=Computer,OU=Citrix,DC=test,DC=com', 'title': 'catalog02$' } ]
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
      console.log(this.targetKeys)
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
            // this.dataSource.push(obj)
        })
        // this.flatten(JSON.parse(JSON.stringify(this.ouList)))
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
