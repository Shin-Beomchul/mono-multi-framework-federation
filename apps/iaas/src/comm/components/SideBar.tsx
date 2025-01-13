import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import { Box, Collapse, IconButton, List, ListItemButton } from '@mui/material'
import BaseAuthorization from '../BaseAuthorization'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { useState } from 'react'

/**
 * @dependency
 *  @MUI, @Rect, @react-router-dom
 */
const DrawerHeader = styled('div')(({ theme }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minHeight: theme.mixins.toolbar.minHeight,
  }
})

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ width: number }>(({ width, theme }) => ({
  padding: 0,
  width: width,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(width, theme),
        '& .MuiDrawer-paper': openedMixin(width, theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      },
    },
  ],
}))

const openedMixin = (drawerWidth: number, theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
})

interface SideBarProps {
  open: boolean
  menus: SideBarMenu[]
  onClickMenu: (menu: SideBarMenu) => void
  authorization: BaseAuthorization | null
  width?: number
  handleDrawerOpen?: (isOpen: boolean) => void
}

function SideBar({
  open,
  handleDrawerOpen,
  menus,
  onClickMenu,
  width = 240,
}: SideBarProps) {
  const [menusState, setMenusState] = useState<SideBarMenu[]>(menus)
  const theme = useTheme()

  const onMenuClick = (menu: SideBarMenu, expand: boolean) => {
    //group
    const isGroup = menu.children ? true : false
    if (isGroup) {
      setMenuExpand(getMenuKey(menu), !expand)
    } else {
      onClickMenu(menu)
    }
  }
  /**메뉴 펼치기 */
  const setMenuExpand = (menuKey: string, expand: boolean) => {
    setMenusState((prevMenus) => {
      const updatedMenus = prevMenus.map((menu) => {
        if (getMenuKey(menu) === menuKey) {
          return { ...menu, expand: expand } // expand 필드 토글
        }
        // 자식 메뉴가 있을 경우 재귀적으로 확장 상태를 토글
        if (menu.children) {
          const updatedChildren = menu.children.map((child) => {
            if (getMenuKey(child) === menuKey) {
              return { ...child, expand: expand }
            }
            return child
          })
          return { ...menu, children: updatedChildren }
        }
        return menu
      })
      return updatedMenus
    })
  }

  /** 선택된 menu expand */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const expandMenuWithParents = (menuKey: string) => {
    const updateParents = (
      menus: SideBarMenu[],
      key: string
    ): SideBarMenu[] => {
      return menus.map((menu) => {
        if (menu.path === key) {
          return { ...menu, expand: true }
        }

        if (menu.children) {
          const childUpdated = updateParents(menu.children, key)
          // 자식 중 하나라도 expand된 경우 현재 메뉴도 expand
          const isChildExpanded = childUpdated.some((child) => child.expand)
          if (isChildExpanded) {
            return { ...menu, expand: true, children: childUpdated }
          }
          return { ...menu, children: childUpdated }
        }
        return menu
      })
    }
    setMenusState((prevMenus) => updateParents(prevMenus, menuKey))
  }

  /** 메뉴트리 랜더링 */
  const renderMenu = (menu: SideBarMenu, depth: number = 1) => {
    const menuKey = getMenuKey(menu)
    const isExpand = menu.expand || false
    const Icon = menu.icon
    return (
      <Box key={menuKey}>
        {/* Menu */}
        <ListItemButton
          onClick={() => onMenuClick(menu, isExpand)}
          sx={{ pl: depth * 2 }}
        >
          <ListItemIcon>{Icon && <Icon />}</ListItemIcon>
          <ListItemText primary={menu.title} />
          {menu.children && (isExpand ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>

        {/* SubMenu */}
        {menu.children && (
          <Collapse
            in={isExpand}
            timeout='auto'
            unmountOnExit
          >
            <List
              component='div'
              disablePadding
              sx={[
                open
                  ? {
                      opacity: 1,
                    }
                  : {
                      opacity: 0,
                    },
              ]}
            >
              {menu.children.map((child) => renderMenu(child, depth + 1))}
            </List>
          </Collapse>
        )}
      </Box>
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const findMenuByKey = (
    menus: SideBarMenu[],
    menuKey: string
  ): SideBarMenu | undefined => {
    for (const menu of menus) {
      const currentKey = getMenuKey(menu)

      // 해당 menuKey를 가진 메뉴를 찾으면 그 메뉴 객체를 반환
      if (currentKey === menuKey) {
        return menu
      }

      // 자식 메뉴가 있으면 자식 메뉴들에 대해 재귀적으로 탐색
      if (menu.children) {
        const result = findMenuByKey(menu.children, menuKey)

        if (result !== undefined) {
          return result // 자식 메뉴에서 찾은 메뉴 객체 반환
        }
      }
    }
    return undefined // menuKey에 해당하는 메뉴를 찾지 못한 경우
  }
  const getMenuKey = (menu: SideBarMenu) => `${menu.path}`

  return (
    <Drawer
      variant='permanent'
      width={width}
      open={open}
    >
      <DrawerHeader>
        Kube-VM-Genesis
        <IconButton onClick={() => handleDrawerOpen?.(!open)}>
          {theme.direction === 'rtl' ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />

      <List
        sx={{ bgcolor: 'background.paper' }}
        component='nav'
      >
        {menusState.map((menu) => renderMenu(menu))}
      </List>
      {/* <Button onClick={() => expandMenuWithParents('/p/styleds/object')}>
        expand styled1
      </Button> */}
    </Drawer>
  )
}

enum SideBarKind {
  DIVIDER = 'DIVIDER',
  HEADER = 'HEADER',
}

export interface SideBarMenu {
  title: string
  path: string
  expand?: boolean
  accessRoles?: string[]
  kind?: SideBarKind | string
  icon?: JSX.ElementType
  children?: SideBarMenu[]
}

export default SideBar
