import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { SideBarMenu } from '../comm/components/SideBar'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import HomeIcon from '@mui/icons-material/Home'
import ScienceIcon from '@mui/icons-material/Science'
import PublicIcon from '@mui/icons-material/Public'
import NearbyErrorIcon from '@mui/icons-material/NearbyError'
interface AppStore {
  open: boolean
  setOpen: (open: boolean) => void
  sideBarMenus: SideBarMenu[]
}

const AppStore = create<AppStore>()(
  devtools((set) => {
    return {
      open: false,
      setOpen: (open) => {
        set({ open })
      },
      sideBarMenus: [
        {
          title: 'Welcome',
          path: '/public',
          icon: PublicIcon,
        },
        {
          title: 'Home',
          path: '/home',
          icon: HomeIcon,
        },
        {
          title: 'Info',
          path: '/info',
          icon: AdminPanelSettingsIcon,
        },
        {
          title: 'Root',
          path: '/root',
          icon: NearbyErrorIcon,
        },

        {
          title: 'Playground',
          icon: ScienceIcon,
          expand: true,
          path: '/p',

          children: [
            {
              title: 'styled',
              path: '/p/styled',
              expand: true,
              icon: ScienceIcon,
              children: [
                {
                  title: 'object',
                  path: '/p/styled?tab=0',
                  icon: ScienceIcon,
                },
                {
                  title: 'css',
                  path: '/p/styled?tab=1',
                  icon: ScienceIcon,
                },
                {
                  title: 'rest',
                  path: '/p/styled?tab=2',
                  icon: ScienceIcon,
                },
              ],
            },
          ],
        },
      ],
    }
  })
)

export default AppStore
