<template>
  <div>
    <v-chart :forceFit="true" :height="height" :data="data">
      <v-tooltip />
      <v-axis dataKey="月份" :label="label" />
      <v-axis dataKey="月均降雨量" :label="label" />
      <v-legend />
      <v-bar position="月份*月均降雨量" :color="color" />
    </v-chart>
    <br>
    <v-chart :forceFit="true" :height="height" :data="data">
      <v-tooltip />
      <v-axis />
      <v-legend />
      <v-stack-bar position="月份*月均降雨量" color="name" />
    </v-chart>
  </div>
  <div>

  </div>
</template>

<script>
  const DataSet = require('@antv/data-set')
  export default {
    name: 'StorageCharts',
    props: {
        dataSource: {
            type: Object,
            required: true
        }
    },
    data () {
      return {
        data: [],
        height: 500,
        label: {
            textStyle: {
                fill: '#fff'
            }
        },
        color: ['name', ['#0c84c6', '#ffa510']]
      }
    },
    mounted () {
        const dv = new DataSet.View().source(this.dataSource.ChartsData)
        dv.transform({
            type: 'fold',
            fields: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.'],
            key: '月份',
            value: '月均降雨量'
        })
        this.data = dv.rows
    }
}
</script>
