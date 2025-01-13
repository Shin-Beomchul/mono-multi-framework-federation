import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import InfoPage from '../pages/InfoPage'
import RootPage from '../pages/RootPage'
import PublicPage from '../pages/PublicPage'
import PlaygroundPage from '../pages/playground/PlaygroundPage'
import { PrivateRoute } from './utils'

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Navigate
            replace
            to='/public'
          />
        }
      />
      <Route
        path='/public'
        element={<PublicPage />}
      />
      <Route
        path='/home'
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path='/info'
        element={
          <PrivateRoute accessRoles={['someRole1', 'admin', 'someRole2']}>
            <InfoPage />
          </PrivateRoute>
        }
      />
      <Route
        path='/root'
        element={
          <PrivateRoute accessRoles={['root']}>
            <RootPage />
          </PrivateRoute>
        }
      />
      <Route
        path='/p/styled'
        element={<PlaygroundPage />}
      />
    </Routes>
  )
}
