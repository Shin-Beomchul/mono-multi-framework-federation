import { useEffect } from 'react'
import useUserStore from '../stores/UserStore'
import { useNavigate } from 'react-router-dom'

interface PrivateRouteProps {
  children: React.ReactNode
  accessRoles?: string[]
}
/**
 * @param accessRoles 접근 가능한 role 리스트
 */
export function PrivateRoute({
  children,
  accessRoles,
}: PrivateRouteProps): React.ReactElement | null {
  const navigate = useNavigate()
  const userStore = useUserStore()
  const authorization = userStore.authorization
  // 인증되지 않은 경우 Keycloak 리다이렉트
  if (!userStore.isAuthenticated()) {
    useEffect(() => {
      navigate('/login')
    })
  } else if (userStore.isAuthenticated() && authorization) {
    // role미지정 : 로그인 여부만 확인
    if (accessRoles === undefined) {
      return <>{children}</>
      // 접근가능한 롤을 가지고 있을경우
    } else if (authorization.hasRoles(accessRoles)) {
      return <>{children}</>
      // 접근가능한 룰을 가지고 있지 않을경우
    } else if (!authorization.hasRoles(accessRoles)) {
      return (
        <div>
          <p>접근 권한이 없습니다. </p>
          <p>{accessRoles.join(',')} 권한을 가진 사용자만 접근 가능합니다.</p>
        </div>
      )
    }
  }
  return null // or  <div>Routing...</div>
}
