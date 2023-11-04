import UserSideBar from './UserSideBar'

import { Box, Container, Divider, Grid, Paper, Typography } from '@mui/material'

const UserOrders = () => {
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
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid item xs={12}></Grid>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h3" color="inherit">
              Orders
            </Typography>
            <Divider />
          </Paper>
        </Container>
      </Box>
    </Box>
  )
}

export default UserOrders
