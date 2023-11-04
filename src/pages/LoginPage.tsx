import { ChangeEvent, FormEvent, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { useNavigate } from 'react-router-dom'

import { AppDispatch, RootState } from '../redux/store'

import { login } from '../redux/slices/users/userSlice'

import { toast } from 'react-toastify'

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Paper
} from '@mui/material'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import { ThemeProvider } from '@mui/material/styles'

import theme from '../theme'

const LoginPage = ({ pathName }: { pathName: string }) => {
  const { users } = useSelector((state: RootState) => state.users)
  const dispatch: AppDispatch = useDispatch()

  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value }
    })
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const foundUser = users.find((userData) => userData.email == user.email)
      if (!foundUser) {
        toast.error('No user found with this email')
        return
      }
      if (foundUser.password == user.password) {
        toast.error('Incorrect password')
        return
      }
      if (foundUser.blocked) {
        toast.error(
          'Sorry you are blocked. Please reach out to us for more information at afraakandijani@gmail.com'
        )
        return
      }
      dispatch(login(foundUser))
      navigate(pathName ? pathName : `/dashboard/${foundUser.role}-page/profile`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random?electronics)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={user.password}
                  onChange={handleInputChange}
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/register-page" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default LoginPage
