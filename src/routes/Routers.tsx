import { Routes, Route, BrowserRouter } from 'react-router-dom'

import Nav from '../components/layout/Nav'
import ProductsList from '../components/ProductsList'
import CategoriesList from '../components/admin/categories/CategoriesList'
import Home from '../pages/Home'
import ProductDetails from '../pages/ProductDetails'
import AdminPage from '../pages/AdminPage'

import UserPage from '../pages/UserPage'

import Error from '../pages/Error'

import UserProfile from '../components/user/UserProfile'

import Footer from '../components/layout/Footer'

import UsersList from '../components/admin/users/UsersList'

import LoginPage from '../pages/LoginPage'

import UserOrders from '../components/user/UserOrders'

import ProtectedRoutes from './ProtectedRoutes'

import AdminRoute from './AdminRoute'

import RegisterPage from '../pages/RegisterPage'

import AdminProfile from '../components/admin/dashboard/AdminProfile'

import CartPage from '../pages/CartPage'

import OrdersList from '../components/admin/orders/OrdersList'

const Routers = () => {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/login-page" element={<LoginPage />} />
          <Route path="/register-page" element={<RegisterPage />} />
          <Route path="/cart-page" element={<CartPage />} />

          {/* ---- Admin ---- */}
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin-page" element={<AdminPage />} />
            <Route path="admin-page/profile" element={<AdminProfile />} />
            <Route path="admin/products" element={<ProductsList />} />
            <Route path="admin/users" element={<UsersList />} />
            <Route path="admin/categories" element={<CategoriesList />} />
            <Route path="admin/orders" element={<OrdersList />} />
          </Route>
          {/* ---- User ---- */}
          <Route path="/dashboard" element={<ProtectedRoutes />}>
            <Route path="user-page" element={<UserPage />} />
            <Route path="user-page/profile" element={<UserProfile />} />
            <Route path="user/orders" element={<UserOrders />} />
          </Route>
          {/* ---- Page Not loading ---- */}
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default Routers
