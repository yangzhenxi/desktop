import T from 'ant-design-vue/es/table/Table'
import { convert } from '@/utils/util'

export default {
  data () {
    return {
      localLoading: false,
      localDataSource: [],
      localPagination: Object.assign({}, this.pagination)
    }
  },
  props: Object.assign({}, T.props, {
    rowKey: {
      type: [String, Function],
      default: 'key'
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
    // size: {
    //   type: String,
    //   default: 'default'
    // },
    /**
     * alert: {
     *   show: true,
     *   clear: Function
     * }
     */
    // alert: {
    //   type: [Object, Boolean],
    //   default: null
    // },
    // rowSelection: {
    //   type: Object,
    //   default: null
    // },
    // /** @Deprecated */
    // showAlertInfo: {
    //   type: Boolean,
    //   default: false
    // },
    showPagination: {
      type: String | Boolean,
      default: 'auto'
    },
    rowClassName: {
        type: Function,
        default: (record, index) => index % 2 !== 0 ? 'table-row-odd' : ''
    }
  }),
  created () {
    this.localPagination = this.showPagination && Object.assign({}, this.localPagination, {
      current: this.pageNum,
      pageSize: this.pageSize,
      showSizeChanger: this.showSizeChanger
    }) || false
    this.loadData()
  },
  methods: {
    /**
     * 表格重新加载方法
     * 如果参数为 true, 则强制刷新到第一页
     * @param Boolean bool
     */
    refresh (bool = false) {
      bool && (this.localPagination = Object.assign({}, {
        current: 0, pageSize: this.pageSize
      }))
      this.loadData()
    },
    /**
     * 加载数据方法
     * @param {Object} pagination 分页选项器
     * @param {Object} filters 过滤条件
     * @param {Object} sorter 排序条件
     */
    loadData (pagination, filters, sorter) {
      this.localLoading = true
      const parameter = Object.assign({
        page: (pagination && pagination.current) ||
          this.showPagination && this.showPagination.current || this.pageNum,
        size: (pagination && pagination.pageSize) ||
          this.showPagination && this.localPagination.pageSize || this.pageSize
      },
      (sorter && sorter.field && {
        sortField: sorter.field
      }) || {},
      (sorter && sorter.order && {
        sortOrder: sorter.order
      }) || {}, {}
      )
      parameter.page = parameter.page - 1
      const result = this.data(parameter)
      // 对接自己的通用数据接口需要修改下方代码中的 r.pageNo, r.totalCount, r.data
      // eslint-disable-next-line
      if ((typeof result === 'object' || typeof result === 'function') && typeof result.then === 'function') {
        result.then(r => {
          this.localPagination = this.showPagination && Object.assign({}, this.localPagination, {
            current: parameter.page, // 返回结果中的当前分页数
            total: +r.count, // 返回结果中的总记录数
            pageSize: (pagination && pagination.pageSize) ||
              this.localPagination.pageSize,
              showTotal: total => `共${total}条数据`
          }) || false
          this.localDataSource = r.data // 返回结果中的数组数据
          this.localLoading = false
        })
      }
    }
  },

  render () {
    const props = {}
    const localKeys = Object.keys(this.$data)

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
    const table = (
      <a-table {...{ props, scopedSlots: { ...this.$scopedSlots } }} onChange={this.loadData} onExpand={ (expanded, record) => { this.$emit('expand', expanded, record) } }>
        { Object.keys(this.$slots).map(name => (<template slot={name}>{this.$slots[name]}</template>)) }
      </a-table>
    )

    return (
      <div class="table-wrapper">
        { table }
      </div>
    )
  }
}
