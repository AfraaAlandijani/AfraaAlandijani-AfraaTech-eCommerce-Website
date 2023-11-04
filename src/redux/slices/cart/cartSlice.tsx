import { createSlice } from '@reduxjs/toolkit'

import { Product } from '../products/productSlice'

export type cart = {
  id: number
  name: string
  price: number
  image: string
}

const data =
  localStorage.getItem('cart') != null ? JSON.parse(String(localStorage.getItem('cart'))) : []

export type cartState = {
  cartItems: Product[]
  error: null | string
  isLoading: boolean
  search: string
  sortProducts: number[]
}

const initialState: cartState = {
  cartItems: data,
  error: null,
  isLoading: false,
  search: '',
  sortProducts: []
}
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload)
      localStorage.setItem('cart', JSON.stringify(state.cartItems))
    },
    removeFromCart: (state, action: { payload: { productId: number } }) => {
      const filteredItems = state.cartItems.filter(
        (product) => product.id !== action.payload.productId
      )
      state.cartItems = filteredItems
    }
    /*incrementQuantity: (state, action) => {
      const itemInCart = state.cartItems.find((item) => item.id == action.payload.id)
      itemInCart.quantity++
    },
    decrementQuantity: (state, action) => {
      const itemInCart = state.cartItems.find((item) => item.id == action.payload.id)
      if (itemInCart.quantity == 1) {
        const removeFromCart = state.cartItems.filter((item) => item.id !== action.payload.id)
        state.cartItems = removeFromCart
      } else {
        itemInCart.quantity--
      }
    }*/
  }
})

export const { addToCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer
