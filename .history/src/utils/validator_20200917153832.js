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
// 重复名称
export async function nameRepeatValidator ({ type, args, message, initialValue }, { rule, value, callback }) {
    try {
      if (initialValue && value === initialValue) {
        callback()
      }
      if (value.length > 24) {
        callback(new Error('长度不得大于24'))
      }
      const data = deepGet(await type(queryBuild(args)), 'data.items', [])
      if (data.length > 0) {
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
        callback(new Error('手机号码格式不对，请重新输入'))
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
