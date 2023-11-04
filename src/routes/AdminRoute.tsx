import { useSelector } from 'react-redux'

import { RootState } from '../redux/store'

import { Outlet, useLocation } from 'react-router-dom'

import LoginPage from '../pages/LoginPage'

const AdminRoute = () => {
  const location = useLocation()

  const { isLoggedIn, userData } = useSelector((state: RootState) => state.users)
  return isLoggedIn && userData?.role == 'admin' ? (
    <Outlet />
  ) : (
    <LoginPage pathName={location.pathname} />
  )
}

export default AdminRoute
