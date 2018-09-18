import React, {Component} from 'react'
import {connect} from 'react-redux'
import {CardElement, injectStripe} from 'react-stripe-elements'
import axios from 'axios'
import {fetchUserData} from '../store/userReducer'
import { orderTotal } from '../../utils/utils'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      complete: false,
      productList: []
    }
    this.submit = this.submit.bind(this)
  }

  async submit(ev) {
    ev.preventDefault();
    let email = ''

    if (this.props.isLoggedIn) {
      email = this.props.user.email;
    } else {
      email = ev.target.email.value;
    }
    let {token} = await this.props.stripe.createToken({
      name: email
    })

    let response = await axios.post('/charge', {
      source: token.id,
    })

    if (response.status === 200) this.setState({complete: true})
  }

  async componentDidMount() {
    const {user, isLoggedIn} = this.props
    // If user is logged in, then send thunk to fetch the user data, which will then be used to generate list of products
    if (isLoggedIn) {
      await this.props.fetchUserData(user.id)

      // Else, user is not logged in, so pull cart data from the localStorage, and set local component state with that list of products (or empty array if not found)
    }
    else {
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

    const productList =
      isLoggedIn && user.orders
        ? user.orders.find(order => !order.isPurchased).products
        : this.state.productList;

    const total = productList.length ? orderTotal(productList)
    : 0

    return !this.state.complete ? (
      <div className="container flex">
        <div className="checkout">
          <h1>Checkout</h1>
          <table className="item">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {productList.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            <span className="bold total">TOTAL: </span>${total}
          </p>
          <p>Enter info to complete purchase:</p>


          <form
            className="checkout-form"
            style={{display: 'flex', flexDirection: 'column'}}
            onSubmit={this.submit}>

            {/* Only ask for a users email if no one currently logged in */}
            {!isLoggedIn ? (
              <React.Fragment>
                <label>Email</label>
                <input type="text" name="email" />
              </React.Fragment>
            )
            : (<span />)}

            <CardElement />
            <button type="submit">Purchase</button>
          </form>
        </div>
      </div>
    ) : (
      <React.Fragment>
        <h1>Purchase Complete</h1>
        <p>Come by and pick up your pogo. You know where to find us!</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(
  injectStripe(CheckoutForm)
)
