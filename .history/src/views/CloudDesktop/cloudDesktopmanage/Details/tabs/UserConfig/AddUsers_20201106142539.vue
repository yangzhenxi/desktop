<template>
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
          :data-source="UserAll"
          show-search
          :list-style="{
            width: '250px',
            height: '300px',
          }"
          :operations="['移入', '移出']"
          :titles="['全部用户', '配置的用户']"
          :target-keys="Users"
          :render="item => item.title"
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
import { mapState } from 'vuex'
import { mixinFormModal } from '@/utils/mixin'

import { CloudDesktopPolicyPatch, CloudDesktopTaskGet } from '@/api/CloudDesktop/CloudDesktop'
import { usermanageAllUser } from '@/api/CloudDesktop/userManage'
export default {
    mixins: [mixinFormModal],
    data () {
        return {
            UserAll: [],
            Users: [],
            record: {},
            oldSid: [],
            confirmLoading: false,
            GroupSid: []
        }
    },
    computed: {
        ...mapState({
            Tab_to_data: state => state.cloudDesktop.Tab_to_data
        })
    },
    methods: {
        async Add (record) {
            this.visible = true
            this.loading = true
            this.record = record
            this.UserAll = []
            const UserAll = this.deepGet(await usermanageAllUser(), 'list', [])
            this.Group = this.deepGet(this.Tab_to_data, 'groups', []).map(u => u.sid)
            this.UsersSid = this.deepGet(this.Tab_to_data, 'users', []).map(u => u.sid)
            UserAll.forEach(u => {
                const obj = {
                    key: u.object_sid,
                    title: u.username,
                    sid: u.object_sid,
                    disabled: false
                }
                this.UserAll.push(obj)
            })
          this.loading = false
        },
        handleSubmit () {
            this.form.validateFields(async (errors, values) => {
                if (!errors) {
                    const obj = { desktop_id: this.record.id }
                    obj.sids = [...this.Users, ...this.GroupSid]
                    this.confirmLoading = true
                    try {
                         const id = this.deepGet(await CloudDesktopPolicyPatch(obj), 'task_id', '0')
                    } catch (error) {

                    }
                    await CloudDesktopPolicyPatch(obj).then(async res => {
                        await this.$store.dispatch('GetTab2').then(u => {
                            this.$message.success('添加成功')
                            this.confirmLoading = false
                            this.$emit('ok', u)
                            this.visible = false
                        })
                    })
                    .catch(() => {
                        this.confirmLoading = false
                    })
                }
            })
        },
        handleChange (targetKeys, direction, moveKeys) {
            this.Users = targetKeys
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
