import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAnOrderFromDB} from '../store/orderReducer'
import {fetchProductsFromDB} from '../store/productReducer'
import {NavLink} from 'react-router-dom'

//const dummyData = [{orderId: 1, productId: 2}, {orderId: 1, productId: 3},  {orderId: 1, productId: 4},  {orderId: 1, productId: 5}]

class ShoppingCart extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAllProducts()
    const orderId = Number(this.props.match.params.id)
    this.props.getAnOrder(orderId)
  }

  render() {

    const allProducts = this.props.products
    const anOrder = this.props.order

    if (!allProducts.length) {
      return <div>Loading!</div>
    } else {
      return (
        <React.Fragment>
          <div>
            <table>
              <tr>
                <th>product name</th>
                <th>price</th>
              </tr>

              {anOrder.map(item => {
                const prod = allProducts.find(
                  product => item.productId === product.id
                )
                return (
                  <tr key={prod.id}>
                    <td>{prod.name}</td>
                    <td>{prod.price}</td>
                  </tr>
                )
              })}
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
