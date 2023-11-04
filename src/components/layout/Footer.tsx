import { ThemeProvider } from '@emotion/react'

import { Box, Container, CssBaseline, Grid, Typography } from '@mui/material'

import theme from '../../theme'

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="white" align="center" {...props}>
      {'Copyright © '}
      AfraaTech {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const Footer = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Box
          sx={{
            width: '100%',
            height: 'auto',
            backgroundColor: 'primary.main',
            paddingTop: '1rem',
            paddingBottom: '1rem'
          }}>
          <Container maxWidth="lg">
            <Grid container direction="column" alignItems="center">
              <Grid item xs={12}>
                <Copyright sx={{ pt: 4 }} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default Footer
