import { useDispatch } from 'react-redux'

import { AppDispatch } from '../../../redux/store'

import {
  Category,
  addCategory,
  removeCategory,
  searchCategory,
  updateCategory
} from '../../../redux/slices/categories/categorySlice'

import { FaTrashAlt, FaEdit } from 'react-icons/fa'

import { ChangeEvent, FormEvent, useState } from 'react'

import useCategoryState from '../../../hooks/useCategoryState'

import FirstPageIcon from '@mui/icons-material/FirstPage'

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'

import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'

import LastPageIcon from '@mui/icons-material/LastPage'

import {
  Box,
  IconButton,
  TableFooter,
  TablePagination,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
  Grid,
  TextField,
  Button,
  Typography
} from '@mui/material'

import { useTheme } from '@mui/material/styles'

import { toast } from 'react-toastify'

import SearchInput from '../../SearchInput'

interface TablePaginationActionsProps {
  count: number
  page: number
  rowsPerPage: number
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page">
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page">
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  )
}
const initialCategoryState: Category = {
  id: 0,
  name: ''
}

export function CategoryManager() {
  const dispatch = useDispatch<AppDispatch>()
  const { categories, isLoading, searchTerm } = useCategoryState()
  const [isEdit, setIsEdit] = useState(false)
  const [category, setCategory] = useState<Category>(initialCategoryState)
  const [categoryId, setCategoryId] = useState(0)
  const [categoryName, setCategoryName] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [nameValidation, setNameValidation] = useState('')

  const handleEditForm = (id: number, name: string) => {
    setCategoryId(id)
    setIsEdit(!isEdit)
    setCategoryName(name)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCategoryName(value)
    setCategory({
      ...category,
      [name]: value
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (category.name.length < 3) {
      setNameValidation('Must be at least 3 Character')
      return
    }
    if (!isEdit) {
      category.id = +new Date()
      dispatch(addCategory({ category }))
      toast.success('New category added successfuly')
    } else {
      const updateCategoryData = { id: categoryId, name: categoryName }
      dispatch(updateCategory(updateCategoryData))
      toast.success('Category updates successfuly')
      setIsEdit(!isEdit)
    }
    // Reset the form
    setCategory(initialCategoryState)
    setCategoryName('')
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value
    dispatch(searchCategory(searchTerm))
  }
  const filteredCategories = searchTerm
    ? categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : categories
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredCategories.length) : 0
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  return (
    <>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 2,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              type="text"
              label="category name"
              name="name"
              id="name"
              value={categoryName}
              onChange={handleChange}
              autoFocus
            />
            <Typography variant="body2">{nameValidation}</Typography>

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 2 }}>
              {isEdit ? 'Update' : 'Create'}
            </Button>
          </Box>
        </Box>
      </Grid>
      <TableContainer component={Paper}>
        {isLoading && <h3> Loading Products...</h3>}
        <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} />
        <Table sx={{ minWidth: 650 }} aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>ID </TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Edit</TableCell>
              <TableCell align="left">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : filteredCategories
            ).map((category) => (
              <TableRow
                key={category.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {category.id}
                </TableCell>
                <TableCell align="left">{category.name}</TableCell>
                <TableCell align="left">
                  <FaEdit
                    onClick={() => {
                      handleEditForm(category.id, category.name)
                    }}
                  />
                </TableCell>
                <TableCell align="left">
                  <FaTrashAlt
                    onClick={() => dispatch(removeCategory({ categoryId: category.id }))}
                  />{' '}
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={4}
                count={filteredCategories.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page'
                  },
                  native: true
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  )
}
