<template>
  <div>
    <a-row
      style="margin-top:20px;"
      :gutter="16">
      <a-col
        :xl="8"
        :md="24"
        :sm="24">
        <div style="border:1px solid #ccc;height: 300px;">
          <a-tree
            v-model="checkedKeys"
            checkable
            :expanded-keys="expandedKeys"
            :selected-keys="selectedKeys"
            :tree-data="treeData"
            @expand="onExpand"
            @select="onSelect"
            default-expand-all />

        </div>
      </a-col>
      <a-col
        :xl="16"
        :md="24"
        :sm="24">
        <s-table
          :columns="columns"
          :data="loadData"
          bordered
          rowKey="key"
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
        </s-table>
      </a-col>
    </a-row>
    <a-row>
      <a-col :offset="9">
        <a-button
          @click="prevStep">上一步</a-button>
        <a-button
          :loading="loading"
          style="margin-left: 8px"
          type="primary"
          @click="nextStep">下一步</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import STable from '@/components/Table'
import { getServiceList } from '@/api/manage'
const treeData = [
  {
    title: '资源池',
    key: '0-0',
    children: [
      {
        title: 'Dev03Xenserver - 25',
        key: '0-0-0',
        scopedSlots: {
          title: 'custom'
        }
      },
      {
        title: 'xen246-pool',
        key: '0-0-1',
        scopedSlots: {
          title: 'custom'
        }
      },
      {
        title: 'xen247-pool',
        key: '0-0-2',
        scopedSlots: {
          title: 'custom'
        }
      }
    ]
  }
]

export default {
  components: {
    STable
  },
  name: 'Step3',
    props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      expandedKeys: ['0-0-0', '0-0-1'],
      checkedKeys: [], // 打勾的值
      selectedKeys: [],
      treeData,
      loading: false,
      selectedRowKeys: [], // Check here to configure the default column
      columns: [
        {
          title: '服务器名称',
          dataIndex: 'no',
          sorter: true
        },
        {
          title: 'Ip地址',
          dataIndex: 'description',
          sorter: true
        },
        {
          title: '存储',
          dataIndex: 'vmwareName',
          sorter: true
        }
      ],
      loadData: (parameter) => {
        return getServiceList(Object.assign(parameter, this.queryParam)).then((res) => {
          return res.result
        })
      }
    }
  },
  watch: {
    checkedKeys (val) {
      console.log('onCheck', val)
    }
  },
  created () {
      console.log(this.data)
  },
  methods: {
    nextStep () {
      this.$emit('nextStep')
    },
    prevStep () {
      this.$emit('prevStep')
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    onExpand (expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onCheck (checkedKeys) {
      this.checkedKeys = checkedKeys
    },
    onSelect (selectedKeys, info) {
      this.selectedKeys = selectedKeys
    }
  }
}
</script>
<style lang="less" scoped>
.information {
  line-height: 22px;
  .ant-row:not(:last-child) {
    margin-bottom: 24px;
  }
}
.money {
  font-family: 'Helvetica Neue', sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 14px;
}
.step3{
    margin-top: 40px;
    border:1px solid #cccccc;
    border-radius: 5px;
}

/deep/.ant-tree li .ant-tree-node-content-wrapper,/deep/.ant-table-thead > tr > th,/deep/.ant-table-tbody{
    color: white;
}
/deep/.ant-table-body{
    background: none !important;
}
/deep/.ant-table-header,/deep/.ant-table-thead > tr > th{
    background: none !important;
}
</style>
