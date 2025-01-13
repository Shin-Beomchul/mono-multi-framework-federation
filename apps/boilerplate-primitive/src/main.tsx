import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak, { initOptions, onKeycloakEvent } from './config/KeyCloak.ts'
import React from 'react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ReactKeycloakProvider
    authClient={keycloak}
    initOptions={initOptions}
    onEvent={onKeycloakEvent}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ReactKeycloakProvider>
)
