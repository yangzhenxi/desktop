<template>
  <div>
    <empty v-if="!this.$route.query.item" :isEmpty="!this.$route.query.item"/>
    <div v-else>
      <div class="title"> {{ this.$route.query.name }} </div>
      <a-card style="height:635px;">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-row class="icon-modules" style="height:200px;" align="middle" type="flex" justify="center">
              <div class="add">
                <a-col>
                  <a-icon type="plus-circle" @click="$refs.ManageAdd.Add($route.query.AddData)"/>
                </a-col>
              </div>
            </a-row>
          </a-col>
          <a-col :span="8" v-for=" i in this.$route.query.item" :key="i.id">
            <a-row class="modules" type="flex" justify="center" :gutter="16">
              <a-col :span="8" class="icon">
                <a-row type="flex" justify="center" style="margin-top: 35px;">
                  <a-icon class="icon" type="windows" />
                  <div class="icon_title">{{ i.image }}</div>
                </a-row>
              </a-col>
              <a-col :span="16">
                <div class="modules_title" style="margin:5px 0px">{{ i.name }}</div>
                <div class="text">
                  <span>所属分组: </span>
                  <span> {{ i.groupName }}</span>
                </div>
                <div class="text">
                  <span>所在服务器: </span>
                  <span> {{ i.host }}</span>
                </div>
                <div class="text">
                  <span>创建时间: </span>
                  <span>{{ i.createTime }}</span>
                </div>
                <div class="text">
                  <span>版本状态: </span>
                  <span>{{ i.version }}</span>
                </div>
                <div class="text">
                  <span>运行状态: </span>
                  <span>{{ i.isRunning }}</span>
                </div>
                <div class="text">
                  <span>IP: </span>
                  <span>{{ i.ip }}</span>
                </div>
              </a-col>
              <div class="hover">
                <a-icon type="form" @click="details(i)" class="details"/>
                <a-icon type="delete" @click="Delete(i)" class="delete" />
              </div>
            </a-row>
          </a-col>
        </a-row>
        <a-pagination
          :total="this.$route.query.item.length"
          :show-total="total => `共 ${this.$route.query.item.length} 条数据`"
          :page-size="10"
          :default-current="1" />
        <x-manageadd
          ref="ManageAdd"
          @ok="handleOk"></x-manageadd>
        <x-managerelease
          ref="ManageRelease"
          @ok="handleOk"></x-managerelease>
      </a-card>
    </div>
  </div>

</template>

<script>
import { mixinTable } from '@/utils/mixin'
import ModulesInfo from './modulesinfo'
import XManageadd from './manageAdd'
import XManagerelease from './release'
import MIcon from '@/components/Icon'
import Empty from '@/components/Empty'
import { DesktopTemplateDelete } from '@/api/CloudDesktop/DesktopManagem'
export default {
  mixins: [mixinTable],
  components: {
    ModulesInfo,
    XManageadd,
    XManagerelease,
    MIcon,
    Empty
  },
  data () {
    return {
    }
  },
  methods: {
      // 详情
      details (i) {
           this.$router.push({
          name: 'singlemodules',
          query: {
              item: i
          }
        })
      },
     // 模版删除
    Delete (i) {
        const obj = {
            req: i.name
        }
      this.$confirm({
        title: '删除后将无法恢复，确定删除么',
        onOk: async () => {
             await DesktopTemplateDelete(obj).then(res => {
                 this.$message.success('删除成功')
             })

        //   return new Promise((resolve, reject) => {
        //     setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
        //   }).catch(() => console.log('Oops errors!'))
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ant-pagination {
  float: right;
  margin-right: 20px;
  margin-top: 20px;
  color: white;
}
.title{
    font-size: 17px;
    font-weight: 500;
    margin-bottom: 20px;
    // border: 2px solid red;
      background: #272E48;
      padding: 10px;
      padding-left: 20px;
      border-radius: 10px;
      color: #bcd0f7;
}
.modules_title{
     font-size: 17px;
    font-weight: 500;
}
.icon-modules{
    border: 1px solid #ccc;
    border-radius: 10px;
    .add{
        font-size: 100px;

    }
}
.modules{
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 8px;
    .icon{
        font-size: 80px;
    }
    .icon_title{
        font-size: 15px;
        color: bisque;
    }
    .text{
        font-size: 16px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .hover{
        position: absolute;
        right: 0px;
        font-size: 20px;
        display: none;
        i{
            padding-right: 20px;
        }
        .delete{
            color:red
        }
        .details{
            color: #16bedd;
        }
    }
}
.modules:hover > .hover{
    display: block;
}
</style>
