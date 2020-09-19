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
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange ,type: 'radio'}">
          <template slot="capacity" slot-scope="text">
            {{ (text / 1024/1024/1024).toFixed(1) }}GB
          </template>
          <template slot="freeSpace" slot-scope="text">
            {{ (text / 1024/1024/1024).toFixed(1) }}GB
          </template>
        </m-table>
      </a-col>
    </a-row>
    <a-row>
      <a-col :offset="9">
        <a-button @click="prevStep">上一步</a-button>
        <a-button
          :loading="loading"
          :disabled="disabled"
          style="margin-left: 8px"
          type="primary"
          @click="nextStep">下一步</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import MTable from '@/components/Table/MTable'

export default {
  components: {
    MTable
  },
  name: 'Step3',
  props: {
    data: {
      type: Array,
      required: true
    },
    capacity: {
        type: Number,
        required: true
    }
  },
  data () {
    return {
      loading: false,
      disabled: true,
      selectedRowKeys: [], // Check here to configure the default column
      selectedRows: {},
      columns: [
        {
          title: '名称',
          dataIndex: 'name',
          sorter: true
        },
        {
          title: '容量',
          dataIndex: 'capacity',
        scopedSlots: { customRender: 'capacity' },

          sorter: true
        },
        {
          title: '可用空间',
          dataIndex: 'freeSpace',
            scopedSlots: { customRender: 'freeSpace' },

          sorter: true
        }
      ],
      loadData: (parameter) => {
        return new Promise((resolve) => {
          resolve({
            data: this.data
          })
        }).then((res) => {
          return res
        })
      }
    }
  },
  methods: {
    nextStep () {
        this.loading = true
        setInterval(() => {
            const obj = {
                datastore: this.selectedRows[0].name
            }
            this.loading = false
            this.$emit('nextStep', obj)
        }, 500)
    },
    prevStep () {
      this.$emit('prevStep')
    },
    onSelectChange (selectedRowKeys, selectedRows) {
        this.disabled = false
            console.log(this.capacity / 1024 / 1024)
        console.log(selectedRows)
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
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
.step3 {
  margin-top: 40px;
  border: 1px solid #cccccc;
  border-radius: 5px;
}

/deep/.ant-tree li .ant-tree-node-content-wrapper,
/deep/.ant-table-thead > tr > th,
/deep/.ant-table-tbody {
  color: white;
}
/deep/.ant-table-body {
  background: none !important;
}
/deep/.ant-table-header,
/deep/.ant-table-thead > tr > th {
  background: none !important;
}
</style>
