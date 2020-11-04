<template>
  <div>
    <!-- 图表 -->
    <div style="width:100%">
      <v-chart
        padding="auto"
        :forceFit="true"
        :height="220"
        :data="pieData"
        :scale="pieScale">
        <v-tooltip
          :showTitle="false"
          dataKey="item*percent" />
        <v-axis />
        <v-legend dataKey="item" />
        <v-pie
          position="percent"
          color="item" />
        <v-coord
          type="theta"
          :radius="0.75"
          :innerRadius="0" />
      </v-chart>
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
