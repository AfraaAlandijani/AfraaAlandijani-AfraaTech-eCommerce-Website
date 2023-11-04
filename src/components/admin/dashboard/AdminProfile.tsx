import { Box, Container, Divider, Grid, List, ListItemText, Paper, Typography } from '@mui/material'

import useUserState from '../../../hooks/useUserState'

import AdminSidebar from './AdminSidebar'

const AdminProfile = () => {
  const { userData } = useUserState()

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminSidebar />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto'
        }}>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <List>
                <Typography variant="h3" color="inherit">
                  Profile
                </Typography>
                <Divider />
                <ListItemText
                  primary={`${userData?.firstName} ${userData?.lastName}`}></ListItemText>
                <ListItemText primary={userData?.email}></ListItemText>
              </List>
            </Paper>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export default AdminProfile
