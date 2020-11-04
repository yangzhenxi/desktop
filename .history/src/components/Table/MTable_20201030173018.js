import T from 'ant-design-vue/es/table/Table'
import { MIcon } from '@/components'
import clonedeep from 'lodash.clonedeep'
import { deepGet, isEmpty, convert } from '@/utils/util'

export default {
  data () {
    return {
      localLoading: false,
      localFirstDataSource: [],
      localDataSource: [],
      localPagination: false,
      parameter: null,
      sorter: {
        field: ''
      }
    }
  },
  props: Object.assign({}, T.props, {
    rowKey: {
      type: String,
      default: 'id'
    },
    data: {
      type: Function,
      required: true
    },
    pageNum: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    showSizeChanger: {
      type: Boolean,
      default: true
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    rowClassName: {
      type: Function,
      default: (record, index) => index % 2 !== 0 ? 'table-row-odd' : ''
    }
  }),
  components: {
    MIcon
  },
  created () {
    if (this.showPagination) {
      this.localPagination = Object.assign({}, this.localPagination, {
        current: this.pageNum,
        pageSize: this.pageSize,
        showSizeChanger: this.showSizeChanger,
        showTotal: true
      }) || false
      this.parameter = {
        current: 1,
        pageSize: this.pageSize
      }
    }
    this.loadData()
  },
  methods: {
    /**
     * 表格重新加载方法
     * 如果参数为 true, 则强制刷新到第一页
     * @param Boolean bool
     */
    refresh (bool = true) {
      if (bool) {
        if (this.showPagination) {
          this.parameter = {
            current: 1,
            pageSize: this.pageSize
          }
          this.localPagination = Object.assign({}, this.parameter) || false
        }
        this.loadData()
      } else {
        this.loadData(bool)
      }
    },
    /**
     * 加载数据方法
     */
    loadData (bool = true) {
      this.localLoading = bool
      const result = this.data({})
      // 请求
      if ((typeof result === 'object' || typeof result === 'function') && typeof result.then === 'function') {
        result.then(r => {
          if (r) {
            const data = r.data
            this.localFirstDataSource = data // 总数据
            this.parameter = Object.assign({}, this.parameter, {
              queryParam: r.queryParam,
              sorter: this.parameter && this.parameter.sorter || r.sorter
            })
            this.localPagination = this.showPagination && Object.assign({}, this.localPagination, {
              current: this.parameter.current,
              pageSize: this.parameter.pageSize,
              total: r.data.length,
              showTotal: total => `共 ${total} 条数据`
            }) || false
            this.localDataSource = this.calculate(this.parameter)
            this.localLoading = false
            this.$emit('loaded', this.localDataSource)
          } else {
            this.localFirstDataSource = []
            this.localDataSource = []
            this.localLoading = false
            this.$emit('loaded', this.localDataSource)
          }
        })
      }
    },
    /**
     * @param {Object} pagination 分页选项器
     * @param {Object} filters 过滤条件
     * @param {Object} sorter 排序条件
     */
    changeData (pagination, filters, sorter) {
      this.localLoading = true
      // 列的 sortOrder 显示处理
      if (sorter.order) {
        // 重置前一次排序的 sortOrder
        if (this.sorter.field && this.sorter.field !== sorter.columnKey) {
          this.columns.find(c => c.dataIndex === this.sorter.field).sortOrder = false
        }
        this.columns.find(c => c.dataIndex === sorter.columnKey).sortOrder = sorter.order
        this.sorter = {
          field: sorter.columnKey,
          order: sorter.order
        }
      } else {
        // 重置前一次排序的 sortOrder
        if (this.sorter.field) {
          this.columns.find(c => c.dataIndex === this.sorter.field).sortOrder = false
        }
        this.sorter = {}
      }
      this.parameter = Object.assign({}, this.parameter, {
        current: (pagination && pagination.current),
        pageSize: (pagination && pagination.pageSize),
        sorter: this.sorter,
        ...filters
      })
      this.localDataSource = this.calculate(this.parameter)
      this.localPagination = this.showPagination && Object.assign({}, this.localPagination, {
        current: this.parameter.current,
        pageSize: this.parameter.pageSize
      }) || false
      this.localLoading = false
    },
    calculate (parameter) {
      const { current, pageSize, sorter, queryParam } = parameter
      let data = clonedeep(this.localFirstDataSource)
      // 查询
      if (!isEmpty(queryParam)) {
        data = data.filter(u => Object.keys(queryParam).every(i => `${deepGet(u, i)}`.indexOf(queryParam[i]) !== -1))
        this.localPagination = this.showPagination && Object.assign({}, this.localPagination, {
          total: data.length
        }) || false
      }
      // 排序
      if (!isEmpty(sorter)) {
        data = data.sort((e1, e2) => {
          const s1 = deepGet(e1, sorter.field)
          const s2 = deepGet(e2, sorter.field)
          if (sorter.order === 'ascend') {
            if (s1 > s2 || (s1 && !s2)) {
              return 1
            } else if (s1 < s2 || (!s1 && s2)) {
              return -1
            }
          } else {
            if (s1 < s2 || (!s1 && s2)) {
              return 1
            } else if (s1 > s2 || (s1 && !s2)) {
              return -1
            }
          }
        })
      }
      // 分页
      if (current && pageSize) {
        data = data.filter((u, index) => index >= (current - 1) * pageSize && index < current * pageSize)
      }
      return data
    }
  },
  render () {
    const props = {}
    const localKeys = Object.keys(this.$data)
    console.log(T.props)
    Object.keys(T.props).forEach(k => {
      const localKey = `local${k.substring(0, 1).toUpperCase()}${k.substring(1)}`
      if (localKeys.includes(localKey)) {
        props[k] = this[localKey]
        return props[k]
      }
      this[k] && (props[k] = this[k])
      return props[k]
    })
    this.$scopedSlots = Object.assign({}, {
      time: text => convert(text, 'unix')
    }, this.$scopedSlots)
    return (
      <div class="table-wrapper">
        <a-table {...{ props, scopedSlots: { ...this.$scopedSlots } }} onChange={this.changeData}>
          { Object.keys(this.$slots).map(name => (<template slot={name}>{this.$slots[name]}</template>)) }
        </a-table>
      </div>
    )
  }
}
