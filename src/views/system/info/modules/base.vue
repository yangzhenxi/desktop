<template>
  <div class="user-wrapper">
    <a-spin :spinning="loading">
      <ul class="setting-list">
        <li v-for="item in data" :key="item.key" class="li">
          <span class="title">{{ item.title }}</span>
          <div class="value">{{ item.val }}</div>
        </li>
      </ul>
    </a-spin>
  </div>
</template>

<script>
import { unixToDate, deepGet } from '@/utils/util'
import { systemUserInfo } from '@/api/system/user'

export default {
  name: 'UserCenterBase',
  data () {
    return {
      columns: [
        {
          key: 'name',
          title: '姓名'
        },
        {
          key: 'username',
          title: '用户名'
        },
        {
          key: 'role.name',
          title: '角色'
        },
        {
          key: 'locked',
          title: '状态'
        },
        {
          key: 'created',
          title: '创建时间'
        }
      ],
      data: [],
      loading: false
    }
  },
  created () {
    this._getUser()
  },
  methods: {
    async _getUser () {
      try {
        this.loading = true
        const res = await systemUserInfo()
        const user = res && res.data
        console.log(user)
        user.created = unixToDate(user.created)
        this.columns.map(u => {
          this.data.push({
            ...u,
            val: deepGet(user, u.key)
          })
        })
        // console.log(this.data)
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .user-wrapper {
    .setting-list {
      padding: 0;
       .li {
        display: flex;
        align-items: center;
        position: relative;
        padding: 20px;
        .title {
          flex: 0 0 100px;
          width: 100px;
          font-weight: 600;
        }
        .value {
          flex: 1;
          line-height: 25px;
          color: #909090;
        }
      }
    }
  }
</style>
