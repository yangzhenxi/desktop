import desktopManage from './CloudDesktop/desktopManagem'
import usergroup from './CloudDesktop/usergroup'
import userManagement from './CloudDesktop/userManagement'
import CloudDesktop from './CloudDesktop/CloudDesktop'
import Alart from './system/alarm'
export default {
    ...desktopManage,
    ...usergroup,
    ...userManagement,
    ...CloudDesktop,
    ...Alart
}
