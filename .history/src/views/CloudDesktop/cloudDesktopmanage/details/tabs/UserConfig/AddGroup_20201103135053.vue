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

    <br>
    <br>

    <!-- <a-modal
      title="设置用户组"
      :width="640"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel"
      destroyOnClose>
      <a-spin :spinning="loading">
        <a-form
          :form="form"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-form-item label="添加绑定的用户组">
            <a-select
              mode="multiple"
              placeholder="请选择绑定的用户组"
              v-decorator="['sids', { rules: [{required: true, message: '请选择绑定的用户组'}] }]">
              <a-select-option
                v-for="(i,index) in GroupAll"
                :key="index"
                :value="i.object_sid">{{ i.name }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal> -->
  </div>
</template>

<script>
import { mixinFormModal } from '@/utils/mixin'
import { CloudDesktopPolicyPatch, CloudDesktopPolicyList } from '@/api/CloudDesktop/CloudDesktop'
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
            oldSid: []
        }
    },
    methods: {
        async Add (record) {
            this.visible = true
            this.loading = true
            this.record = record
            const GroupAll = this.deepGet(await usermanageListusergroup(), 'group', [])
            this.Group = this.deepGet(this.deepGet(await CloudDesktopPolicyList({ desktop_id: this.record.id }), 'data', []), 'groups', [])
            // let Users = this.deepGet(this.deepGet(await CloudDesktopPolicyList({ desktop_id: this.record.id }), 'data', []), 'users', []).map(u => u.sid)
        //   this.GroupAll = [...GroupAll].filter(u => [...this.Group].every(y => y.sid !== u.object_sid))
            GroupAll.forEach(u => {
                const obj = {
                    key: u.baseDN,
                    title: u.name,
                    sid: u.object_sid,
                    disabled: false
                }
                this.GroupAll.push(obj)
            })
            // let Group = this.Group.map(u => u.sid)
            // if (!Group) Group = []
            // if (!Users) Users = []
            // this.oldSid = [...Group, ...Users]
            this.loading = false
        },
        handleSubmit () {
            // this.confirmLoading = true
            this.form.validateFields(async (errors, values) => {
                if (!errors) {
                    const obj = { desktop_id: this.record.id }
                    console.log(this.GroupAll)
                    console.log(this.Group)
                    this.Group.forEach(u => {
                        console.log(u)
                        obj.sids.push(u.sid)
                    })
                    // obj.sids = [...this.oldSid, ...values.sids]
                    CloudDesktopPolicyPatch(obj).then(res => {
                            // this.$message.success('添加成功')
                            // this.$emit('ok', res)
                            // this.visible = false
                            // this.confirmLoading = false
                    }).catch(() => {
                        // this.confirmLoading = false
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

</style>
