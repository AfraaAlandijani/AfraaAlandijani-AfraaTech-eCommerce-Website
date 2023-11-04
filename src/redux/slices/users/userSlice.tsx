import { createSlice } from '@reduxjs/toolkit'

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  blocked: boolean
}

export type UserState = {
  users: User[]
  error: null | string
  isLoading: boolean
  isLoggedIn: boolean
  userData: User | null
  searchTerm: string
  blockedUser: boolean
}
// set the data to the localStorage
const dataStored =
  localStorage.getItem('loginData') !== null
    ? JSON.parse(String(localStorage.getItem('loginData')))
    : []
const initialState: UserState = {
  users: [],
  error: null,
  isLoading: false,
  isLoggedIn: dataStored.isLoggedIn,
  userData: dataStored.userData,
  searchTerm: '',
  blockedUser: false
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    createAccount: (state, action: { payload: { user: User } }) => {
      // let's append the new product to the beginning of the array
      state.users = [action.payload.user, ...state.users]
    },
    login: (state, action) => {
      state.isLoggedIn = true
      state.userData = action.payload
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData
        })
      )
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.userData = null
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData
        })
      )
    },
    usersRequest: (state) => {
      state.isLoading = true
    },
    usersSuccess: (state, action) => {
      state.isLoading = false
      state.users = action.payload
    },
    removeUser: (state, action: { payload: { userId: number } }) => {
      const filteredUsers = state.users.filter((user) => user.id !== action.payload.userId)
      state.users = filteredUsers
    },
    banUser: (state, action: { payload: { userId: number } }) => {
      const foundUsers = state.users.find((user) => user.id == action.payload.userId)
      if (foundUsers) {
        console.log(foundUsers)
        foundUsers.blocked = !foundUsers.blocked
      }
    },
    searchUser: (state, action) => {
      state.searchTerm = action.payload
    },
    updateUser: (state, action) => {
      const { id, firstName, lastName } = action.payload
      const foundUsers = state.users.find((user) => user.id == id)
      if (foundUsers) {
        foundUsers.firstName = firstName
        foundUsers.lastName = lastName
        state.userData = foundUsers
        localStorage.setItem(
          'loginData',
          JSON.stringify({
            isLoggedIn: state.isLoggedIn,
            userData: state.userData
          })
        )
      }
    }
  }
})
export const {
  usersRequest,
  usersSuccess,
  removeUser,
  login,
  logout,
  createAccount,
  searchUser,
  banUser,
  updateUser
} = userSlice.actions

export default userSlice.reducer
