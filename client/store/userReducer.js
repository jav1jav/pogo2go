import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const GOT_USER_DATA = 'GOT_USER_DATA'
const DELETED_AN_ITEM = 'DELETED_AN_ITEM';

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const gotUserData = (data) => ({type: GOT_USER_DATA, data})

const deletedAnItem = item => {
  return {
    type: DELETED_AN_ITEM,
    item
  }
}

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const fetchUserData = (userId) => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}`);
    dispatch(gotUserData(data))

  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const deleteAnItem = (orderId, productId) => {
  return async dispatch => {
    try {
      const { data: deletedItem } = await axios.delete(`/api/orders/${orderId}/${productId}`);
      // dispatch(deletedAnItem(deletedItem))
    } catch (error) {
      console.error(error);
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case GOT_USER_DATA:
      return action.data
    // case DELETED_AN_ITEM: {
    //   return {...state, orders: state.orders.filter(order => order.isPurchased).filter(order => !order.isPurchased).filter(item => item.id !== action.item.id)}
    // }
    default:
      return state
  }
}
