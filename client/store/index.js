import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import usersReducer from './userReducer'
import productsReducer from './productReducer'

/*
OB/JD: what to store on state

Two main competing ideas: A) separate store state for "all products" and "current product" VS. B) store state for "all products" ONLy and "current product" is dervived via that and the URL (props.match.params.id or whatever)

A) redundant state
Has the advantage of being easy to read from the store, disadvantage updating gets trickier

B) selector (I tend to default here)
Has the advantage of minimum complexity when updating, disadvantage is more complex read logic
*/
const reducer = combineReducers({
  user: usersReducer,
  products: productsReducer,
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './userReducer'
export * from './productReducer'
