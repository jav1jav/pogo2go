import axios from 'axios'

//action strings
const GOT_PRODUCTS = 'GOT_PRODUCTS'
const GOT_A_PRODUCT = 'GOT_A_PRODUCT'

//action creators
const gotProductsFromServer = products => {
  return {
    type: GOT_PRODUCTS,
    products
  }
}

const gotAProductFromServer = product => {
  return {
    type: GOT_A_PRODUCT,
    product
  }
}

//thunks
export const fetchProductsFromDB = () => {
  return async dispatch => {
    try {
      const {data: products} = await axios.get('/api/products')
      dispatch(gotProductsFromServer(products))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchAProductFromDB = productId => {
  return async dispatch => {
    try {
      const {data: product} = await axios.get(`/api/products/${productId}`)
      dispatch(gotAProductFromServer(product))
    } catch (error) {
      console.error(error)
    }
  }
}

//reducer
const productsReducer = (state = [], action) => {
  switch (action.type) {
    case GOT_PRODUCTS: {
      return action.products
    }
    case GOT_A_PRODUCT: {
      return action.product //need to change to action.product when id is passed down
    }
    default: {
      return state
    }
  }
}

export default productsReducer
