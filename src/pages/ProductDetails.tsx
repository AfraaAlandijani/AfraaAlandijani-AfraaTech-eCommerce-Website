import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { useNavigate, useParams } from 'react-router-dom'

import { AppDispatch, RootState } from '../redux/store'

import {
  Product,
  findProductById,
  productsRequest,
  productsSuccess
} from '../redux/slices/products/productSlice'

import { addToCart } from '../redux/slices/cart/cartSlice'

import api from '../api'

import {
  Button,
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Paper,
  Box
} from '@mui/material'

const ProductDetails = () => {
  const { id } = useParams()
  const dispatch: AppDispatch = useDispatch()
  const { singleProduct } = useSelector((state: RootState) => state.products)
  const { categories } = useSelector((state: RootState) => state.categories)
  const navigate = useNavigate()

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))
  }
  useEffect(() => {
    handleGetProducts()
  }, [])

  /**
   * If you want to keep things simple you can follow this approach on updating
   * redux state when using async requests instead of using createAsyncThunk
   */
  const handleGetProducts = async () => {
    // let's first turn the loader to true so we can have a better UX
    dispatch(productsRequest())
    // Fetching from the local files
    const response = await api.get('/mock/e-commerce/products.json')
    // At this point we have the data so let's update the store
    dispatch(productsSuccess(response.data))
    dispatch(findProductById(id))
  }

  const navigatePage = () => {
    navigate('/', { replace: true }) // Reset the form
  }

  const getCategoryName = (categoryId: number) => {
    const category = categories.find((category) => category.id == categoryId)
    return category ? category.name + ' , ' : 'Category not found'
  }
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto'
      }}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {singleProduct && (
            <Grid item key={singleProduct.id} xs={12} sm={6} md={4}>
              <Card sx={{ height: '50%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: '100%'
                  }}
                  image={singleProduct.image}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {singleProduct.name}
                  </Typography>
                  <Typography>{singleProduct.description} </Typography>
                  <Typography>
                    {' '}
                    {singleProduct.categories &&
                      singleProduct.categories.map((categoryId) => getCategoryName(categoryId))}
                  </Typography>
                  <Typography>{singleProduct.price} SAR </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => {
                      handleAddToCart(singleProduct)
                    }}>
                    Add to cart
                  </Button>
                  <Button size="small" onClick={navigatePage}>
                    Bach to shopping
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )}
        </Paper>
      </Grid>
    </Box>
  )
}
export default ProductDetails
