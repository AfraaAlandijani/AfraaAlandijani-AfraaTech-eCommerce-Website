import { configureStore } from '@reduxjs/toolkit'

import productSlice from './slices/products/productSlice'

import categorySlice from './slices/categories/categorySlice'

import userSlice from './slices/users/userSlice'

import cartSlice from './slices/cart/cartSlice'

import orderSlice from './slices/orders/orderSlice'

export const store = configureStore({
  reducer: {
    products: productSlice,
    categories: categorySlice,
    users: userSlice,
    cart: cartSlice,
    order: orderSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
