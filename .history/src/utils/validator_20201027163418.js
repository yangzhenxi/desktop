/**
 * 名称验证
 *  @param {*} 验证参数
 */
export function nameValidator (rule, value, callback) {
    const pattern = /^[a-zA-Z0-9,./;'[\]!@#$%^&*()_+-=/`]*$/
    if (!pattern.test(value)) {
        callback(new Error('名称必须由字母、数字和英文符号组成！'))
    }
    callback()
}
/**
 * 空格校验
 *  @param {*} 验证参数
 */
export function blankValidator (rule, value, callback) {
    const pattern = /^[^\s]*$/
    if (!pattern.test(value)) {
        callback(new Error('名称不能带空格！'))
    }
    callback()
}
/**
 * 名称验证
 *  @param {*} 名称前缀校验
 */
export function namingScheme (rule, value, callback) {
    const pattern = /^[a-zA-Z][a-zA-Z0-9]{0,12}$/
    if (!pattern.test(value)) {
        callback(new Error('不能包含特殊字符和中文且不能数字开头,长度为1-13'))
    }
    callback()
}
// 重复名称
export async function nameRepeatValidator ({ data, message = '名称已存在，请重新输入！', initialValue, field = 'name' }, { rule, value, callback }) {
    try {
      if (initialValue && value === initialValue) {
        callback()
      }
      const patt = /^[A-Za-z0-9\u4e00-\u9fa5]+/
      if (!patt.test(value)) {
        callback(new Error('不能输入特殊字符'))
      }
      const pattern = /^[^\s]*$/
      if (!pattern.test(value)) {
          callback(new Error('名称不能带空格！'))
      }
      if (value.length > 24) {
        callback(new Error('长度不得大于24'))
      }
      const r = await data()
      const target = r.find(u => u[field].toUpperCase() === value.toUpperCase())
      if (target) {
        callback(new Error(message))
      }
    } catch (error) {
      callback()
    }
    callback()
  }
/**
 * 手机号码验证
 * @param {*} value
 */

export function telValidator (rule, value, callback) {
    const pattern = /^1[0-9]{10}$/
    if (!pattern.test(value)) {
        if (value === '' || value === undefined) {

        } else {
            callback(new Error('手机号码格式不对，请重新输入'))
        }
    }
    callback()
}

/**
 * Ip验证
 * @param {*} 验证参数
 */
export function IpValidator (rule, value, callback) {
    const pattern = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)($|(?!\.$)\.)){4}$/
    if (!pattern.test(value)) {
        callback(new Error('Ip格式错误'))
    }
    callback()
}
/**
 * 邮箱验证
 * @param {*} 验证参数
 */
export function EmailValidator (rule, value, callback) {
    var pattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    if (!pattern.test(value)) {
        if (value === '' || value === undefined) {

        } else {
            callback(new Error('邮箱格式错误'))
        }
    }
    callback()
}

// 重复名称不可以输入特殊字符
export async function nameRepeatspecialValidator ({ data, message = '名称已存在，请重新输入！', initialValue, field = 'name' }, { rule, value, callback }) {
    try {
      if (initialValue && value.toUpperCase() === initialValue.toUpperCase()) {
        callback()
      }
      const patterns = /^[^\s]*$/
      if (!patterns.test(value)) {
          callback(new Error('名称不能带空格！'))
      }
      const pattern = /^[a-zA-Z][A-Za-z0-9]+$/
      if (!pattern.test(value)) {
          callback(new Error('用户名必须以字母开头，且仅有英文和数字'))
      }
      const r = await data()
      const target = r.find(u => u[field].toUpperCase() === value.toUpperCase())
      if (target) {
        callback(new Error(message))
      }
    } catch (error) {
      callback()
    }
    callback()
  }

/**
 * Tree操作的校验 不区分大小写
 *  @param {*} 验证参数
 */
export async function DesktopnameValidator ({ data, message = '名称已存在，请重新输入！', initialValue, field = 'name' }, { rule, value, callback }) {
    try {
      if (initialValue && value === initialValue) {
        callback()
      }
      const patterns = /^[^\s]*$/
      if (!patterns.test(value)) {
          callback(new Error('名称不能带空格！'))
          return false
      }
      const pattern = /^[\u4e00-\u9fa5a-zA-Z][\u4e00-\u9fa5a-zA-Z0-9]$/
      if (!pattern.test(value)) {
          callback(new Error('名称不能有特殊字符，且不能数字开头,长度在1-13个字符以内'))
          return false
      }
      const result = deepGet(await CloudDesktopTestName({ 'name': value }), 'data')
      if (!result) {
          callback(new Error('名称已存在，请重新输入'))
          return false
      }
    } catch (error) {
      callback()
    }
    callback()
}
/**
 * Tree操作的校验 不区分大小写
 *  @param {*} 验证参数
 */
export async function TreeValidator ({ data, message = '名称已存在，请重新输入！', initialValue, field = 'name' }, { rule, value, callback }) {
    try {
      if (initialValue && value.toUpperCase() === initialValue.toUpperCase()) {
        callback()
      }
      const patt = /^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/
      if (!patt.test(value)) {
        callback(new Error('不能输入特殊字符'))
      }
      const pattern = /^[^\s]*$/
      if (!pattern.test(value)) {
          callback(new Error('名称不能带空格！'))
      }
      const r = await data()
      const target = r.find(u => u[field].toUpperCase() === value.toUpperCase())
      if (target) {
        callback(new Error(message))
      }
    } catch (error) {
      callback()
    }
    callback()
}
