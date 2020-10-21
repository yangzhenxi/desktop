<template>
  <div>
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
    <version-edit
      ref="VersionEdit"
      @ok="$refs.table.refresh()"></version-edit>
  </div>

</template>

<script>
import { MTable } from '@/components/index'
import { mixinTable } from '@/utils/mixin'
import VersionEdit from '../VersionEdit'
import { mapState } from 'vuex'
import { DesktopTemplateVersionDelete } from '@/api/CloudDesktop/DesktopManagem'
export default {
  mixins: [ mixinTable ],
  components: {
    MTable,
    VersionEdit
  },
        computed: {
        ...mapState({
            'ModuleData': state => state.DesktopManage.ModuleData,
            'Version': state => state.DesktopManage.Version
        })
    },
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
          return this.$store.dispatch('GetVersionList')
      }
    }
  },
  methods: {
         // 删除版本
    VersionDelete (record) {
      this.$confirm({
        title: '是否要删除该版本',
        okType: 'danger',
        onOk: () => {
          return new Promise((resolve, reject) => {
              try {
DesktopTemplateVersionDelete({ id: record.id })
              this.$message.success('删除成功')
              this.$refs.table.refresh()
              resolve()
              }catch {

              }
          }).catch(() => console.log('Oops errors!'))
        }
      })
    }

  }
}
</script>

<style>
</style>
