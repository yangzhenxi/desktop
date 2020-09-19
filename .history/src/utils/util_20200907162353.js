import moment from 'moment'
import os from 'os'
import dict from './dict'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

/**
 * 时间格式转换
 * @param { String } date 时间
 * @param { String } pattern 格式
 */
export function formatDate (date, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return date ? moment(date).format(pattern) : moment().format(pattern)
}

/**
 * 一段时间
 * @param { String } pattern 格式
 */
export function duringDate (pattern) {
  return [moment().startOf(pattern), moment().endOf(pattern)]
}

/**
 * 相对时间
 * @param { String } date 时间
 * @param { String } pattern 格式
 */
export function fromNow (date, suffix = false) {
  return moment(date).fromNow(suffix)
}

/**
 * unix 时间戳转换
 * @param { Number } unix 时间戳
 * @param { String } pattern 格式
 */
export function unixToDate (unix, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment.unix(unix).format(pattern)
}

/**
 * unix 时差
 * @param { Number } unix 时间戳
 * @param { String } pattern 格式
 */
export function unixDiff (unix) {
  const du = moment.duration(unix, 'seconds') // 做差
  const days = du.get('days')
  const hours = du.get('hours')
  const mins = du.get('minutes')
  const seconds = du.get('seconds')
  let result = ''
  if (days > 0) {
    result += days + ' 天'
  }
  if (hours > 0) {
    result += hours + ' 小时'
  }
  if (mins > 0) {
    result += mins + ' 分'
  }
  if (seconds > 0) {
    result += seconds + ' 秒'
  }
  if (!result) {
    result = '0 秒'
  }
  return result
}

/**
 * unix 时间戳转换
 * @param { Number } unix 时间戳
 * @param { String } pattern 格式
 */
export function dateToUnix (date) {
  return moment(date).unix()
}

/**
 * 时间 ADD
 * @param { Number } unix 时间戳
 * @param { String } pattern 格式
 */
export function addDate (date, n, unit = 'd') {
  return moment(date).add(n, unit)
}

// /**
//  * 字典转换
//  * @param { any } val 值
//  * @param { String } filter 过滤器
//  */
// export function toDict (val, filter) {
//   if (!val && val !== false && val !== 0) {
//     return '-'
//   }
//   if (!filter) {
//     return val
//   }
//   if (dict[filter]) {
//     return dict[filter].find(e => e.key === val)
//   } else {
//     return val
//   }
// }

/**
 * 过滤器
 * @param { any } val 值
 * @param { String } filter 过滤器
 * @param { String } args 过滤器参数
 */
export function convert (val, filter, args) {
  if (!val && val !== false && val !== 0) {
    return '-'
  }
  if (!filter) {
    return val
  }
  if (dict[filter]) {
    return deepGet(
      dict[filter].find(e => e.key === val),
      'val'
    )
  } else {
    switch (filter) {
      // 时间戳
      case 'text':
        return textTo(val, args)
      // 时间戳
      case 'unix':
        if (val === '0') {
          return '暂无数据'
        }
        return unixToDate(val, args)
      // 时间戳
      case 'dateToUnix':
        return dateToUnix(val, args)
      // 时间差
      case 'unixDiff':
        return unixDiff(val)
      // 压缩比
      case 'ratio':
        return `${val} : 1`
      // + 单位
      case 'unit':
        return `${val} ${args}`
      // 容量大小
      case 'unitSize':
        const size = unitSize(val, args)
        return `${size.size} ${size.unit}`
      // 速率大小
      case 'unitSpeed':
        const speed = unitSpeed(val, args)
        return `${speed.speed} ${speed.unit}`
      // 电压
      case 'unitVoltage':
        const voltage = unitVoltage(val, args)
        return `${voltage.voltage} ${voltage.unit}`
      // 功率
      case 'unitWatt':
        const watt = unitWatt(val, args)
        return `${watt.watt} ${watt.unit}`
      // 频率
      case 'unitHz':
        const hz = unitHz(val, args)
        return `${hz.hz} ${hz.unit}`
    }
  }
}

/**
 * 文本转换
 * @param { String } val 度量
 * @param { String | Array } args 单位
 */
