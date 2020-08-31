<template>
  <a-checkbox-group v-model="value">
    <a-row>
      <a-col :span="8">
        <a-checkbox value="A" @change="handlecheckbox">
          A
        </a-checkbox>
      </a-col>
      <a-col :span="8">
        <a-checkbox value="B" @change="handlecheckbox">
          B
        </a-checkbox>
      </a-col>
      <a-col :span="8">
        <a-checkbox value="C" @change="handlecheckbox">
          C
        </a-checkbox>
      </a-col>
      <a-col :span="8">
        <a-checkbox value="D" @change="handlecheckbox">
          D
        </a-checkbox>
      </a-col>
      <a-col :span="8">
        <a-checkbox value="E" @change="handlecheckbox">
          E
        </a-checkbox>
      </a-col>
    </a-row>
  </a-checkbox-group>
</template>
<script>
export default {
  data () {
    return {
      value: []
    }
  },
  watch: {

  },
  methods: {
      handlecheckbox (e) {
          console.log(e)
          console.log(this.value)
          this.value = []
      }
  }
}
</script>
