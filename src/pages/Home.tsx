import { ChangeEvent, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../redux/store'

import { Link } from 'react-router-dom'

import { Product, searchProduct, sortProducts } from '../redux/slices/products/productSlice'

import { addToCart } from '../redux/slices/cart/cartSlice'

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Container,
  CssBaseline,
  MenuItem,
  FormControl,
  Select
} from '@mui/material'

import HeroSection from '../components/HeroSection'

import SearchInput from '../components/SearchInput'

import InputLabel from '@mui/material/InputLabel'

import { toast } from 'react-toastify'

import { ThemeProvider } from '@emotion/react'

import theme from '../theme'

const Home = () => {
  const dispatch: AppDispatch = useDispatch()
  const { items, isLoading, searchTerm } = useSelector((state: RootState) => state.products)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemPerPage] = useState(6)
  const filteredProducts = searchTerm
    ? items.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : items
  const indexOfLastItem = currentPage * itemPerPage
  const indexOfFirstItem = indexOfLastItem - itemPerPage
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem)
  const totalPage = Math.ceil(filteredProducts.length / itemPerPage)

  const buttonElements = []
  for (let i = 1; i <= totalPage - 1; i++) {
    buttonElements.push(
      <Button
        onClick={() => {
          handlePageChange(i)
        }}>
        {i}
      </Button>
    )
  }
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePrevChange = () => {
    setCurrentPage(currentPage - 1)
  }
  const handleNextChange = () => {
    setCurrentPage(currentPage + 1)
  }
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))
    toast.success('Item added to the cart successfully')
  }
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value
    dispatch(searchProduct(searchTerm))
  }

  const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    const sortTerm = e.target.value
    dispatch(sortProducts(sortTerm))
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <HeroSection />
        <FormControl style={{ margin: '20px', width: '120px' }}>
          <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
          <Select label="Sort By" onChange={handleFilter}>
            <em>Price</em>
            <MenuItem value="low-high">Low To High</MenuItem>
            <MenuItem value="high-low">High To Low</MenuItem>
            <em>Name</em>
            <MenuItem value="a-z"> A - Z</MenuItem>
            <MenuItem value="z-a">Z - A</MenuItem>
          </Select>
        </FormControl>
        <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} />
        {isLoading && <h3> Loading Products...</h3>}
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {currentItems.length > 0 &&
              currentItems.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: '100%'
                      }}
                      image={product.image}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {product.name}
                      </Typography>
                      <Typography>{product.description} </Typography>
                      <Typography>{product.price} SAR </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => {
                          handleAddToCart(product)
                        }}>
                        Add to cart
                      </Button>
                      <Link to={`products/${product.id}`}>
                        <Button size="small">show details</Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
          <Button onClick={handlePrevChange} disabled={currentPage === 1}>
            Previous
          </Button>
          {buttonElements}
          <Button onClick={handleNextChange} disabled={currentPage === totalPage}>
            Next
          </Button>
        </Container>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default Home
