import useUserStore from '../stores/UserStore'
import AppConfig from '../configs/AppConfig'

import { Divider } from '@mui/material'

function InfoPage() {
  const userStore = useUserStore()
  const authorization = userStore.authorization

  return (
    <div>
      <p>로그인 후 admin역할을 가진 사용자만 접근 가능한 페이지</p>
      <p>Page accessible only to users with the admin role after logging in</p>
      <Divider />
      <p>
        유저에게 부여된 역할(Role assigned to user) ={' '}
        {JSON.stringify(authorization?.roles)}
      </p>
      <p>
        유저가 admin권한을 가졌는지 여부(Whether the user has admin privileges)
        = {JSON.stringify(authorization?.hasRole('admin'))}
      </p>
      <p>
        유저가 root권한을 가졌는지 여부(Whether the user has root privileges) ={' '}
        {JSON.stringify(authorization?.hasRole('root'))}
      </p>
      <p>envModeName: {AppConfig.envName}</p>
      <p>
        인증토큰 (keycloak) {JSON.stringify(userStore.getAuthenticationToken())}
      </p>
      <p>
        인가정보 ({AppConfig.authorizationType}) :
        {JSON.stringify(userStore.authorization)}
      </p>

      {!!userStore.isAuthenticated() && (
        <button
          type='button'
          onClick={() => userStore.logout()}
        >
          Logout
        </button>
      )}
    </div>
  )
}

export default InfoPage
