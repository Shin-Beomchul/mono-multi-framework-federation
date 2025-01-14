/** 인가 */
interface BaseAuthorization {
  roles: string[]
  getRoles: () => string[]
  hasRole: (role: string) => boolean
  hasRoles: (role: string[]) => boolean
}

export default BaseAuthorization
