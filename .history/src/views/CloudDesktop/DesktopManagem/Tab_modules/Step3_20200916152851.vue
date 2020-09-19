<template>
  <div>
    <a-row
      style="margin-top:20px;"
      :gutter="16">
      <a-col :span="24">
        <m-table
          :columns="columns"
          :data="loadData"
          bordered
          rowKey="key"
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
        </m-table>
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
import MTable from '@/components/Table'
import { getServiceList } from '@/api/manage'

export default {
  components: {
    MTable
  },
  name: 'Step3',
    props: {
    data: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      selectedRowKeys: [], // Check here to configure the default column
      columns: [
        {
          title: '名称',
          dataIndex: 'no',
          sorter: true
        },
        {
          title: '容量',
          dataIndex: 'capacity',
          sorter: true
        },
        {
          title: '可用空间',
          dataIndex: 'freeSpace',
          sorter: true
        }
      ],
      loadData: (parameter) => {
  try {
            const res = await usermanageListusergroup()
            res.group.forEach((u) => {
                this.baseDN.push(u.baseDN)
            })
            if (!this.checkedval) {
                this.checkedval = this.deepGet(res, ['group', 0, 'name'])
            }
            this.treedata = res.group
            res.group.forEach(u => {
                this.Allusers.push(...u.users)
            })
            this.record = res.group.find(u => u.name === this.checkedval).users
            const data = this.record
            this.checkedObj = res.group.find(u => u.name === this.checkedval)
          return {
            data: data
          }
        } catch (error) {
          return false
        }
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
