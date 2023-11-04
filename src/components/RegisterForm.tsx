import { ChangeEvent, FormEvent } from 'react'

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
  Container
} from '@mui/material'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import { ThemeProvider } from '@emotion/react'

import theme from '../theme'

import { User } from '../redux/slices/users/userSlice'

type UserFormProps = {
  user: User
  handleSubmit: (e: FormEvent) => void
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  firstNameValidation: string
  lastNameValidation: string
  emailValidation: string
  passowrdValidation: string
}

export function RegisterForm({
  user,
  handleSubmit,
  handleChange,
  firstNameValidation,
  lastNameValidation,
  emailValidation,
  passowrdValidation
}: UserFormProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Container component="main" maxWidth="xs" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: 'white'
            }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    value={user.firstName}
                    onChange={handleChange}
                    autoFocus
                  />
                  <Typography variant="body2">{firstNameValidation}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                    autoComplete="family-name"
                  />
                  <Typography variant="body2">{lastNameValidation}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                  <Typography variant="body2">{emailValidation}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={user.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />
                  <Typography variant="body2">{passowrdValidation}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login-page" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </CssBaseline>
    </ThemeProvider>
  )
}
