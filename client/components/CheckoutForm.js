import React, {Component} from 'react'
import {connect} from 'react-redux'
import {CardElement, injectStripe} from 'react-stripe-elements'
import axios from 'axios'
import {fetchUserData} from '../store/userReducer'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      complete: false,
      user: {}
    }
    this.submit = this.submit.bind(this)
  }

  async submit(ev) {
    ev.preventDefault()
    console.log('USER ID====>', this.props.user.id)
    let {token} = await this.props.stripe.createToken({
      name: ev.target.email.value
    })

    let response = await axios.post('/charge', {
      source: token.id,
      // amount: 30099,
      description: 'NEW DESCRIPTION!',
      userId: this.props.user.id
    })

    if (response.status === 200) this.setState({complete: true})
  }

  async componentDidMount() {
    const {user, isLoggedIn} = this.props
    // If user is logged in, then send thunk to fetch the user data, which will then be used to generate list of products
    if (isLoggedIn) {
      console.log('getting user data ...')
      await this.props.fetchUserData(user.id)

      // Else, user is not logged in, so pull cart data from the localStorage, and set local component state with that list of products (or empty array if not found)
    }
    // else {
    //   const productListOnLocalStorage = JSON.parse(
    //     window.localStorage.getItem('productList')
    //   )
    //   this.setState({
    //     productList: productListOnLocalStorage ? productListOnLocalStorage : []
    //   })
    // }
  }

  render() {
    // console.log('USER =====> ', this.props.user)
    // console.log('ORDERS ====> ', this.props.user.orders)
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
              <tr>
                <td>The Commuter</td>
                <td>$199.99</td>
              </tr>
              <tr>
                <td>The Fixed Stick</td>
                <td>$149.99</td>
              </tr>
            </tbody>
          </table>
          <p>
            <span className="bold total">TOTAL: </span>TOTAL_HERE
          </p>
          <p>Enter info to complete purchase:</p>

          {/* ONLY RENDER THIS FORM IF NO USER LOGGED IN*/}
          <form
            className="checkout-form"
            style={{display: 'flex', flexDirection: 'column'}}
            onSubmit={this.submit}
          >
            <label>Email</label>
            <input type="text" name="email" />

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
