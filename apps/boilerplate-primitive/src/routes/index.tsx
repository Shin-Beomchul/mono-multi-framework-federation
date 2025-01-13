import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import InfoPage from '../pages/InfoPage'
import PublicPage from '../pages/PublicPage'
import { PrivateRoute } from './utils'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <Navigate
              replace
              to='/home'
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
            <PrivateRoute accessRoles={['admin']}>
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
      </Routes>
    </BrowserRouter>
  )
}
