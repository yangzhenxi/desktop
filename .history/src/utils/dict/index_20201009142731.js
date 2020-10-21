import desktopManage from './CloudDesktop/desktopManagem'
import usergroup from './CloudDesktop/usergroup'
import userManagement from './CloudDesktop/userManagement'
import CloudDesktop from './CloudDesktop/CloudDesktop'
export default {
    ...desktopManage,
    ...usergroup,
    ...userManagement
}
