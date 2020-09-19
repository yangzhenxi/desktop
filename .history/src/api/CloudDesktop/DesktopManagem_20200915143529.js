import request from '@/utils/request'
const desktop = '/desktop.v1.Template'
/**
 * 获取用户组列表
 * @param {data} data
 */
export function DesktopTemplatList (data = { name: 'ou=Group,ou=Citrix,dc=test,dc=com' }) {
  return request.post(`${desktop}/TemplateGroupList`, data)
}
