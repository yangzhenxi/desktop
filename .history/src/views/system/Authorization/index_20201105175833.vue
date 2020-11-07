<template>
  <page-header-wrapper :title="false">
    <a-card>
      <a-row :gutter="16">
        <a-col :span="12">
          <div class="version">
            <span>当前系统授权:</span>
            <span>试用版</span>
          </div>
          <div class="Time">
            <span class="Date">89</span>
            <span class="Day">天</span>
          </div>
        </a-col>
        <a-col :span="12">
          <a-button type="primary">
            <span class="btn-span">立即升级到正式版</span>
          </a-button>
          <br>
          <br>
          <br>
          <a-row>
            <a-col :span="24">
              <a-checkbox
                value="A"
                disabled
                defaultChecked>
                <span>升级到正式版本之后，您可以获得：</span>
              </a-checkbox>
            </a-col>
            <a-col :span="24">
              <a-checkbox
                value="B"
                disabled
                defaultChecked>
                <span>使用不受限制</span>
              </a-checkbox>
            </a-col>
            <a-col :span="24">
              <a-checkbox
                value="C"
                disabled
                defaultChecked>
                <span>7*24小时售后服务</span>
              </a-checkbox>
            </a-col>
            <a-col :span="24">
              <a-checkbox
                disabled
                value="D"
                defaultChecked>
                <span>快速的软件与安全服务</span>
              </a-checkbox>
            </a-col>
            <a-col :span="24">
              <a-checkbox
                value="E"
                disabled
                defaultChecked>
                <span>更多特权，可访问豪联科技官网查看</span>
              </a-checkbox>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-card>
    <br>
    <br>
    <a-card>
      <m-table
        ref="table"
        :columns="columns"
        :data="loadData"
        rowKey="username">
      </m-table>
    </a-card>
  </page-header-wrapper>
</template>
<script>
import { MTable } from '@/components'
import { deepGet } from '@/utils/util'
import { usermanageListuser } from '@/api/CloudDesktop/userManage'
import STree from '@/components/Tree/Treeto'
export default {
    components: {
        STree,
        MTable
    },
    data () {
        return {
            result: [],
            columns: [
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
            ],
            loadData: async parameter => {
                this.result = this.deepGet(
                    await usermanageListuser({
                        name: 'ou=ABC,ou=Users,ou=Citrix,dc=cloud,dc=com'
                    }),
                    'list',
                    []
                )

                return {
                    data: this.result
                }
            }
        }
    },

    methods: {
        deepGet
    }
}
</script>

<style lang="less" scoped>
.version {
    font-size: 20px;
    text-align: center;
    span:last-child {
        margin-left: 20px;
    }
}
.Time {
    text-align: center;
}
.Date {
    font-size: 180px;
}
.Day {
    font-size: 30px;
}
.ant-checkbox-wrapper {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: white;
    font-size: 20px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    -webkit-font-feature-settings: "tnum";
    font-feature-settings: "tnum";
    display: inline-block;
    line-height: unset;
    cursor: pointer;
}
.ant-btn {
    height: auto;
}
.btn-span {
    margin: 20px 30px;
    font-size: 20px;
}

// /deep/.ant-tree.ant-tree-directory > li span.ant-tree-node-content-wrapper:hover::before, .ant-tree.ant-tree-directory .ant-tree-child-tree > li span.ant-tree-node-content-wrapper:hover::before{
//     background: #272E48 ;
// }
// /deep/span.ant-tree-switcher.ant-tree-switcher_open {
//     color: white;
// }
</style>
