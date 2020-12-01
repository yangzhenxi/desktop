<template>
  <div>
    <m-table
      style="margin-top:10px;"
      ref="table"
      rowKey="name"
      :columns="columns"
      :data="loadData">
      <template slot="name" slot-scope="text"><a-tag color="#108ee9">{{ text }}</a-tag></template>
      <template slot="machine_count" slot-scope="text"><a-tag color="#108ee9">{{ text }}</a-tag></template>
      <template slot="running_machine_count" slot-scope="text"><a-tag color="#108ee9">{{ text }}</a-tag></template>
      <template slot="closed_machine_count" slot-scope="text"><a-tag color="#108ee9">{{ text }}</a-tag></template>
    </m-table>
  </div>
</template>

<script>
import { MIcon, MTable } from '@/components'
export default {
    components: {
        MIcon,
        MTable
	},
	props: {
		desktop: {
			type: Array,
            required: true
		}
	},
    data () {
        return {
			columns: [
				{
				title: '云桌面',
				dataIndex: 'name',
                scopedSlots: { customRender: 'name' },
				sorter: true
				},
				{
				title: '桌面数量',
				dataIndex: 'machine_count',
                scopedSlots: { customRender: 'machine_count' },
				sorter: true
				},
				{
				title: '运行数量',
				dataIndex: 'running_machine_count',
                scopedSlots: { customRender: 'running_machine_count' },
				sorter: true
				},
				{
				title: '关闭数量',
				dataIndex: 'closed_machine_count',
                scopedSlots: { customRender: 'closed_machine_count' },
				sorter: true
				}
			],
			loadData: async (parameter) => { return { data: this.desktop } }
        }
	},
	watch: {
		desktop: {
			// immediate: true,
			handler (newval, oldval) {
				this.$refs.table.refresh()
			},
			deep: true
		}
	}
}
</script>

<style lang="less" scoped>
/deep/.ant-card-head-title{
    color: white;
}
/deep/.ant-table-placeholder{
  background: #272e48 !important;
}

</style>
