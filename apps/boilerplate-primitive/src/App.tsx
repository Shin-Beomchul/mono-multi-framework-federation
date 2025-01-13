import { AppRouter } from './routes'
import { useKeycloak } from '@react-keycloak/web'

function App() {
  const { initialized } = useKeycloak()
  if (!initialized) {
    return <div>Loading...</div>
  } else {
    return <AppRouter />
  }
}

export default App
