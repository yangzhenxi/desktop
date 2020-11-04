<template>
  <div>
    <v-chart :forceFit="true" :height="height" :data="data">
      <v-tooltip />
      <v-axis dataKey="月份" :label="label" />
      <v-axis dataKey="月均降雨量" :label="label" />
      <v-legend />
      <v-bar position="月份*月均降雨量" :color="color" />
    </v-chart>
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
        height: 510,
        label: {
            textStyle: {
                fill: '#fff'
            }
        },
        color: ['name', ['#0c84c6', '#ffa510']],
        adjust: [{
          type: 'dodge'
        //   marginRatio: 1 / 32
        }]
      }
    },
    mounted () {
        // const dv = new DataSet.View().source(this.dataSource.ChartsData)
        // dv.transform({
        //     type: 'fold',
        //     fields: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.'],
        //     key: '月份',
        //     value: '月均降雨量'
        // })
        // this.data = dv.rows
          const sourceData = [
    { name: 'London', 'Jan.': 18.9, 'Feb.': 28.8, 'Mar.': 39.3, 'Apr.': 81.4, 'May': 47, 'Jun.': 20.3, 'Jul.': 24, 'Aug.': 35.6 },
    { name: 'Berlin', 'Jan.': 12.4, 'Feb.': 23.2, 'Mar.': 34.5, 'Apr.': 99.7, 'May': 52.6, 'Jun.': 35.5, 'Jul.': 37.4, 'Aug.': 42.4 }
  ]

  const dv = new DataSet.View().source(sourceData)
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
