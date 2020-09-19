<template>
  <a-modal
    title="添加用户"
    :width="700"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    destroyOnClose>
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-transfer
          :data-source="mockData"
          show-search
          :list-style="{
            width: '250px',
            height: '300px',
          }"
          :operations="['移入', '移出']"
          :target-keys="targetKeys"
          :render="item => `${item.title}-${item.description}`"
          @change="handleChange">
          <span slot="notFoundContent">
            没数据
          </span>
        </a-transfer>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { mixinFormModal } from '@/utils/mixin'
import { usermanageAllUser } from '@/api/CloudDesktop/userManage'

export default {
  mixins: [mixinFormModal],
  name: 'UserManageTabAdd',
  data () {
    return {
      mockData: [],
      targetKeys: [],
      movein: []
    }
  },
  methods: {
    Add (record) {
        this.movein = record
        this.getMock()
        this.visible = true
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
        if (!errors) {
          this.confirmLoading = true
        }
        this.confirmLoading = false
      })
    },
    getMock () {
    //   const targetKeys = []
      const mockData = []
      usermanageAllUser().then(res => {
          res.list.forEach((u, index) => {
              const obj = {
                  key: index,
                  title: u.username,
                  baseDN: u.baseDN,
                  username: u.username
              }
              console.log(this.movein)
              if (this.movein.indexOf(u.username) === -1) {
                  console.log(obj)
              }
              mockData.push(obj)
          })
            this.mockData = mockData.filter(v => this.movein.indexOf(v.username) === -1)
      })

    //   this.mockData = mockData
    //   this.targetKeys = targetKeys
    },
    handleChange (targetKeys, direction, moveKeys) {
      console.log(targetKeys, direction, moveKeys)
      this.targetKeys = targetKeys
    },
    getArrDifference (arr1, arr2) {
        return arr1.concat(arr2).filter(function (v, i, arr) {
            return arr.indexOf(v) === arr.lastIndexOf(v)
        })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/li.ant-transfer-list-content-item {
    color: white;
}
/deep/.ant-transfer-list-header {
    color:white !important;
    background: none;
}
/deep/.ant-transfer-list-search-action .anticon {
    color: white;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
}
/deep/form.ant-form.ant-form-horizontal {
    display: flex;
    justify-content: center;
}
/deep/.ant-transfer-list-content-item:not(.ant-transfer-list-content-item-disabled):hover {
    background-color: #eeeeee;
    cursor: pointer;
    color: #000;
}
/deep/.ant-transfer-list-body-not-found {
    color: white;
}
</style>
