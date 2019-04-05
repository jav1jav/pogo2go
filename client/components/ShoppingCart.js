import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUserData, deleteAnItem} from '../store/userReducer'
import {Link} from 'react-router-dom'
import {orderTotal} from '../../utils/utils'

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
    const loggedInUserCart = user.orders
      ? user.orders.find(order => !order.isPurchased)
      : []
    const productList =
      isLoggedIn && user.orders
        ? loggedInUserCart.products
        : this.state.productList

    const removeItem = removedItemId => {
      console.log('in Remove Item')
      console.log('isLoggedIn? ', isLoggedIn)
      if (isLoggedIn) {
        const orderId = loggedInUserCart.id
        this.props.deleteAnItem(orderId, removedItemId)
      } else {
        //update product list in localStorage
        let cartList = JSON.parse(window.localStorage.getItem('productList'))
        cartList.splice(
          cartList.findIndex(item => item.id === removedItemId),
          1
        )
        this.setState({productList: cartList})
        window.localStorage.setItem('productList', JSON.stringify(cartList))
      }
    }

    return (
      <React.Fragment>
        <h1>Shopping Cart</h1>
        <div className="page-body flex column align-items-center">
          <table className="item">
            <tbody>
              <tr>
                <th />
                <th>PRODUCT NAME</th>
                <th>PRICE</th>
              </tr>
              {productList.map(prod => {
                return (
                  <tr key={prod.id}>
                    <td>
                      <button type="submit" onClick={() => removeItem(prod.id)}>
                        remove item
                      </button>
                    </td>
                    <td>{prod.name}</td>
                    <td>{prod.price}</td>
                  </tr>
                )
              })}
              <tr>
                <td />
                <td>
                  <b>total</b>
                </td>
                <td>{orderTotal(productList)}</td>
              </tr>
            </tbody>
          </table>
          {/* </div>
        <div> */}
          <Link className="black" to="/store">
            Continue Shopping
          </Link>
          <br />
          <Link className="black" to="/checkout">
            Checkout
          </Link>
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
  fetchUserData: userId => dispatch(fetchUserData(userId)),
  deleteAnItem: (orderId, productId) =>
    dispatch(deleteAnItem(orderId, productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
