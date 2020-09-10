/**
 * 名称验证
 * 只能是数字和字母
 *  @param {*} 验证参数
 */
export function namechineValidator (rule, value, callback) {
    console.log(value)
    const pattern = /^[0-9a-zA-Z\u4e00-\u9fa5]+$/
    if (!pattern.test(value)) {
        callback(new Error('名称必须由中文、数字和字母组成！'))
    }
    callback()
}
/**
 * 名称验证
 * 只能是数字和字母
 *  @param {*} 验证参数
 */
export function nameValidator (rule, value, callback) {
    console.log(value)
    const pattern = /^[\d\w]+$/
    if (!pattern.test(value)) {
        callback(new Error('名称必须由字母、数字组成！'))
    }
    callback()
}
/**
 * 名称验证
 * 不能带空格
 *  @param {*} 验证参数
 */
export function namekongValidator (rule, value, callback) {
    console.log(value)
    const pattern = /^[^\s]*$/
    if (!pattern.test(value)) {
        callback(new Error('名称不能带空格！'))
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
        callback(new Error('手机号码格式不对'))
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
