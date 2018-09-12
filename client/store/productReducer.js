import axios from 'axios'

const GOT_PRODUCTS = 'GOT_PRODUCTS'

const gotProductsFromServer = products => {
  return {
    type: GOT_PRODUCTS,
    products
  }
}

export const fetchProductsFromDB = () => {
  return async dispatch => {
    try {
      const {data: products} = await axios.get('/api/products')
      console.log('*******', products)
      dispatch(gotProductsFromServer(products))
    } catch (error) {
      console.error(error)
    }
  }
}
const productsReducer = (state = [], action) => {
  switch (action.type) {
    case GOT_PRODUCTS: {
      return action.products
    }
    default: {
      return state
    }
  }
}

export default productsReducer
