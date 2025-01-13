import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import keycloak from '../config/KeyCloak.ts'
import JwtPayload from '../types/JwtPayload.ts'
import { jwtDecode } from 'jwt-decode'
interface UserState {
  name: string | null
  authentication: Authentication | null
  authorization: Authorization | null
  login: () => void
  logout: () => void
  isAuthenticated: () => boolean | undefined
  isAuthorization: () => boolean
  setAuthentication: (jwtToken: string) => void
  setAuthorization: (authorization: Authorization) => void
  setAuthorizationByToken: (jwtToken: string) => void
  getAuthenticationToken: () => JwtPayload | null
  getAuthorizationToken: () => JwtPayload | null

  getAuthentication: () => Authentication | null
  getAuthorization: () => Authorization | null
  hasRole: (role: string) => boolean
  hasRoles: (role: string[]) => boolean
  isAuthenticationTokenExpired: () => boolean
}

/** 인증 */
interface Authentication {
  token: JwtPayload
  originToken: string
}

/** 인가
 */
interface Authorization {
  token?: JwtPayload
  originToken?: string
  roles: string[]
}

const UserStore = create<UserState>()(
  devtools((set, get) => ({
    name: null,
    authentication: null,
    authorization: null,
    /** login */
    login: () => keycloak.login(),
    /** logout */
    logout: () => {
      set({ authentication: null })
      set({ authorization: null })
      keycloak.logout()
    },

    /** 인증정보 저장 */
    setAuthentication: (jwtToken) => {
      const token = jwtDecode<JwtPayload>(jwtToken)
      set({ authentication: { token: token, originToken: jwtToken } })
    },

    /** 인가정보 저장 By Token */
    setAuthorizationByToken: (jwtToken) => {
      const token = jwtDecode<JwtPayload>(jwtToken)
      set({
        authorization: {
          token: token,
          originToken: jwtToken,
          roles: [
            ...token.realm_access.roles,
            ...token.resource_access.account.roles,
          ],
        },
      })
    },
    /** 인가정보 저장 */
    setAuthorization: (authorization) => {
      set({ authorization })
    },

    /** 인증 여부 */
    isAuthenticated: () => keycloak.authenticated,

    /** 인가 여부 */
    isAuthorization: () => get().authorization != null,

    /** 인증 토큰 가져오기 */
    getAuthenticationToken: () => {
      return get().authentication?.token ?? null
    },
    /** 인가 토큰 가져오기 */
    getAuthorizationToken: () => {
      return get().authorization?.token ?? null
    },
    /** 인증 객체 가져오기 */
    getAuthentication: () => {
      return get().authentication ?? null
    },
    /** 인가 객체 가져오기 */
    getAuthorization: () => {
      return get().authorization ?? null
    },
    /** role 소유 여부 */
    hasRole: (role) => {
      const authorization = get().authorization
      return authorization === null || authorization === undefined
        ? false
        : authorization.roles.includes(role)
    },
    /** role 소유 여부
     * roles 중에 하나라도 일치하면 true
     */
    hasRoles: (roles) => {
      const authorization = get().authorization
      return authorization === null || authorization === undefined
        ? false
        : roles.some((value) => authorization.roles.includes(value))
    },
    /** 인증 토큰 만료 여부 확인 */
    isAuthenticationTokenExpired: () => {
      return keycloak.isTokenExpired()
    },
  }))
)

export default UserStore
