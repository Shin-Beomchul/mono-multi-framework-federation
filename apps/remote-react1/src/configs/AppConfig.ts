export enum AuthorizationType {
  KEYCLOAK = 'KEYCLOAK', // KeyCloak인가 처리.
  SELF = 'SELF', // 자체 인가 처리
}

const AppConfig = {
  authorizationType: AuthorizationType.SELF,
  envMode: import.meta.env.MODE,
  envName: import.meta.env.VITE_PROFILE_NAME,
  isProd: import.meta.env.PROD,
}

export default AppConfig
