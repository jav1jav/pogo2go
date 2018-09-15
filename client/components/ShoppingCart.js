import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUserData} from '../store/userReducer'
import {Link} from 'react-router-dom'

class ShoppingCart extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    const userId = 1 //TODO: find the user data off the session
    await this.props.fetchUserData(userId)
  }

  render() {
    const isLoggedIn = false //TODO: set the login status
    let productList

    // assuming that if you're logged in we're pulling from state (I think there are corner cases that will be screwed) then
     if (isLoggedIn) {
      const aUser = this.props.user
      productList = aUser.orders.find(order => !order.isPurchased).products
     } else {
      productList = JSON.parse(window.localStorage.getItem('productList'))
     }

    const orderTotal = productList
    .map(product => Number(product.price))
    .reduce((curr, acc) => curr + acc, 0)

// if you're logged in but you don't have a user, you have to show loading till we get the user from the update of state in componentDidMount
// or
// if you're not loggged in and there's no productList on local storage we have to render a blank cart
//    if (isLoggedIn && aUser)  {
    if (false) {
      return <div>Loading!</div>
    } else {
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
                    </tr>
                  )
                })}
                <tr>
                  <td>
                    <b>total</b>
                  </td>
                  <td>{orderTotal}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div><Link to="/store">Continue Shopping</Link></div>
        </React.Fragment>
      )
    }
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchUserData: userId => dispatch(fetchUserData(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
