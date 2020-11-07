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
import { deepGet, mergeCellKey } from '@/utils/util'
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
                    title: '用户名',
                    dataIndex: 'username',
                    sorter: true,
                    fixed: 'left',
                     ellipsis: true

                },
                {
                    title: '姓名',
                    dataIndex: 'display_name',
                    sorter: true,
                    customRender: async (val, row, index) => {
                        // const obj = {
                        // children: val,
                        // attrs: {}
                        // }
                        // const data = this.deepGet(await usermanageListuser({ name: 'ou=ABC,ou=Users,ou=Citrix,dc=cloud,dc=com' }), 'list', [])

                        console.log(mergeCellKey(row.display_name, this.result, 'display_name'))
                        // obj.attrs.rowSpan = mergeCellKey(row.display_name, this.result, 'display_name')
                        return val
                    }
                },
                {
                    title: '组',
                    dataIndex: 'group',
                    sorter: true
                }
            ],
            loadData: async parameter => {
               this.result = this.deepGet(await usermanageListuser({ name: 'ou=ABC,ou=Users,ou=Citrix,dc=cloud,dc=com' }), 'list', [])

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
