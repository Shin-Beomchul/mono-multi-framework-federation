import useUserStore from '../stores/UserStore'
import AppConfig from '../config/AppConfig'

function App() {
  const userStore = useUserStore()

  return (
    <div>
      <div>User Is {!userStore.isAuthenticated() ? 'NOT ' : 'login'} </div>
      <div>ModeName: {AppConfig.envName}</div>
    </div>
  )
}

export default App
