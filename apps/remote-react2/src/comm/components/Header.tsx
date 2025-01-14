import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import ToolBar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MoreIcon from '@mui/icons-material/MoreVert'

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}))

interface HeaderProps extends MuiAppBarProps {
  open: boolean
  handleDrawerOpen?: (isOpen: boolean) => void
}

export default function Header({ open, handleDrawerOpen }: HeaderProps) {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size='medium'
          aria-label='show 4 new mails'
          color='inherit'
        >
          <Badge
            badgeContent={4}
            color='error'
          >
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size='medium'
          aria-label='show 17 new notifications'
          color='inherit'
        >
          <Badge
            badgeContent={17}
            color='error'
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size='medium'
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  )

  return (
    <Box>
      <AppBar>
        <ToolBar style={{ minHeight: theme.mixins.toolbar.minHeight }}>
          {/* drawer open */}
          <IconButton
            size='medium'
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={() => handleDrawerOpen?.(!open)}
            sx={{
              mr: 2,
              '&:focus': {
                outline: 'none',
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          {/* title */}
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Remote React 2
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {/* medium screen menu */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <IconButton
              sx={{
                '&:focus': {
                  outline: 'none',
                },
              }}
              size='medium'
              aria-label='show 4 new mails'
              color='inherit'
            >
              <Badge
                badgeContent={5}
                color='error'
              >
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size='medium'
              aria-label='show 17 new notifications'
              color='inherit'
              sx={{
                '&:focus': {
                  outline: 'none',
                },
              }}
            >
              <Badge
                badgeContent={17}
                color='error'
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size='medium'
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'
              sx={{
                '&:focus': {
                  outline: 'none',
                },
              }}
            >
              <AccountCircle fontSize='large' />
            </IconButton>
          </Box>
          {/* small screen menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='medium'
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </ToolBar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  )
}
