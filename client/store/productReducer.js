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

// OB/JD: polymorphic state, in this case sometimes an array, sometimes an object, beware that! can lead to easy misunderstandings

/*
OB/JD: consider using an object for faster / easier lookup

[{id: 1, name: 'foo'}, {id: 2, name: 'bar'}] // current state example
// would become...
{1: {id: 1, name: 'foo'}, 2: {id: 2, name: 'bar'}} // other option example
*/

//reducer
const productsReducer = (state = [], action) => {
  switch (action.type) {
    case GOT_PRODUCTS: {
      return action.products
    }
    case GOT_A_PRODUCT: {
      // OB/JD: "todo" comments can also go into github somewhere, but also it's a undead comment
      return action.product //need to change to action.product when id is passed down
    }
    default: {
      return state
    }
  }
}

export default productsReducer
