import { useSelector } from 'react-redux'

import { RootState } from '../redux/store'

const useUserState = () => {
  const { users, error, isLoading, isLoggedIn, userData, searchTerm, blockedUser } = useSelector(
    (state: RootState) => state.users
  )
  return {
    users,
    error,
    isLoading,
    isLoggedIn,
    userData,
    searchTerm,
    blockedUser
  }
}

export default useUserState
