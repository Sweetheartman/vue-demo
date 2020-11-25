import * as app from '@/utils/app.js'
import dict from '@/utils/dict'

const nvl2 = function(str1, str2, str3) {
  return str1 || (str2 || str3)
}

/**
 * 类似Oracle的decode函数
 * (条件,值1,返回值1,值2,返回值2,...值n,返回值n,缺省值)
 * @returns {any}
 */
const contrastDecode = function() {
  if (arguments.length % 2 === 0) {
    for (let i = 0; i < arguments.length; i++) {
      if (arguments[i * 2 + 1]) {
        if (arguments[i * 2 + 1] === arguments[0]) {
          return arguments[i * 2 + 2]
        }
      }
    }
    return arguments[arguments.length - 1]
  }
}

const notice = function(type, msg) {
}

const modal = function(type, msg, handleOk, handleCancel) {
}

const tree2arr = function(data) {
  // 从树形结构转换为数组
  let arr = []
  if (data instanceof Array) {
    data.map(item => {
      arr = arr.concat(this.tree2arr(item))
    })
  } else if (data instanceof Object) {
    arr.push(data)
    if (!data.children || (data.children && !data.children.length)) {
      return arr
    } else {
      arr = arr.concat(this.tree2arr(data.children))
    }
  }
  return arr
}

const dateFtt = (fmt, date) => {
  if (!date.getTime()) return null
  // author: meizz
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}

const findObj = (arr, value, key) => {
  let r = null
  arr.some(item => {
    if (item[key] === value) {
      r = item
      return true
    }
    return false
  })
  return r
}

const pickerOptions = {
  shortcuts: [
    {
      text: '今天',
      onClick(picker) {
        const end = new Date()
        const start = new Date(new Date().toLocaleDateString())
        picker.$emit('pick', [start, end])
      }
    }, {
      text: '最近一周',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        picker.$emit('pick', [start, end])
      }
    }, {
      text: '最近一个月',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        picker.$emit('pick', [start, end])
      }
    }, {
      text: '最近三个月',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
        picker.$emit('pick', [start, end])
      }
    }]
}

export default function() {
  return {
    data() {
      return {
        app: app,
        dict: dict,
        pickerOptions: pickerOptions
      }
    },
    methods: {
      findObj,
      dateFtt,
      notice,
      modal,
      tree2arr,
      nvl2,
      contrastDecode
    }
  }
}
