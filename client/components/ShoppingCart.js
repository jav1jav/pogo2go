import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAnOrderFromDB} from '../store/orderReducer'
import {fetchProductsFromDB} from '../store/productReducer'
import {NavLink} from 'react-router-dom'

class ShoppingCart extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    const orderId = Number(this.props.match.params.id)
    await this.props.getAnOrder(orderId)
    await this.props.getAllProducts()
  }

  render() {
    const anOrder = this.props.order.anOrder
    const total = this.props.order.total
    const allProducts = this.props.products

    console.log('anOrder', anOrder)
    if (!allProducts.length || !anOrder) {
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
                  <td>{total}</td>
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
  order: state.order
  //user: state.user
})

const mapDispatchToProps = dispatch => ({
  getAnOrder: orderId => dispatch(fetchAnOrderFromDB(orderId)),
  getAllProducts: () => dispatch(fetchProductsFromDB())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
