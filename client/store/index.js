import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import usersReducer from './userReducer'
import productsReducer from './productReducer'
import ordersReducer from './orderReducer'

const reducer = combineReducers({
  user: usersReducer,
  products: productsReducer,
  order: ordersReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './userReducer'
export * from './productReducer'
export * from './orderReducer'
