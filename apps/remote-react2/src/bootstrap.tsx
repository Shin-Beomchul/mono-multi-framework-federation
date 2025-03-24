import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { orange } from '@mui/material/colors'
import { BrowserRouter } from 'react-router-dom'

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string
    }
  }

  interface ThemeOptions {
    status?: {
      danger?: string
    }
  }
}

const baseTheme = createTheme()
const theme = createTheme({
  palette: {
    primary: {
      main: '#d32f2f',
      light: '#ff6659',
      dark: '#9a0007',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f44336',
      light: '#ff7961',
      dark: '#ba000d',
      contrastText: '#fff',
    },
  },
  mixins: {
    toolbar: {
      ...baseTheme.mixins.toolbar,
      minHeight: 54,
    },
  },
  status: {
    danger: orange[500],
  },
})

// `mount` 함수 정의
export const mount = (container: HTMLElement | null): void => {
  if (!container) {
    console.error('No container found to mount the app.')
    return
  }

  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  )
}
