<template>
  <a-row :gutter="16">
    <a-radio-group v-model="value">
      <a-col :span="span" v-for="(item,index) in modulesData" :key="index" @click="checked(index)">
        <a-row class="modules">
          <a-col :span="8">
            <m-icon
              type="windows1"
              class="windows1"></m-icon>
          </a-col>
          <a-col :span="16">
            <div class="title">{{ item.title }}</div>
            <div class="text">
              <span>所属分组: </span>
              <span>{{ item.text.Belonging }}</span>
            </div>
            <div class="text">
              <span>创建者: </span>
              <span>{{ item.text.creator }}</span>
            </div>
            <div class="text">
              <span>桌面数量: </span>
              <span>{{ item.text.DesktopsNum }}</span>
            </div>
            <div class="text">
              <span>所在服务器: </span>
              <span>{{ item.text.server }}</span>
            </div>
            <div class="text">
              <span>创建时间: </span>
              <span>{{ item.text.date }}</span>
            </div>
            <div class="text">
              <span>版本状态: </span>
              <span>{{ item.text.status }}</span>
            </div>
          </a-col>
          <a-radio class="radio" :value="index"></a-radio>
        </a-row>
      </a-col>
    </a-radio-group>
  </a-row>
</template>

<script>
import MIcon from '@/components/Icon'

export default {
  components: {
    MIcon
  },
  props: {
      checkedRightval: {
          type: String,
            required: true
      },
      modulesData: {
          type: Array,
          required: true
      },
      span: {
          type: String,
          required: true
      }

  },
  data () {
    return {
        value: this.checkedRightval
    }
  },
  methods: {
    checked (index) {
        this.value = index
      this.$emit('changecheckedval', index.toString())
    }
  }
}
</script>

<style lang="less" scoped>
.modules {
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  position: relative;
  color: white;
  .title {
    margin-top: 20px;
  }
  .text {
    font-size: 15px;
    margin: 5px 0px;
  }
  .text:last-child {
    margin-bottom: 20px;
  }
}
.windows1 {
  margin-top: 50px;
  font-size: 72px;
  width: 100%;
}

.radio {
  position: absolute;
  top: 0;
  left: 95%;
}
/deep/.ant-radio-group{
    width:100%;
}
</style>
