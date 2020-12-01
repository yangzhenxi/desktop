<template>
  <a-modal
    title="设置用户"
    :width="830"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    destroyOnClose>
    <a-spin :spinning="loading">
      <a-form :form="form">
        <div @mousedown="move">
          <a-transfer
            :data-source="UserAll"
            show-search
            :list-style="{
              width: widths+'px',
              height: heights+ 'px',
              cursor:'all-scroll',
            }"
            :operations="['移入', '移出']"
            :titles="['全部用户', '已设置的用户 ']"
            :target-keys="Users"
            :render="item => item.title"
            @change="handleChange">
            <span slot="notFoundContent">
              没数据
            </span>
          </a-transfer>
        </div>
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
			widths: 300,
			heights: 500,
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
            this.Users = this.deepGet(this.Tab_to_data, 'users', []).map(u => u.sid)
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
                        const Settime = await setInterval(async () => {
                            const progress = this.deepGet(await CloudDesktopTaskGet({ id: id }), 'data', [])
                            if (progress.state === 'SYSTEM_TASK_STATE_SUCCESS') {
                                clearInterval(Settime)
                                await this.$store.dispatch('GetTab2')
                                this.$message.success('操作成功')
                                this.confirmLoading = false
                                this.$emit('ok')
                                this.visible = false
                            }
                        }, 3000)
                    } catch (error) {
                        this.$message.error('操作失败')
                        this.confirmLoading = false
                    }
                }
            })
        },
        handleChange (targetKeys, direction, moveKeys) {
            this.Users = targetKeys
		},
		move (e) {
			const oDiv = e.target
			const disX = e.clientX - oDiv.offsetLeft
			const disY = e.clientY - oDiv.offsetTop
			document.onmousemove = (e) => { // 鼠标按下并移动的事件
			// 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
			// this.widths = 250 + e.clientX - disX
			const width = 250 + e.clientX - disX
			width > 350 ? this.widths = 350 : width <= 250 ? this.wdiths = 250 : this.widths = width
			this.heights = 300 + e.clientY - disY
			}
			document.onmouseup = (e) => {
				document.onmousemove = null
				document.onmouseup = null
			}
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
