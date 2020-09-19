import desktopManage from './CloudDesktop/desktopManagem'
import usergroup from './CloudDesktop/usergroup'
import userManagement from './CloudDesktop/userManagement'
export default {
    ...desktopManage,
    ...usergroup
    ...userManagement
}