export function textTo (val, args) {
  switch (args) {
    case 'password':
      return val.replace(/./g, '*')
    default:
      return val
  }
}

const measureList = [
  {
    key: 'size',
    measure: ['B', 'KB', 'MB', 'GB', 'TB', 'PB'],
    multiple: 1024
  },
  {
    key: 'speed',
    measure: ['B/s', 'KB/s', 'MB/s', 'GB/s'],
    multiple: 1000
  },
  {
    key: 'voltage',
    measure: ['MV', 'V', 'KV'],
    multiple: 1000
  },
  {
    key: 'watt',
    measure: ['W', 'KW'],
    multiple: 1000
  },
  {
    key: 'hz',
    measure: ['MHz', 'GHz', 'THz'],
    multiple: 1000
  }
]

/**
 * 度量转换
 * @param { Number } val 度量
 * @param { String | Array } args 单位
 */
function unitTo (val, args) {
  if (isNaN(parseInt(val))) {
    return { val }
  }
  //   console.log(args)
  const measureTo = args.measure
  const m = measureList.find(u => u.key === args.key)
  console.log(m)
  const measure = m.measure
  const multiple = m.multiple
  const _multiple = measure.map((u, i) => Math.pow(multiple, i))
  if (Array.isArray(measureTo)) {
    const m2 = measureTo[1] || measureTo[0]
    const m1 = measureTo[0] || measure[0]
    const q = _multiple[measure.findIndex(u => u === m2)] / _multiple[measure.findIndex(u => u === m1)]
    return {
      val: +(val / q).toFixed(2),
      measure: measure.find(u => u === m2)
    }
  } else {
    let i = measureTo ? measure.findIndex(u => u === measureTo) : 0
    let first = measure[i]
    if (parseInt(val) > 0) {
      while (parseInt(val / multiple) > 0 && i < measure.length - 1) {
        val = val / multiple
        first = measure[++i]
      }
    } else {
      while (parseInt(val * multiple) > 0 && i > 0) {
        val = val * multiple
        first = measure[--i]
      }
    }
    return {
      val: +val.toFixed(2),
      measure: first
    }
  }
}

/**
 * 容量转换(默认是B)
 * @param { Number } size 容量
 * @param { String | Array } args 单位
 */
export function unitSize (val, args) {
  const res = unitTo(val, { key: 'size', measure: args })
  return {
    size: res.val,
    unit: res.measure
  }
}

/**
 * 速率转换(默认是B/s)
 * @param { Number } speed 速率
 * @param { String | Array } args 单位
 */
export function unitSpeed (val, args) {
  const res = unitTo(val, { key: 'speed', measure: args })
  return {
    speed: res.val,
    unit: res.measure
  }
}

/**
 * 电压转换(默认是mV)
 * @param { Number } size 电压
 * @param { String | Array } args 单位
 */
export function unitVoltage (val, args) {
  const res = unitTo(val, { key: 'voltage', measure: args })
  return {
    voltage: res.val,
    unit: res.measure
  }
}

/**
 * 功率转换(默认是W)
 * @param { Number } size 功率
 * @param { String | Array } args 单位
 */
export function unitWatt (val, args) {
  const res = unitTo(val, { key: 'watt', measure: args })
  return {
    watt: res.val,
    unit: res.measure
  }
}

/**
 * 频率转换(默认是MHZ)
 * @param { Number } size 频率
 * @param { String | Array } args 单位
 */
export function unitHz (val, args) {
  const res = unitTo(val, { key: 'hz', measure: args })
  return {
    hz: res.val,
    unit: res.measure
  }
}

/**
 * 查询条件构建
 * @param { String } queryParam 查询条件
 * @param { String } pattern 格式
 */
export function queryBuild (queryParam, field = false) {
  const _queryParam = {}
  Object.keys(queryParam).map(u => {
    if (!queryParam[u] || queryParam[u] === '') {
      delete queryParam[u]
    } else {
      let prefix = ''
      if (field) {
        prefix = `${field}[${u}]`
      } else {
        prefix = u
      }
      _queryParam[prefix] = queryParam[u]
    }
  })
  return _queryParam
}

