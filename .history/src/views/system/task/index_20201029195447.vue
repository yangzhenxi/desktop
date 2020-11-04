<template>
  <page-header-wrapper :title="false">
    <s-table
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
    </s-table>
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
          <div style="display: flex;">
            <p> {{ Drawerdata.title }}</p>
            <p v-if="Drawerdata.state!== 'SYSTEM_TASK_STATE_SUCCESS'">
              <a-tooltip>
                <template slot="title">
                  {{ Drawerdata.detail }}
                </template>
                <a-icon type="warning" style="font-size: 15px; margin-left:20px; cursor: pointer; color: #f50;" />
              </a-tooltip>
            </p>
          </div>
          <p style="display:flex;justify-content: space-between">
            <span>{{ Drawerdata.state | convert('C_D_DESKTOP_TASK_ATSTE') }}</span>
            <!-- <a-progress v-if="Drawerdata.state!== 'SYSTEM_TASK_STATE_SUCCESS'" :percent="parseInt(Drawerdata.progress)" status="active" style="width:80%;" /> -->
          </p>
        </a-timeline-item>
      </a-timeline>
    </a-drawer>
  </page-header-wrapper>
</template>
<script>
import { MIcon, STable } from '@/components'
import { CloudDesktopTaskList, CloudDesktopTaskGet } from '@/api/CloudDesktop/CloudDesktop'
import { mixinTable } from '@/utils/mixin'
const columns = [
    {
      title: '任务ID',
      dataIndex: 'id',
      sorter: true,
      width: 120
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
      sorter: true,
      width: 130
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
      width: 100,
      sorter: true
    }
]
export default {
  mixins: [mixinTable],
    components: {
    MIcon,
    STable
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
            const result = await CloudDesktopTaskList(Object.assign(parameter, this.queryBuild(this.queryParam)))
            return result
        } catch (error) {
            return false
        }
      }
    }
  },
  methods: {
    async Detali (record) {
        const result = this.deepGet(await CloudDesktopTaskGet({ id: record.id }), 'data')
        this.Drawerdata = result
        this.visible = true
    },
    onClose () {
        this.visible = false
    }
  }
}
</script>

<style lang="less" scoped>
/deep/i.anticon.anticon-check-circle {
    color: green;
}
/deep/.anticon.anticon-close-circle {
    color: #f50;
}
/deep/.ant-progress-text,/deep/.ant-drawer-title{
    color: white;
}
/deep/.ant-timeline-item-content {
    color: white;
}
/deep/.ant-drawer-wrapper-body {
    background: rgb(31, 37, 61);
}
/deep/.ant-drawer-header{
        padding: 23px 24px;
    background: rgb(26, 23, 45);
}
</style>
