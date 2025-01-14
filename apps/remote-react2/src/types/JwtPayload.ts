interface JwtPayload {
  exp: number // 만료 시간 (Unix timestamp)
  iat: number // 발급 시간 (Unix timestamp)
  auth_time: number // 인증 시간 (Unix timestamp)
  jti: string // JWT ID
  iss: string // 발급자 (Issuer)
  aud: string // 대상자 (Audience)
  sub: string // 주체 (Subject)
  typ: string // 토큰 타입
  azp: string // 허가된 제공자
  nonce: string // 고유값 (Nonce)
  session_state: string // 세션 상태
  acr: string // 인증 강도 (Authentication Context Class Reference)
  'allowed-origins': string[] // 허용된 출처 (CORS 관련)
  realm_access: RealmAccess // realm 관련 접근 권한
  resource_access: ResourceAccess // 리소스 접근 권한
  scope: string // scope 정보
  sid: string // 세션 ID
  email_verified: boolean // 이메일 확인 여부
  name: string // 사용자 이름
  preferred_username: string // 선호하는 사용자 이름
  given_name: string // 성
  family_name: string // 성씨
  email: string // 이메일 주소
}

interface RealmAccess {
  roles: string[] // 역할 리스트 (roles)
}

interface ResourceAccess {
  account: {
    roles: string[] // 계정 관련 역할 (roles)
  }
}

export default JwtPayload
