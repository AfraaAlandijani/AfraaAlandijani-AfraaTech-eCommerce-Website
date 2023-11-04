import { Link, useNavigate } from 'react-router-dom'

import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../../redux/store'

import { logout } from '../../redux/slices/users/userSlice'

import {
  AppBar,
  Box,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  Tooltip,
  MenuItem,
  CssBaseline,
  Toolbar
} from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'

import { RiAccountPinBoxFill } from 'react-icons/ri'

import CartIcon from '../CartIcon'

import { ThemeProvider } from '@emotion/react'

import theme from '../../theme'

const Nav = () => {
  const { isLoggedIn, userData } = useSelector((state: RootState) => state.users)
  const { cartItems } = useSelector((state: RootState) => state.cart)
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const notLoggedPages = [
    {
      name: 'Sign In',
      link: '/login-page'
    },
    { name: 'Sign Up', link: '/register-page' }
  ]
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logout())
    navigate('/login-page', { replace: true })
  }

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none'
                }}>
                AfraaTech
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit">
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' }
                  }}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link style={{ color: 'white', textDecoration: 'none' }} to="/">
                        Home
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">About</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Contact Us</Typography>
                  </MenuItem>
                </Menu>
              </Box>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none'
                }}>
                AfraaTech
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}>
                  <Link style={{ color: 'white', textDecoration: 'none' }} to="/">
                    {' '}
                    Home
                  </Link>
                </Button>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}>
                  About
                </Button>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}>
                  Contact Us
                </Button>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <IconButton>
                  <Link style={{ color: 'white', textDecoration: 'none' }} to="/cart-page">
                    <CartIcon value={cartItems.length > 0 ? cartItems.length : 0} />
                  </Link>
                </IconButton>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <RiAccountPinBoxFill style={{ color: 'white' }} />
                  </IconButton>
                </Tooltip>
                {!isLoggedIn && (
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}>
                    {notLoggedPages.map((page) => (
                      <MenuItem key={page.name} onClick={handleCloseUserMenu}>
                        <Link style={{ color: 'black', textDecoration: 'none' }} to={page.link}>
                          {page.name}
                        </Link>
                      </MenuItem>
                    ))}
                  </Menu>
                )}
                {isLoggedIn && (
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link
                        style={{ color: 'black', textDecoration: 'none' }}
                        to={`/dashboard/${userData?.role}-page/profile`}>
                        {' '}
                        {userData?.role} dashboard
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link
                        style={{ color: 'black', textDecoration: 'none' }}
                        to="/login-page"
                        onClick={handleLogout}>
                        Logout
                      </Link>{' '}
                    </MenuItem>
                  </Menu>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default Nav
