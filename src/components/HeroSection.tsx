import { Typography, Box, Button, Stack, Container } from '@mui/material'

const imageURL =
  'https://img.freepik.com/free-photo/modern-office-desk-composition-with-technological-device_23-2147916715.jpg?w=900&t=st=1698915553~exp=1698916153~hmac=281d98dc0ef84c2f322b0ebf5c5ef5ae06b1162305f94cd997e1ee3b04a6de31.jpg'

const styles = {
  heroContainer: {
    height: 400,
    backgroundImage: `url(${imageURL})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: `calc(100vw + 48px)`,
    margin: -0,
    padding: 24
  }
}

const HeroSection = () => {
  return (
    <Box
      style={styles.heroContainer}
      sx={{
        bgcolor: 'background.paper',
        pt: 8,
        pb: 6
      }}>
      <Container maxWidth="sm">
        <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
          MEET THE NEW TECHNOLOGY
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary">
          Find you needs with us, Enjoy!
        </Typography>
        <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
          <Button variant="contained">Shop Now</Button>
          <Button variant="outlined">Discover More</Button>
        </Stack>
      </Container>
    </Box>
  )
}

export default HeroSection
