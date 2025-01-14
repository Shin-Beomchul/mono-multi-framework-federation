import { styled } from '@mui/material/styles'

interface MainWrapperProps {
  open: boolean
  expandWidth?: string
  collapseWidth?: string
  marginTop?: string
  minHeight?: string
}
const MainWrapper = styled('main', {
  shouldForwardProp: (prop: any) => prop !== 'open',
})<MainWrapperProps>(
  ({
    expandWidth = '240px',
    collapseWidth = '64px',
    theme,
    marginTop = `${theme.mixins.toolbar.minHeight}px`,
    minHeight = `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
  }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: marginTop,
    minHeight: minHeight,

    variants: [
      {
        props: ({ open }) => open,
        style: {
          width: `calc(100vw - ${expandWidth})`,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          width: `calc(100vw - ${collapseWidth})`,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  })
)

export default MainWrapper
