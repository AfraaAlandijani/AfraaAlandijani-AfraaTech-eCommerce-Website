import { ListItemButton, ListItemIcon } from '@mui/material'

import DashboardIcon from '@mui/icons-material/Dashboard'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import PeopleIcon from '@mui/icons-material/People'

import { Link } from 'react-router-dom'

export const AdminDashboardItems = (
  <>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <Link to="/dashboard/admin-page/profile">Profile</Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link to="/dashboard/admin/categories">Categories</Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link to="/dashboard/admin/products">Products</Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <Link to="/dashboard/admin/users">Users</Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <Link to="/dashboard/admin/orders">Orders</Link>
    </ListItemButton>
  </>
)
