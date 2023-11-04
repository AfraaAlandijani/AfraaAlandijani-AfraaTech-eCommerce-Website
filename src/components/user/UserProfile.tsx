import { useDispatch } from 'react-redux'

import { ChangeEvent, FormEvent, useState } from 'react'

import { AppDispatch } from '../../redux/store'

import { updateUser } from '../../redux/slices/users/userSlice'

import useUserState from '../../hooks/useUserState'

import UserSideBar from './UserSideBar'

import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  ListItemText,
  Paper,
  TextField,
  Typography
} from '@mui/material'

import { toast } from 'react-toastify'

const UserProfile = () => {
  const dispatch: AppDispatch = useDispatch()
  const { userData } = useUserState()
  const [isEditFormOpen, setIsEditFormOpen] = useState(false)
  const [user, setUser] = useState({
    firstName: userData?.firstName,
    lastName: userData?.lastName
  })
  const [firstNameValidation, setFirstNameValidation] = useState('')
  const [lastNameValidation, setLastNameValidation] = useState('')

  const handleEditForm = () => {
    setIsEditFormOpen(!isEditFormOpen)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => {
      return { ...prevUser, [e.target.name]: e.target.value }
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (user.firstName.length < 2) {
      setFirstNameValidation('Must be at least 2 Character')
      return
    }
    if (user.lastName.length < 2) {
      setLastNameValidation('Must be at least 2 Character')
      return
    }
    const updateUserData = { id: userData?.id, ...user }
    dispatch(updateUser(updateUserData))
    toast.success('Profile updated successfuly')
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <UserSideBar />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto'
        }}>
        {userData && (
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h3" color="inherit">
                  Profile
                </Typography>
                <Divider />
                <ListItemText
                  primary={`${userData?.firstName} ${userData?.lastName}`}></ListItemText>
                <ListItemText primary={userData?.email}></ListItemText>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2 }}
                  onClick={handleEditForm}>
                  Edit profile
                </Button>
                {isEditFormOpen && (
                  <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}>
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
                          margin="normal"
                          type="text"
                          label="First name"
                          value={user.firstName}
                          name="firstName"
                          onChange={handleChange}
                          autoFocus
                        />
                        <Typography variant="body2">{firstNameValidation}</Typography>

                        <TextField
                          margin="normal"
                          type="text"
                          label="Last name"
                          value={user.lastName}
                          name="lastName"
                          onChange={handleChange}
                          autoFocus
                        />
                        <Typography variant="body2">{lastNameValidation}</Typography>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 2 }}>
                          Update Profile
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                )}
              </Paper>
            </Grid>
          </Container>
        )}
      </Box>
    </Box>
  )
}

export default UserProfile
