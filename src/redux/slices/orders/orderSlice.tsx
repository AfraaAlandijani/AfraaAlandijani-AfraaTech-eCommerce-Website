import { createSlice } from '@reduxjs/toolkit'

export type Order = {
  id: number
  productId: number
  userId: number
  purchasedAt: string
}

export type ProductState = {
  orders: Order[]
  error: null | string
  isLoading: boolean
  searchTerm: string
}

const initialState: ProductState = {
  orders: [],
  error: null,
  isLoading: false,
  searchTerm: ''
}

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    ordersRequest: (state) => {
      state.isLoading = true
    },
    ordersSuccess: (state, action) => {
      state.isLoading = false
      state.orders = action.payload
    },
    searchOrder: (state, action) => {
      state.searchTerm = action.payload
    },
    removeOrder: (state, action: { payload: { orderId: number } }) => {
      const filteredUsers = state.orders.filter((order) => order.id !== action.payload.orderId)
      state.orders = filteredUsers
    }
  }
})

export const { ordersRequest, ordersSuccess, searchOrder, removeOrder } = orderSlice.actions

export default orderSlice.reducer
