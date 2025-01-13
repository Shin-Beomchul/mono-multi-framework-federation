import { useEffect } from 'react'
import useUserStore from '../stores/UserStore'
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
  const userStore = useUserStore()
  // 인증되지 않은 경우 Keycloak 리다이렉트
  if (!userStore.isAuthenticated()) {
    useEffect(() => {
      userStore.login()
    })
  } else if (userStore.isAuthenticated() && userStore.isAuthorization()) {
    // role미지정 : 로그인 여부만 확인
    if (accessRoles === undefined) {
      return <>{children}</>
      // 접근가능한 롤을 가지고 있을경우
    } else if (userStore.hasRoles(accessRoles)) {
      return <>{children}</>
      // 접근가능한 룰을 가지고 있지 않을경우
    } else if (!userStore.hasRoles(accessRoles)) {
      return <div>접근 권한이 없습니다.</div>
    }
  }
  return <div>Routing...</div> // or null
}
