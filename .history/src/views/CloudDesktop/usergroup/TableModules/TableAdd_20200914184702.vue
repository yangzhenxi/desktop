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

export default {
  mixins: [mixinFormModal],
  name: 'UserManageTabAdd',
  data () {
    return {
      mockData: [],
      targetKeys: []
    }
  },
  mounted () {
    this.getMock()
  },
  methods: {
    Add (record) {
      this.visible = true
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
        if (!errors) {
          this.confirmLoading = true
        }
        this.confirmLoading = false
      })
    },
    getMock () {
      const targetKeys = []
      const mockData = []
      for (let i = 0; i < 20; i++) {
        const data = {
          key: i.toString(),
          title: `content${i + 1}`,
          description: `description of content${i + 1}`,
          chosen: Math.random() * 2 > 1
        }
        if (data.chosen) {
          targetKeys.push(data.key)
        }
        mockData.push(data)
      }
      this.mockData = mockData
      this.targetKeys = targetKeys
    //   console.log(this.mockData)
    },
    handleChange (targetKeys, direction, moveKeys) {
      console.log(targetKeys, direction, moveKeys)
      this.targetKeys = targetKeys
    }
  }
}
</script>

<style lang="less" scoped>
/deep/li.ant-transfer-list-content-item {
    color: white;
}
/deep/.ant-transfer-list-header {
    color:white !important;
    background: none;
}
/deep/.ant-transfer-list-search-action .anticon {
    color: white;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
}
/deep/form.ant-form.ant-form-horizontal {
    display: flex;
    justify-content: center;
}
/deep/.ant-transfer-list-content-item:not(.ant-transfer-list-content-item-disabled):hover {
    background-color: #eeeeee;
    cursor: pointer;
    color: #000;
}
/deep/.ant-transfer-list-body-not-found {
    color: white;
}
</style>
