import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import keycloak from '../configs/KeyCloak.ts'
import JwtPayload from '../types/JwtPayload.ts'
import { jwtDecode } from 'jwt-decode'
import BaseAuthorization from '../comm/BaseAuthorization.ts'
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
  isAuthenticationTokenExpired: () => boolean
}

/** 인증 */
interface Authentication {
  token: JwtPayload
  originToken: string
}

/** 인가 */
class Authorization implements BaseAuthorization {
  roles: string[]
  constructor(roles: string[]) {
    this.roles = roles
  }
  getRoles = () => (this.roles.length ? this.roles : [])
  hasRole = (role: string) => this.roles.length > 0 && this.roles.includes(role)
  hasRoles(roles: string[]) {
    return roles.length > 0 && roles.some((value) => this.roles.includes(value))
  }
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
      const authorization = new Authorization([
        ...token.realm_access.roles,
        ...token.resource_access.account.roles,
      ])
      set({
        authorization: authorization,
      })
    },
    /** 인가정보 저장 By Authorization */
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

    /** 인증 토큰 만료 여부 확인 */
    isAuthenticationTokenExpired: () => {
      return keycloak.isTokenExpired()
    },
  }))
)

export { Authorization }
export default UserStore
