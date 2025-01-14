import { useNavigate, useLocation } from 'react-router-dom'
import { Button, TextField, Box, Typography } from '@mui/material'
import useUserStore, { Authorization } from '../stores/UserStore'

const LoginPage = () => {
  const navigate = useNavigate()
  const userStore = useUserStore()
  const location = useLocation()

  // 이동하려고 했던 페이지 URL 저장
  const redirectTo = location.state?.from?.pathname || '/'

  // 로그인 버튼 클릭 시 호출될 함수
  const handleLogin = async () => {
    // 여기에 로그인 로직 추가 예정
    const loginResponse = await getAuthorizationTokenAPI()
    userStore.setAuthentication(loginResponse.jwt)
    const authorization = new Authorization(loginResponse.roles)
    userStore.setAuthorization(authorization)
    navigate(redirectTo, { replace: true })
  }

  /**
   * TODO it's fakeAPI replace your Service API
   *  ! SELF 인가는 JWT토큰이 아닐 수 있음. roles인터페이스는 반드시 필요.
   *  */
  const getAuthorizationTokenAPI = (): Promise<{
    jwt: string
    roles: string[]
  }> => {
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            jwt: 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ6NVJ3UUlhNjZSQXJpZERGd1JYRU9fXzM3M0NtVG52cWFrU25CSlNodEhnIn0.eyJleHAiOjE3MzQwMDc3MTQsImlhdCI6MTczMzk3ODkxNCwiYXV0aF90aW1lIjoxNzMzOTc3Mjc2LCJqdGkiOiIyN2JlMTlmNS1lYWM5LTQwN2QtYmQyYy05N2M5Y2Q0MmIxZTUiLCJpc3MiOiJodHRwczovL2tleWNsb2FrLms5cy5rci9yZWFsbXMvS1VCRU9QUyIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJhNjFkZDA5Yy1jMDUzLTQ4ZDUtOWRlZS1jMDNhMTk3M2ExOGMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJjb25zb2xlIiwibm9uY2UiOiI4OTQxNmMxMy1lZDVmLTRmOTAtOTY3Yy1kYWY1MTY5YzQwNWMiLCJzZXNzaW9uX3N0YXRlIjoiMjkxYjY1MDgtMDdlNS00NDE0LTgxMDYtNmI1MDlhMGI1YTY2IiwiYWNyIjoiMCIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImFkbWluIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLWt1YmVvcHMiLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsInNpZCI6IjI5MWI2NTA4LTA3ZTUtNDQxNC04MTA2LTZiNTA5YTBiNWE2NiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6Imt1YmVvcHMiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJrdWJlb3BzIiwiZ2l2ZW5fbmFtZSI6Imt1YmVvcHMiLCJmYW1pbHlfbmFtZSI6IiIsImVtYWlsIjoia3ViZW9wc0BvcHNub3cuY29tIn0.Ip--cTFQ5OtNPyNC7TQzZlwmmGJRTT7LH3reBFEVDeYxH399pTwjaUl5-7X_3kAxf7MiKEfYbyMGXkSLQ20FwmaRztaQdesFk5YkJAzfUC-1yfuyNzTw0PFsP1XmoHa4C7KyxetqrDyDCw_S8YaMYy4ssPDJQPoJKxK0EWfFRJf90I6X6_pM_1qwQ_yRg-H0xKb26blEanWtvPEp_XC1htfs8fbnZS88Pp4VV6JeQX1l_yURPI_q4e-wKXvK06Y8Fx_C0JG37Oc0KkLlr5qfjVJV1D9eohXrG1SZ9MCSxWYLIulBPcDEaWUrt5EZHtqhERBCBZW-giHPJBpmEVdDuA',
            roles: ['admin', 'cost'], // notNull
          }),
        1000
      )
    )
  }

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      minHeight='100vh'
      padding={2}
    >
      <Typography
        variant='h4'
        gutterBottom
      ></Typography>
      <TextField
        label='id'
        variant='outlined'
        fullWidth
        defaultValue={'godbeom'}
        margin='normal'
      />
      <TextField
        label='password'
        type='password'
        variant='outlined'
        fullWidth
        defaultValue={'1234'}
        margin='normal'
      />
      <Button
        variant='contained'
        color='primary'
        fullWidth
        onClick={handleLogin}
        sx={{ marginTop: 2 }}
      >
        로그인
      </Button>
    </Box>
  )
}

export default LoginPage
