import { ChangeEvent, useState, FormEvent } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../../../redux/store'

import {
  addProduct,
  removeProduct,
  searchProduct,
  updateProduct,
  Product
} from '../../../redux/slices/products/productSlice'

import SearchInput from '../../SearchInput'

import { ProductForm } from './ProductForm'

import { FaTrashAlt, FaEdit } from 'react-icons/fa'

import FirstPageIcon from '@mui/icons-material/FirstPage'

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'

import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'

import LastPageIcon from '@mui/icons-material/LastPage'

import {
  Box,
  IconButton,
  TableFooter,
  TablePagination,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
  Container
} from '@mui/material'

import { useTheme } from '@mui/material/styles'

import { toast } from 'react-toastify'

const initialProductState: Product = {
  id: 0,
  name: '',
  price: 0,
  image: '',
  description: '',
  categories: [],
  variants: [],
  sizes: []
}

interface TablePaginationActionsProps {
  count: number
  page: number
  rowsPerPage: number
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page">
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page">
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  )
}

export function ProductsManager() {
  const dispatch = useDispatch<AppDispatch>()
  const { items, isLoading, searchTerm } = useSelector((state: RootState) => state.products)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [product, setProduct] = useState<Product>(initialProductState)
  const [isEdit, setIsEdit] = useState(false)
  const [productId, setProductId] = useState(0)
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState(0)
  const [productImage, setProductImage] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productCategories, setProductCategories] = useState('')
  const [productVariants, setProductVariants] = useState('')
  const [productSize, setProductSize] = useState('')

  const handleEditForm = (
    id: number,
    name: string,
    image: string,
    description: string,
    variants: string,
    size: string,
    price: number
  ) => {
    setProductId(id)
    setIsEdit(!isEdit)
    setProductName(name)
    setProductPrice(price)
    setProductImage(image)
    setProductDescription(description)
    setProductVariants(variants)
    setProductSize(size)
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    switch (name) {
      case 'name':
        setProductName(value)
        break
      case 'price':
        setProductPrice(Number(value))
        break
      case 'image':
        setProductImage(value)
        break
      case 'description':
        setProductDescription(value)
        break
      case 'categories':
        setProductCategories(value)
        break
      case 'variants':
        setProductVariants(value)
        break
      case 'size':
        setProductSize(value)
        break
      default:
        throw new Error('Unknown name')
    }

    const isList = name === 'categories' || name === 'variants' || name === 'sizes'
    if (isList) {
      setProduct({
        ...product,
        [name]: value.split(',')
      })
      return
    }
    setProduct({
      ...product,
      [name]: value
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!isEdit) {
      // Send the product data to your backend or in this case send it to Redux
      console.log('New product data:', product)
      // let's add Id property to the object (usually IDs are generated automatically on the backend)
      product.id = +new Date()
      console.log('product:', product)
      dispatch(addProduct({ product }))
      toast.success('New product added successfuly')
    } else {
      const updateCategoryData = {
        id: productId,
        name: productName,
        image: productImage,
        description: productDescription,
        categories: productCategories.split(','),
        variants: productVariants.split(','),
        size: productSize.split(','),
        price: productPrice
      }
      dispatch(updateProduct(updateCategoryData))
      toast.success('Product updated successfuly')
      setIsEdit(!isEdit)
    }
    // Reset the form
    setProduct(initialProductState)
    setProductName('')
    setProductPrice(0)
    setProductImage('')
    setProductDescription('')
    setProductVariants('')
    setProductSize('')
  }
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value
    dispatch(searchProduct(searchTerm))
  }
  const filteredProducts = searchTerm
    ? items.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : items

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredProducts.length) : 0

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  return (
    <Container component="main" maxWidth="lg">
      <ProductForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        isEdit={isEdit}
        productName={productName}
        productPrice={productPrice}
        productImage={productImage}
        productDescription={productDescription}
        productCategories={productCategories}
        productVariants={productVariants}
        productSize={productSize}
      />

      <TableContainer component={Paper}>
        {isLoading && <h3> Loading Products...</h3>}
        <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} />
        <Table sx={{ minWidth: 650 }} aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>ID </TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Imge</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Variants</TableCell>
              <TableCell align="left">Size</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Edit</TableCell>
              <TableCell align="left">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : filteredProducts
            ).map((product) => (
              <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {product.id}
                </TableCell>
                <TableCell align="left">{product.name}</TableCell>
                <TableCell align="left">{product.image}</TableCell>
                <TableCell align="left">{product.description}</TableCell>
                <TableCell align="left">
                  {product.variants && product.variants.join(' , ')}
                </TableCell>
                <TableCell align="left">{product.sizes && product.sizes.join(' , ')}</TableCell>
                <TableCell align="left">{product.price}</TableCell>

                <TableCell align="left">
                  <FaEdit
                    onClick={() => {
                      handleEditForm(
                        product.id,
                        product.name,
                        product.image,
                        product.description,
                        product.variants.join(' , '),
                        product.sizes.join(' , '),
                        product.price
                      )
                    }}
                  />{' '}
                </TableCell>
                <TableCell align="left">
                  <FaTrashAlt onClick={() => dispatch(removeProduct({ productId: product.id }))} />{' '}
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={4}
                count={filteredProducts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page'
                  },
                  native: true
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  )
}
