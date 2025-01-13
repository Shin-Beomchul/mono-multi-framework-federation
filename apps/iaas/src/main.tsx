import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak, { initOptions, onKeycloakEvent } from './configs/KeyCloak.ts'
import React from 'react'
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ReactKeycloakProvider
    authClient={keycloak}
    initOptions={initOptions}
    onEvent={onKeycloakEvent}
  >
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  </ReactKeycloakProvider>
)
