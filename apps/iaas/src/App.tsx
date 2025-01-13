import useAppStore from './stores/AppStore'
import useUserStore from './stores/UserStore'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { useKeycloak } from '@react-keycloak/web'
import Header from './comm/components/Header'
import SideBar, { SideBarMenu } from './comm/components/SideBar'
import MainWrapper from './comm/components/MainWrapper'
import { AppRouter } from './routes'

import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material'

const BoxContainer = styled(Box)(() => ({
  display: 'flex',
  '& button:focus': {
    outline: 'none',
  },
}))

export default function App() {
  const { open, setOpen, sideBarMenus } = useAppStore()
  const { authorization } = useUserStore()
  const navigate = useNavigate()
  const { initialized } = useKeycloak()
  const onClickMenu = (menu: SideBarMenu) => {
    navigate(menu.path)
  }
  if (!initialized) {
    return null // or <div>Loading...</div> or ..
  } else {
    return (
      <BoxContainer>
        <CssBaseline />

        <Header
          open={open}
          handleDrawerOpen={setOpen}
        ></Header>

        <SideBar
          open={open}
          handleDrawerOpen={setOpen}
          menus={sideBarMenus}
          onClickMenu={onClickMenu}
          authorization={authorization}
        ></SideBar>

        <MainWrapper
          open={open}
          // style={{ backgroundColor: 'red' }}
        >
          <AppRouter />
        </MainWrapper>
      </BoxContainer>
    )
  }
}