/**
 * 表格项构建
 * @param { String } queryParam 查询条件
 * @param { String } pattern 格式
 */
export function columnsBuild (column, module) {
  return column.filter(u => {
    const modules = deepGet(u, 'modules', [])
    if (modules.length > 0) {
      if (modules.includes(module)) {
        return true
      } else {
        return false
      }
    } else {
      return true
    }
  })
}

/**
 * 对象查找
 * @param { String } object 对象
 * @param { String | Array } path 路径
 * @param { String } defaultValue 默认值
 */
export function deepGet (object, path, defaultValue) {
  const s = (!Array.isArray(path)
    ? path
        .replace(/\[/g, '.')
        .replace(/\]/g, '')
        .split('.')
    : path
  ).reduce((o, k) => (o || {})[k], object)
  return s !== false && isEmpty(s) ? defaultValue : s
}

/**
 * 取值
 * @param { String } field 属性值
 * @param { String | Array } values 赋值或域
 */
export function Get (field, values) {
  if (!Array.isArray(values)) {
    return deepGet(values, field)
  } else {
    let res
    values.some(u => {
      res = deepGet(u, field)
      // false 也需要获得
      return res === false || !isEmpty(res)
    })
    return res
  }
}

/**
 * uuid
 */
export function uuid (length = 15) {
  var chars = 'abcdefghijklmnopqrstuvwxyz'.split('')
  var uuid = new Array(length)
  var rnd = 0
  var r
  for (var i = 0; i < length; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      uuid[i] = '-'
    } else {
      if (rnd <= 0x02) {
        rnd = (0x2000000 + Math.random() * 0x1000000) | 0
      }
      r = rnd & 0xf
      rnd = rnd >> 4
      uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]
    }
  }
  return uuid
    .join('')
    .replace(/-/gm, '')
    .toLowerCase()
}

/**
 * 数组去重
 * @param { Array } Array 数组
 */
export function uniq (array) {
  return [...new Set(array)]
}

/**
 * 是否为空
 * @param { Object } o 对象
 */
export function isEmpty (o) {
  const type = Object.prototype.toString.call(o)
  switch (type) {
    case '[object Boolean]':
      return !o
    case '[object Number]':
      return false
    case '[object String]':
      return o === ''
    case '[object Undefined]':
      return true
    case '[object Null]':
      return true
    case '[object Array]':
      return o.length === 0
    case '[object Object]':
      return Object.keys(o).length === 0
    case '[object Function]':
      return false
    case '[object Symbol]':
      return false
  }
}

/**
 * 防抖
 * @param { Function } callback
 * @param { Number } delay
 */
export const debounce = (func, wait = 500) => {
  let timer = null
  return function () {
    const args = arguments
    const context = this
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }
}

/**
 * 限流
 * @param { Function } callback
 * @param { Number } delay
 */
export function throttle (callback, duration = 500) {
  var lastTime = new Date().getTime()
  return function () {
    var now = new Date().getTime()
    if (now - lastTime > duration) {
      callback()
      lastTime = now
    }
  }
}

export function handleScrollHeader (callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function isIE () {
  const bw = window.navigator.userAgent
  const compare = s => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * 获取本机ip
 */
export function getIP () {
  return process.env.VUE_APP_WEBSOCKET_EVENT
    ? process.env.VUE_APP_WEBSOCKET_EVENT
    : `ws://${os.hostname()}/v1/Event/watch`
}

export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome () {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate (id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

/**
 * @arr 原数组
 * @delVal 要删除的元素
 */
export function arrayRemoveItem (arr, delVal) {
  if (arr instanceof Array) {
    var index = arr.indexOf(delVal)
    if (index > -1) {
      arr.splice(index, 1)
    }
  }
}

/**
 *
 */
export function isContained (a, b) {
  if (!(a instanceof Array) || !(b instanceof Array)) return false
  if (a.length < b.length) return false
  var aStr = a.toString()
  for (var i = 0, len = b.length; i < len; i++) {
    if (aStr.indexOf(b[i]) === -1) return false
  }
  return true
}
