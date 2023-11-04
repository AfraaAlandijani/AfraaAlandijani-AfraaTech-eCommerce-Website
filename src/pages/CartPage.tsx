import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch, RootState } from '../redux/store'

import {
  Avatar,
  Button,
  CardActions,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography
} from '@mui/material'

import { FaTrashAlt } from 'react-icons/fa'

import { removeFromCart } from '../redux/slices/cart/cartSlice'

import Checkout from '../components/user/Checkout'

const CartPage = () => {
  const dispatch: AppDispatch = useDispatch()
  const { cartItems } = useSelector((state: RootState) => state.cart)

  return (
    <>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          {' '}
          Cart
        </Typography>
        <Divider />
        <Typography variant="h6" align="center">
          {cartItems.length > 0
            ? `You have ${cartItems.length} items in your cart`
            : 'No items in your cart'}
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {cartItems.length > 0 &&
            cartItems.map((product) => (
              <ListItem key={product.id} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={product.name} src={product.image} />
                </ListItemAvatar>
                <ListItemText
                  primary={product.name}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary">
                        {product.price} SAR
                      </Typography>
                      <CardActions>
                        <Button size="small">
                          <FaTrashAlt
                            onClick={() => dispatch(removeFromCart({ productId: product.id }))}
                          />
                        </Button>
                      </CardActions>
                      <Divider />
                    </>
                  }
                />
              </ListItem>
            ))}
        </List>
      </Paper>

      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Checkout />
      </Paper>
    </>
  )
}

export default CartPage
