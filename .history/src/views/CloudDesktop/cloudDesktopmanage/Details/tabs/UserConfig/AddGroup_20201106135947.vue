<template>
  <div>
    <a-modal
      title="设置用户组"
      :width="700"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel"
      destroyOnClose>
      <a-spin :spinning="loading">
        <a-form :form="form">
          <a-transfer
            :data-source="GroupAll"
            show-search
            :list-style="{
              width: '250px',
              height: '300px',
            }"
            :operations="['移入', '移出']"
            :titles="['全部用户组', '设置的用户组']"
            :target-keys="Group"
            :render="item => item.title"
            @change="handleChange">
            <span slot="notFoundContent">
              没数据
            </span>
          </a-transfer>
        </a-form>
      </a-spin>
    </a-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mixinFormModal } from '@/utils/mixin'
import { CloudDesktopPolicyPatch } from '@/api/CloudDesktop/CloudDesktop'
import { usermanageListusergroup } from '@/api/CloudDesktop/usergroup'

export default {
    mixins: [mixinFormModal],
    data () {
        return {
            GroupAll: [],
            Group: [],
            record: {},
            loading: false,
            confirmLoading: false,
            UsersSid: []
        }
    },
    computed: {
        ...mapState({ Tab_to_data: state => state.cloudDesktop.Tab_to_data })
    },
    methods: {
        async Add (record) {
            this.visible = true
            this.loading = true
            this.record = record
            this.GroupAll = []
            console.log(this.Tab_to_data)
            const GroupAll = this.deepGet(await usermanageListusergroup(), 'group', [])
            this.Group = this.deepGet(this.deepGet(this.Tab_to_data, 'groups', [])).map(u => u.sid)
            this.UsersSid = this.deepGet(this.deepGet(this.Tab_to_data, 'data', []), 'users', []).map(u => u.sid)
            GroupAll.forEach(u => {
                const obj = {
                    key: u.object_sid,
                    title: u.name,
                    sid: u.object_sid,
                    disabled: false
                }
                this.GroupAll.push(obj)
            })
            this.loading = false
        },
        handleSubmit () {
            this.confirmLoading = true
            this.form.validateFields(async (errors, values) => {
                if (!errors) {
                    const obj = { desktop_id: this.record.id }
                    obj.sids = [...this.UsersSid, ...this.Group]
                    CloudDesktopPolicyPatch(obj).then(async res => {
                        await this.$store.dispatch('GetTab2').then(u => {
                            this.$message.success('添加成功')
                            this.confirmLoading = false
                            this.$emit('ok', u)
                            this.visible = false
                        })
                    }).catch(() => {
                        this.confirmLoading = false
                    })
                }
            })
        },
        handleChange (targetKeys, direction, moveKeys) {
            this.Group = targetKeys
        }
    }
}
</script>

<style lang="less" scoped>
/deep/li.ant-transfer-list-content-item {
  color: white;
}
/deep/.ant-transfer-list-header {
  color: white !important;
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
/deep/li.ant-transfer-list-content-item.ant-transfer-list-content-item-disabled {
  color: #6a6d74;
}
/deep/.ant-modal-title,
/deep/.ant-modal-close-x{
  color: white;
}
</style>
