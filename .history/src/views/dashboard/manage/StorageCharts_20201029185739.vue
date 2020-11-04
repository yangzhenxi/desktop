<template>
  <div>
    <!-- 图表 -->
    <div style="width:100%">
      <div>
        <v-chart :forceFit="true" :height="height" :data="data">
          <v-tooltip />
          <v-axis />
          <v-legend />
          <v-bar position="月份*月均降雨量" color="name" :adjust="adjust" />
        </v-chart>
      </div>
    </div>
  </div>
</template>

<script>
const DataSet = require('@antv/data-set')
const pieScale = [
  {
    dataKey: 'percent',
    min: 0,
    formatter: '.0%'
  }
]

export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      chartsData: [],
      pieData: null,
      pieScale
    //   color: ['percent', '#12bd5ec7', '#e2e2e2', '#f59ea7c7']
    }
  },
  mounted () {},
  created () {
    this.getChartsdata()
  },
  methods: {
    getChartsdata () {
      const dv = new DataSet.View().source(this.data)
      dv.transform({
        type: 'percent',
        field: 'count',
        dimension: 'item',
        as: 'percent'
      })
      this.pieData = dv.rows
    }
  }
}
</script>

<style lang="less" scoped>
</style>
