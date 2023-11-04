import { Box, Container, Grid, Paper } from '@mui/material'

import AdminSidebar from '../dashboard/AdminSidebar'

import { CategoryManager } from './CategoryManager'

const Categories = () => {
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
              <CategoryManager />
            </Paper>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export default Categories
