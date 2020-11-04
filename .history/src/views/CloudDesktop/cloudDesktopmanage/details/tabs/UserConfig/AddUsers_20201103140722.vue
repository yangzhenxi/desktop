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
</template>

<script>
import { mixinFormModal } from '@/utils/mixin'
import { CloudDesktopPolicyPatch, CloudDesktopPolicyList } from '@/api/CloudDesktop/CloudDesktop'
import { usermanageAllUser } from '@/api/CloudDesktop/userManage'
export default {
    mixins: [mixinFormModal],
    data () {
        return {
            UserAll: [],
            record: {},
            oldSid: [],
            confirmLoading: false
        }
    },
    methods: {
        async Add (record) {
          this.visible = true
          this.loading = true
          this.record = record
          this.UserAll = []
          const UserAll = this.deepGet(await usermanageAllUser(), 'list', [])
        //   let Users = this.deepGet(this.deepGet(await CloudDesktopPolicyList({ desktop_id: this.record.id }), 'data', []), 'users', [])
        //   let Group = this.deepGet(this.deepGet(await CloudDesktopPolicyList({ desktop_id: this.record.id }), 'data', []), 'groups', []).map(u => u.sid)
        //   this.UserAll = [...UserAll].filter(u => [...Users].every(y => y.sid !== u.object_sid))
        //   Users = Users.map(u => u.sid)
            UserAll.forEach(u => {
                const obj = {
                    key: u.object_sid,
                    title: u.name,
                    sid: u.object_sid,
                    disabled: false
                }
                this.UserAll.push(obj)
            })
        //   if (!Group) Group = []
        //   if (!Users) Users = []
        //   this.oldSid = [...Group, ...Users]
          this.loading = false
        },
        handleSubmit () {
            this.form.validateFields(async (errors, values) => {
                if (!errors) {
                    const obj = {
                        desktop_id: this.record.id
                    }
                    obj.sids = [...this.oldSid, ...values.sids]
                    this.confirmLoading = true
                    CloudDesktopPolicyPatch(obj).then(res => {
                            this.$message.success('添加成功')
                            this.confirmLoading = false
                            this.$emit('ok', res)
                            this.visible = false
                        })
                        .catch(() => {
                            this.confirmLoading = false
                        })
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>

</style>
