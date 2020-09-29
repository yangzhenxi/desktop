<template>
  <m-table
    :columns="columns"
    :data="loadData"
    ref="table"
    rowKey="id">
    <template
      slot="action"
      slot-scope="text,record">
      <a-button
        type="primary"
        shape="circle"
        icon="form"
        @click="$refs.VersionEdit.Edit(record)"
        style="margin-right:20px" />
      <a-button
        type="danger"
        shape="circle"
        @click="VersionDelete(record)">
        <a-icon type="delete" />
      </a-button>
    </template>
  </m-table>
</template>

<script>
import { DesktopTemplateVersionList } from '@/api/CloudDesktop/DesktopManagem'
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
      ],
            // 加载数据方法 必须为 Promise 对象
      loadData: async (parameter) => {
        this.disabled = true
        this.sliderDisabled = false
        this.queryParam.templateId = this.templateId
        const data = this.deepGet(await DesktopTemplateVersionList(this.queryParam), 'data', [])
        if (data.length > 0) {
            this.sliderDisabled = true
            this.disabled = false
        }
        return {
          data
        }
      }
        }
    }
}
</script>

<style>

</style>
