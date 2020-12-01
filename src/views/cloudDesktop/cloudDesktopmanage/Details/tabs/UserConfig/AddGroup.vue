<template>
  <div>
    <a-modal
      title="设置用户组"
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
              :data-source="GroupAll"
              show-search
              :list-style="{
                width: widths+'px',
                height: heights+ 'px',
                cursor:'all-scroll',
              }"
              :operations="['移入', '移出']"
              :titles="['全部用户组', '已设置的用户组']"
              :target-keys="Group"
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mixinFormModal } from '@/utils/mixin'
import { CloudDesktopPolicyPatch, CloudDesktopTaskGet } from '@/api/CloudDesktop/CloudDesktop'
import { usermanageListusergroup } from '@/api/CloudDesktop/usergroup'

export default {
    mixins: [mixinFormModal],
    data () {
        return {
			widths: 300,
			heights: 500,
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
            const GroupAll = this.deepGet(await usermanageListusergroup(), 'group', [])
            this.Group = this.deepGet(this.Tab_to_data, 'groups', []).map(u => u.sid)
            this.UsersSid = this.deepGet(this.Tab_to_data, 'users', []).map(u => u.sid)
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
                    try {
                        const id = this.deepGet(await CloudDesktopPolicyPatch(obj), 'task_id', '0')
                        const f = () => {
                            const timer = setTimeout(async () => {
                                const progress = this.deepGet(await CloudDesktopTaskGet({ id: id }), 'data', [])
                                if (progress.state !== 'SYSTEM_TASK_STATE_SUCCESS') {
                                    f()
                                } else {
                                    clearTimeout(timer)
                                    await this.$store.dispatch('GetTab2')
                                    this.$message.success('添加成功')
                                    this.confirmLoading = false
                                    this.$emit('ok')
                                    this.visible = false
                                }
                            }, 3000)
                        }
                        f()
                    } catch (error) {
                        this.$message.error('添加失败')
                        this.confirmLoading = false
                    }
                }
            })
        },
        handleChange (targetKeys, direction, moveKeys) {
            this.Group = targetKeys
        },
        async Gettask (item) {
            const progress = this.deepGet(await CloudDesktopTaskGet({ id: item }), 'data', [])
            if (progress.state !== 'SYSTEM_TASK_STATE_SUCCESS') {
                setTimeout(this.Gettask(item), 3000)
            }
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
