import axios from 'axios'

//action strings
const GOT_AN_ORDER = 'GOT_AN_ORDER'

//action creators
const gotAnOrderFromServer = order => {
  return {
    type: GOT_AN_ORDER,
    order
  }
}

//thunks
export const fetchAnOrderFromDB = orderId => {
  return async dispatch => {
    try {
      const {data: order} = await axios.get(`/api/orders/${orderId}`)
      dispatch(gotAnOrderFromServer(order))
    } catch (error) {
      console.error(error)
    }
  }
}

//reducer
const ordersReducer = (state = [], action) => {
  switch (action.type) {
    case GOT_AN_ORDER: {
      return action.order
    }
    default: {
      return state
    }
  }
}

export default ordersReducer
