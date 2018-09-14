import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUserData} from '../store/userReducer'
import {NavLink} from 'react-router-dom'

class ShoppingCart extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    const userId = 1 //TODO: find the user data off the session
    await this.props.fetchUserData(userId)
  }

  render() {
    const aUser = this.props.user
    const userOrders = aUser.orders
    if (!userOrders) {
      return <div>Loading!</div>
    } else {
      const anOrder = userOrders.find(order => !order.isPurchased)
      const orderTotal = anOrder.products
        .map(product => Number(product.price))
        .reduce((curr, acc) => curr + acc, 0)
      return (
        <React.Fragment>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>product name</th>
                  <th>price</th>
                </tr>
                {anOrder.products.map(prod => {
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
        </React.Fragment>
      )
    }
  }
}

const mapStateToProps = state => ({
  products: state.products,
  order: state.order,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchUserData: userId => dispatch(fetchUserData(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
