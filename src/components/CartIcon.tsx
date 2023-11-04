import { Badge, IconButton } from '@mui/material'

import { TiShoppingCart } from 'react-icons/Ti'

const CartIcon = ({ value }: { value: number }) => {
  return (
    <IconButton sx={{ p: 0 }}>
      <Badge badgeContent={value} color="secondary" style={{ color: 'white' }}>
        <TiShoppingCart />
      </Badge>
    </IconButton>
  )
}
export default CartIcon
