import request from '@/utils/request'
const desktop = '/desktop.v1.Desktop'
const Host = '/desktop.v1.HostUnit'
const Session = '/desktop.v1.Session'
const Machine = '/desktop.v1.Machine'
const Policy = '/desktop.v1.Policy'
const Group = '/desktop.v1.Group'
const Task = '/system.v1.Task'
/**
 * 获取OU列表
 * @param {data} data
 */
export function CloudDesktopOUList (data) {
  return request.post(`${desktop}/ListOU`, data)
}
/**
 * 获取添加OU
 * @param {data} data
 */
export function CloudDesktopAddOU (data) {
  return request.post(`${desktop}/AddOU`, data)
}
/**
 * 获取修改OU
 * @param {data} data
 */
export function CloudDesktopEditOU (data) {
  return request.post(`${desktop}/ModifyOU`, data)
}
/**
 * 获取删除OU
 * @param {data} data
 */
export function CloudDesktopDeleteOU (data) {
  return request.post(`${desktop}/DelOU`, data)
}
/**
 * 获取桌面列表
 * @param {data} data
 */
export function CloudDesktopTPList (data) {
  return request.post(`${desktop}/List`, data)
}
/**
 * 添加计算机至云桌面
 * @param {data} data
 */
export function CloudDesktopAddMachine (data) {
  return request.post(`${desktop}/AddMachine`, data)
}
/**
 * 重新生成计算机
 * @param {data} data
 */
export function CloudDesktopReset (data) {
  return request.post(`${Machine}/Regenerate`, data)
}
/**
 * 根据id获取正在创建的任务
 * @param {data} data
 */
export function CloudDesktopTaskList (data = { page: 0, size: 99999 }) {
  return request.post(`${Task}/List`, data)
}
/**
 * 根据id获取正在创建的任务
 * @param {data} data
 */
export function CloudDesktopTaskGet (data) {
  return request.post(`${Task}/Get`, data)
}
/**
 * 添加桌面列表
 * @param {data} data
 */
export function CloudDesktopTPAdd (data) {
  return request.post(`${desktop}/Add`, data)
}
/**
 * 删除桌面列表
 * @param {data} data
 */
export function CloudDesktopTPDelete (data) {
  return request.post(`${desktop}/Delete`, data)
}
/**
 * 修改桌面列表
 * @param {data} data
 */
export function CloudDesktopTPPatch (data) {
  return request.post(`${desktop}/Patch`, data)
}
/**
 * 获取托管资源
 * @param {data} data
 */
export function CloudDesktopHostList (data) {
  return request.post(`${Host}/List`, data)
}
/**
 * 获取会话列表
 * @param {data} data
 */
export function CloudDesktopSessionList (data) {
  return request.post(`${Session}/List`, data)
}
/**
 * 停止会话列表
 * @param {data} data
 */
export function CloudDesktopSessionStop (data) {
  return request.post(`${Session}/Stop`, data)
}
/**
 * 获取交付组下的桌面
 * @param {data} data
 */
export function CloudDesktopMachineList (data) {
  return request.post(`${Machine}/List`, data)
}
/**
 * 计算机开关机
 * @param {data} data
 */
export function CloudDesktopMachinePower (data) {
  return request.post(`${Machine}/Power`, data)
}
/**
 * 修改计算机的维护模式
 * @param {data} data
 */
export function CloudDesktopMachineSetMaintenanceMode (data) {
  return request.post(`${Machine}/SetMaintenanceMode`, data)
}

/*               用户配置相关接口                   */
/**
 * List 获取列表
 * @param {data} data
 */
export function CloudDesktopPolicyList (data) {
  return request.post(`${Policy}/List`, data)
}
/**
 * Patch 修改
 * @param {data} data
 */
export function CloudDesktopPolicyPatch (data) {
  return request.post(`${Policy}/Patch`, data)
}

/* 电源策略接口 */
/**
 * Get获取详情
 * @param {data} data
 */
export function CloudDesktopGroupGet (data) {
    return request.post(`${Group}/Get`, data)
}
/**
 * PatchPowerStrategy 修改
 * @param {data} data
 */
export function CloudDesktopGroupPatchPowerStrategy (data) {
    return request.post(`${Group}/PatchPowerStrategy`, data)
}
/**
 * 验证重命名
 * @param {data} data
 */
export function CloudDesktopTestName (data) {
    return request.post(`${desktop}/TestName`, data)
}
/**
 * 验证重命名
 * @param {data} data
 */
export function CloudDesktopSetMain (data) {
    return request.post(`${Group}/SetMaintenanceMode`, data)
}
