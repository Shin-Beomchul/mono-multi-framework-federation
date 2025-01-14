# IaaS(a.k.a ops-vm, kube-vm, vm-console ) 



# Teck Stack
- [Node.js (^20)](https://nodejs.org/)
- [pnpm (^9)](https://pnpm.io/)
- [Vite (^5)](https://vitejs.dev/)
- [React (^18.2.0)](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Vitest](https://vitest.dev/)
- [keycloak] (https://github.com/react-keycloak/react-keycloak-examples/blob/master/examples/react-router/src/pages/Login.tsx)
 

# Basic Info 
인증 : keycloak 
인가 : keycloak Or Self (Service API)
인증 없이 접근 기능 : http://localhost:3000/public
```JSX
 <Route
      path='/public'
      element={<PublicPage />}
  />
```
인증 후 인가정보 없이 접근
```JSX
 <Route
      path='/home'
      element={
        <PrivateRoute>
          <HomePage />
        </PrivateRoute>
      }
    />
  ```
인증 후 인가정보에 따른 접근 제어 
```JSX
 <Route
      path='/home'
      element={
        <PrivateRoute accessRoles={['admin']}>
          <InfoPage />
        </PrivateRoute>
      }
    />
  ```


# add Dependency
 - pnpm add jwt-decode --filter iaas


#ref
css in js : https://mui.com/material-ui/integrations/interoperability/#styled-components