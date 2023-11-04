import { ChangeEvent, useState } from 'react'

import { useDispatch } from 'react-redux'

import { banUser, removeUser, searchUser } from '../../../redux/slices/users/userSlice'

import SearchInput from '../../SearchInput'

import useUserState from '../../../hooks/useUserState'

import { AppDispatch } from '../../../redux/store'

import Paper from '@mui/material/Paper'

import { FaTrashAlt } from 'react-icons/fa'

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
  Table
} from '@mui/material'

import { useTheme } from '@mui/material/styles'

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

export function UserManager() {
  const dispatch = useDispatch<AppDispatch>()
  const { users, isLoading, searchTerm } = useUserState()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value
    dispatch(searchUser(searchTerm))
  }

  const filteredUsers = searchTerm
    ? users.filter((user) => user.firstName.toLowerCase().includes(searchTerm.toLowerCase()))
    : users

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredUsers.length) : 0

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <TableContainer component={Paper}>
      {isLoading && <h3> Loading Users...</h3>}
      <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} />
      <Table sx={{ minWidth: 650 }} aria-label="user table">
        <TableHead>
          <TableRow>
            <TableCell>ID </TableCell>
            <TableCell align="left">Full Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Role</TableCell>
            <TableCell align="left">Delete</TableCell>
            <TableCell align="left">Block</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : filteredUsers
          ).map((user) => (
            <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {user.id}
              </TableCell>
              <TableCell align="left">
                {user.firstName} {user.lastName}
              </TableCell>
              <TableCell align="left">{user.email}</TableCell>
              <TableCell align="left">{user.role}</TableCell>
              <TableCell align="left">
                <FaTrashAlt onClick={() => dispatch(removeUser({ userId: user.id }))} />
              </TableCell>
              <TableCell onClick={() => dispatch(banUser({ userId: user.id }))} align="left">
                {user.blocked ? 'Unblock' : 'Block '}
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
              count={filteredUsers.length}
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
  )
}
