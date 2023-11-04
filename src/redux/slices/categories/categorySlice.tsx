import { createSlice } from '@reduxjs/toolkit'

export type Category = {
  id: number
  name: string
}

export type CategoryState = {
  categories: Category[]
  error: null | string
  isLoading: boolean
  sortCategories: number[]
  searchTerm: string
}

const initialState: CategoryState = {
  categories: [],
  error: null,
  isLoading: false,
  sortCategories: [],
  searchTerm: ''
}

export const categorySlice = createSlice({
  name: 'Categories',
  initialState,
  reducers: {
    categoriesRequest: (state) => {
      state.isLoading = true
    },
    categoriesSuccess: (state, action) => {
      state.isLoading = false
      state.categories = action.payload
    },
    addCategory: (state, action: { payload: { category: Category } }) => {
      // let's append the new product to the beginning of the array
      state.categories = [action.payload.category, ...state.categories]
    },
    removeCategory: (state, action: { payload: { categoryId: number } }) => {
      const filteredItems = state.categories.filter(
        (category) => category.id !== action.payload.categoryId
      )
      state.categories = filteredItems
    },
    searchCategory: (state, action) => {
      state.searchTerm = action.payload
    },
    sortCategories: (state, action) => {
      const sortingType = action.payload
      if (sortingType == 'categories') {
        console.log(sortingType)
      }
    },
    updateCategory: (state, action) => {
      const { id, name } = action.payload
      const foundUsers = state.categories.find((category) => category.id == id)
      if (foundUsers) {
        foundUsers.name = name
      }
    }
  }
})
export const {
  removeCategory,
  addCategory,
  categoriesRequest,
  categoriesSuccess,
  sortCategories,
  updateCategory,
  searchCategory
} = categorySlice.actions

export default categorySlice.reducer
