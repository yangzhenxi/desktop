<template>
  <page-header-wrapper :title="false">
    <a-row>
      <a-col :span="4">
        <div class="global-search-wrapper" style="width: 300px">
          <a-auto-complete
            class="global-search"
            :data-source="dataSource"
            style="width: 100%"
            placeholder="输入要查询的任务ID"
            v-model="queryParam.id"
            @select="onSelect"
            @search="handleSearch">
            <a-input>
              <a-button
                @click="onSelect(queryParam.id)"
                slot="suffix"
                style="margin-right: -12px"
                class="search-btn"
                type="primary">
                <a-icon type="search" />
              </a-button>
            </a-input>
          </a-auto-complete>
        </div>
      </a-col>
    </a-row>
    <m-table
      style="margin-top:10px;"
      ref="table"
      rowKey="id"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :columns="columns"
      :data="loadData">
      <template slot="state" slot-scope="text">
        <a-badge
          :number-style="{backgroundColor: toDict(text,'T_STATE').color}"
          :count="text | convert('T_STATE')" />
      </template>
      <template slot="progress" slot-scope="text,record">
        <a-progress v-if="record.state==='SYSTEM_TASK_STATE_SUCCESS'" :percent="text"/>
        <a-progress v-if="record.state==='SYSTEM_TASK_STATE_FAIL'" status="exception" :percent="text" style="color:#fff" />
        <a-progress v-if="record.state==='SYSTEM_TASK_STATE_RUNNING'" :percent="text" />
        <a-progress v-if="record.state==='SYSTEM_TASK_STATE_PREPARING'" :percent="text" />
      </template>
      <template slot="action" slot-scope="text,record">
        <a-button type="primary" @click="Detali(record)" size="small">
          查看详情
        </a-button>
      </template>
    </m-table>
    <!-- drawer -->
    <a-drawer
      placement="right"
      :closable="false"
      :visible="visible"
      width="350px"
      @close="onClose"
    >
      <template slot="title">
        {{ Drawerdata.title }}的步骤
      </template>
      <a-timeline>
        <a-timeline-item v-for="u in Drawerdata.steps" :key="u.id" :color="toDict(u.state,'C_D_DESKTOP_TASK_ATSTE').color">
          <p v-if="u.state !== 'SYSTEM_TASK_STATE_FAIL'">{{ u.name }} </p>
          <p v-if="u.state === 'SYSTEM_TASK_STATE_FAIL'">
            {{ u.name }}
            <a-tooltip>
              <template slot="title">
                {{ u.detail }}
              </template>
              <a-icon type="warning" style="font-size: 15px; margin-left:20px; cursor: pointer; color: #f50;" />
            </a-tooltip>
          </p>
          <p style="display:flex;justify-content: space-between">
            <span>{{ u.state | convert('C_D_DESKTOP_TASK_ATSTE') }}</span>
            <a-progress v-if="u.state!== 'SYSTEM_TASK_STATE_SUCCESS'" :percent="parseInt(u.progress)" status="active" style="width:80%;" />
          </p>
        </a-timeline-item>
        <a-timeline-item v-if="Drawerdata.steps.length ===0 " :color="toDict(Drawerdata.state,'C_D_DESKTOP_TASK_ATSTE').color">
          <p> {{ Drawerdata.title }}</p>
          <p style="display:flex;justify-content: space-between">
            <span>{{ Drawerdata.state | convert('C_D_DESKTOP_TASK_ATSTE') }}</span>
            <a-progress v-if="Drawerdata.state!== 'SYSTEM_TASK_STATE_SUCCESS'" :percent="parseInt(Drawerdata.progress)" status="active" style="width:80%;" />
          </p>
        </a-timeline-item>
      </a-timeline>
    </a-drawer>
  </page-header-wrapper>
</template>
<script>
import { MIcon, MTable } from '@/components'
import { CloudDesktopTaskList, CloudDesktopTaskGet } from '@/api/CloudDesktop/CloudDesktop'
import { mixinTable } from '@/utils/mixin'
const columns = [
    {
      title: '任务ID',
      dataIndex: 'id',
      sorter: true,
      width: 150
    },
    {
      title: '任务描述',
      dataIndex: 'title',
      ellipsis: true,
      sorter: true
    },
    {
      title: '当前进度',
      dataIndex: 'progress',
      scopedSlots: { customRender: 'progress' },
      sorter: true
    },
    {
      title: '任务状态',
      dataIndex: 'state',
      scopedSlots: { customRender: 'state' },
      sorter: true
    },
    {
      title: '开始时间',
      dataIndex: 'start_at',
      scopedSlots: { customRender: 'time' },
      sorter: true
    },
    {
      title: '结束时间',
      dataIndex: 'end_at',
      scopedSlots: { customRender: 'time' },
      sorter: true
    },
    {
      title: '操作',
      dataIndex: 'action',
      scopedSlots: { customRender: 'action' },
      sorter: true
    }
]
export default {
  mixins: [mixinTable],
    components: {
    MIcon,
    MTable
  },
  data () {
    return {
        columns,
        visible: false,
        TAbleData: [],
        dataSource: [],
        Drawerdata: {
            steps: []
        },
        loadData: async (parameter) => {
        try {
            const data = this.deepGet(await CloudDesktopTaskList(), 'data', [])
            data.forEach(u => { this.TAbleData.push(u.id) })
            return {
                data,
                queryParam: this.queryParam
            }
        } catch (error) {
            return false
        }
      }
    }
  },
  methods: {
    AllDelete () {
      if (this.selectedRowKeys.length > 0) {
        this.$confirm({
          title: '是否要批量删除',
          content: '点击确定即可批量删除',
          okType: 'danger',
          onOk: () => {
            this.$message.success('删除成功！')
            this.$refs.table.refresh()
            this.selectedRowKeys = []
          }
        })
      } else {
        this.$message.info('请先选择要删除的用户')
      }
    },
    async Detali (record) {
        const result = this.deepGet(await CloudDesktopTaskGet({ id: record.id }), 'data')
        this.Drawerdata = result
        this.visible = true
    },
    onClose () {
        this.visible = false
    },
    onSelect (value) {
        if (value) {
            this.queryParam.id = value
        } else {
            this.queryParam.id = ''
            this.dataSource = []
        }
        this.$refs.table.refresh()
    },

    handleSearch (value) {
            this.dataSource = []
            let res = []
            this.TAbleData.forEach(u => {
                for (let o = 0; o <= u.toString().length; o++) {
                    if (u.substring(o, (value.length) + o) === value) {
                        res.push(u)
                    }
                }
            })
            res = [...new Set(res)]
            this.TAbleData.includes(value) ? this.dataSource = [value] : this.dataSource = [...res]
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.ant-progress-text{
    color: white;
}
// /deep/.ant-progress-status-success {
//     color: #52c41a;
// }
</style>
