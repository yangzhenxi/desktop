<template>
  <a-tabs
    type="card"
    @change="callback"
    :tabBarGutter="tabBarGutter">
    <a-tab-pane
      key="1"
      tab="版本">
    </a-tab-pane>
    <a-tab-pane
      key="2"
      tab="硬件配置">

    </a-tab-pane>
  </a-tabs>
</template>

<script>

export default {
    data () {
        return {
                  columns: [
        {
          title: '版本号',
          dataIndex: 'version',
          sorter: true
        },
        {
          title: '版本名称',
          dataIndex: 'name',
          sorter: true
        },
        {
          title: '发布时间',
          dataIndex: 'createTime',
          sorter: true,
          scopedSlots: { customRender: 'time' }
        },
        {
          title: '版本描述',
          dataIndex: 'description',
          sorter: true,
          ellipsis: true
        },
        {
          title: '操作',
          sorter: true,
          scopedSlots: { customRender: 'action' }
        }
      ]
        }
    }
}
</script>

<style>

</style>
