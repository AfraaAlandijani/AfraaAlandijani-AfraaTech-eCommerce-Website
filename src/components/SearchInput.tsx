import { ChangeEvent } from 'react'

import { styled, alpha } from '@mui/material/styles'

import InputBase from '@mui/material/InputBase'

import SearchIcon from '@mui/icons-material/Search'

type SearchInputProps = {
  searchTerm: string
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvens: 'none',
  display: 'flex',
  alignItems: 'center',
  color: 'primary.main',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}))

const SearchInput = ({ searchTerm, handleSearch }: SearchInputProps) => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  )
}

export default SearchInput
