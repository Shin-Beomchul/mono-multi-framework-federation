import useUserStore from '../stores/UserStore'
import { useNavigate } from 'react-router-dom'
import AppConfig from '../config/AppConfig'

function App() {
  const userStore = useUserStore()
  const navigate = useNavigate()

  return (
    <div>
      <div>
        User is {!userStore.isAuthenticated() ? 'NOT ' : ''} authenticated
      </div>
      <button
        type='button'
        onClick={() => {
          navigate('/info')
        }}
      >
        go Info Page
      </button>

      {!!userStore.isAuthenticated() && (
        <button
          type='button'
          onClick={() => userStore.logout()}
        >
          Logout
        </button>
      )}
      <p>
        인증토큰 (keycloak) {JSON.stringify(userStore.getAuthenticationToken())}
      </p>
      <p>
        인가정보 ({AppConfig.authorizationType}) :
        {JSON.stringify(userStore.getAuthorization())}
      </p>
      <p>
        Roles:
        {JSON.stringify(userStore.getAuthorization()?.roles)}
      </p>
      <p>
        has ADMIN Role:
        {JSON.stringify(userStore.hasRole('admin'))}
      </p>
      <p>
        has wrang Role:
        {JSON.stringify(userStore.hasRole('wrangRole'))}
      </p>
    </div>
  )
}

export default App
