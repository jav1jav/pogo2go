import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUserData} from '../store/userReducer'
import {Link} from 'react-router-dom'
import { orderTotal } from '../../utils/utils'

class ShoppingCart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productList: []
    }
  }

  async componentDidMount() {
    const {user, isLoggedIn} = this.props

    // If user is logged in, then send thunk to fetch the user data, which will
    // then be used to generate list of products
    if (isLoggedIn) {
      await this.props.fetchUserData(user.id)

    // Else user is not logged in, so pull cart data from the localStorage, and
    // set local component state with that list of products (or empty array if
    // not found)
    } else {
      const productListOnLocalStorage = JSON.parse(
        window.localStorage.getItem('productList')
      )
      this.setState({
        productList: productListOnLocalStorage ? productListOnLocalStorage : []
      })
    }
  }

  render() {
    const {user, isLoggedIn} = this.props

    // Provided ComponentDidMount does its job, then productList gets assigned
    // either the products on the order found on the user object on props,
    // or we're pulling the products from localStorage which are stored in
    // the component's local state
    const productList =
      isLoggedIn && user.orders
        ? user.orders.find(order => !order.isPurchased).products
        : this.state.productList

    const removeItem = removedItemId => {
      //update product list in localStorage
      let cartList = JSON.parse(window.localStorage.getItem('productList'))
      cartList.splice(cartList.findIndex(item => item.id === removedItemId), 1)
      console.log('cartList', cartList)
      this.setState({productList: cartList})
      window.localStorage.setItem('productList', JSON.stringify(cartList))
    }

    return (
      <React.Fragment>
        <div>
          <table>
            <tbody>
              <tr>
                <th>product name</th>
                <th>price</th>
              </tr>
              {productList.map(prod => {
                return (
                  <tr key={prod.id}>
                    <td>{prod.name}</td>
                    <td>{prod.price}</td>
                    <td>
                      <button type="submit" onClick={() => removeItem(prod.id)}>
                        remove item
                      </button>
                    </td>
                  </tr>
                )
              })}
              <tr>
                <td>
                  <b>total</b>
                </td>
                <td>{orderTotal(productList)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <Link to="/store">Continue Shopping</Link>
          <br />
          <Link to="/checkout">Checkout</Link>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  isLoggedIn: !!state.user.id
})

const mapDispatchToProps = dispatch => ({
  fetchUserData: userId => dispatch(fetchUserData(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
