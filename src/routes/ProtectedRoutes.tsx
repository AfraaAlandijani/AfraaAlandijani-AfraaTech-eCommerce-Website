import { useSelector } from 'react-redux'

import { RootState } from '../redux/store'

import { Outlet, useLocation } from 'react-router-dom'

import LoginPage from '../pages/LoginPage'

const ProtectedRoutes = () => {
  const location = useLocation()
  const { isLoggedIn } = useSelector((state: RootState) => state.users)

  return isLoggedIn ? <Outlet /> : <LoginPage pathName={location.pathname} />
}

export default ProtectedRoutes
