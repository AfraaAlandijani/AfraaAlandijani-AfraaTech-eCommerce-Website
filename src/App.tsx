import Routers from './routes/Routers'

import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import { AppDispatch } from './redux/store'

import { useDispatch } from 'react-redux'

import { useEffect } from 'react'

import api from './api'

import { productsRequest, productsSuccess } from './redux/slices/products/productSlice'

import { categoriesRequest, categoriesSuccess } from './redux/slices/categories/categorySlice'

import { usersRequest, usersSuccess } from './redux/slices/users/userSlice'

import { ordersRequest, ordersSuccess } from './redux/slices/orders/orderSlice'

function App() {
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    handleGetData()
  }, [])

  /**
   * If you want to keep things simple you can follow this approach on updating
   * redux state when using async requests instead of using createAsyncThunk
   */
  const handleGetData = async () => {
    // Fetch Products
    dispatch(productsRequest())
    const response = await api.get('/mock/e-commerce/products.json')
    dispatch(productsSuccess(response.data))

    // Fetch Categories
    dispatch(categoriesRequest())
    const categoriesResponse = await api.get('/mock/e-commerce/categories.json')
    dispatch(categoriesSuccess(categoriesResponse.data))

    // Fetch Users
    dispatch(usersRequest())
    const userResponse = await api.get('/mock/e-commerce/users.json')
    dispatch(usersSuccess(userResponse.data))
    // Fetch Orders
    dispatch(ordersRequest())
    const orderResponse = await api.get('/mock/e-commerce/orders.json')
    dispatch(ordersSuccess(orderResponse.data))
  }

  return (
    <div>
      <ToastContainer />
      <Routers />
    </div>
  )
}

export default App
