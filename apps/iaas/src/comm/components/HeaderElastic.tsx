import Toolbar from '@mui/material/Toolbar'
import MenuIcon from '@mui/icons-material/Menu'
import { CSSObject, IconButton, styled, Theme, Typography } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'

interface HeaderProps extends MuiAppBarProps {
  open: boolean
  handleDrawerOpen?: (isOpen: boolean) => void
}

const openedMixin = (theme: Theme): CSSObject => ({
  marginLeft: 240,
  width: `calc(100% - 240px)`,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
})

const closedMixin = (theme: Theme): CSSObject => ({
  marginLeft: 64,
  width: `calc(100% - 64px)`,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
})

function HeaderElastic({ open, handleDrawerOpen }: HeaderProps) {
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<HeaderProps>(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin,
          // marginLeft: drawerWidth,
          // width: `calc(100% - ${drawerWidth}px)`,
          // transition: theme.transitions.create(['width', 'margin'], {
          //   easing: theme.transitions.easing.sharp,
          //   duration: theme.transitions.duration.enteringScreen,
          // }),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin,
          // marginLeft: closedDrawerWidth,
          // width: `calc(100% - ${closedDrawerWidth}px)`,
          // transition: theme.transitions.create(['width', 'margin'], {
          //   easing: theme.transitions.easing.sharp,
          //   duration: theme.transitions.duration.enteringScreen,
          // }),
        },
      },
    ],
  }))
  return (
    <AppBar
      position='fixed'
      open={open}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={() => handleDrawerOpen?.(true)}
          edge='start'
          sx={[
            {
              marginRight: 5,
            },
            open && { display: 'none' },
          ]}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant='h6'
          noWrap
          component='div'
        >
          Mini variant drawer
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default HeaderElastic
