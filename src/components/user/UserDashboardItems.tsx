import { ListItemButton, ListItemIcon } from '@mui/material'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import PeopleIcon from '@mui/icons-material/People'

import { Link } from 'react-router-dom'

export const UserDashboardItems = (
  <>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <Link to="/dashboard/user-page/profile">Profile</Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <Link to="/dashboard/user/orders">Orders</Link>
    </ListItemButton>
  </>
)
