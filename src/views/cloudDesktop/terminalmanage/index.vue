<template>
  <page-header-wrapper>

    终端管理
  </page-header-wrapper>
</template>

<script>
// import request from '@/utils/request'
import axios from 'axios'
import { Login } from '@/api/system/role'

export default {
    created () {
        // this.login()
        const obj = {
            username: 'admin',
            password: 'Passw0rd'
        }
        Login(obj).then(res => {
            console.log(res)
        })
    },
    methods: {
        login () {
            const person = require('@/proto/proto')
            const protobufRoot = require('protobufjs').Root
            const protobuf = require('protobufjs')
            const root = protobufRoot.fromJSON(person)
            const userInfo = root.lookupType('AccountLoginReq')
            const BaseResponse = root.lookupType('AccountLoginResp')
            const infoData = { username: 'admin', password: 'Passw0rd!' }
            const infoEncodeMessage = userInfo
            .encode(userInfo.create(infoData))
            .finish()
              const blob = new Blob([infoEncodeMessage], { type: 'buffer' })
                const httpService = axios.create({
                timeout: 45000,
                method: 'post',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/protobuf'
                },
                responseType: 'arraybuffer'
            })
             httpService.post('/api/system.v1.Account/Login', blob).then(e => {
          // 将二进制数据生成js对象
            console.log(e)
              const buf = protobuf.util.newBuffer(e.data)
              const res = BaseResponse.decode(buf)
            //   const person = userInfo.decode(res.data.value)
              console.log(res)
        })
        }
    }
}
</script>

<style>

</style>
