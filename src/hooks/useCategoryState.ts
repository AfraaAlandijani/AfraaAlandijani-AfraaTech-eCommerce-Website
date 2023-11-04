import { RootState } from '../redux/store'

import { useSelector } from 'react-redux'

const useCategoryState = () => {
  const { categories, error, isLoading, sortCategories, searchTerm } = useSelector(
    (state: RootState) => state.categories
  )
  return {
    categories,
    error,
    isLoading,
    sortCategories,
    searchTerm
  }
}

export default useCategoryState
