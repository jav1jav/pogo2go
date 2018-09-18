import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAProductFromDB, fetchProductsFromDB} from '../store/productReducer'
import {addAnItemToOrder} from '../store/orderReducer'

class SingleProduct extends Component {
  componentDidMount() {
    this.props.getAllProducts()
  }

  render() {
    const {user, isLoggedIn, products} = this.props
    const productId = Number(this.props.match.params.id)

    // Initialize aProduct prevents rendering errors before componentDidMount
    const aProduct = products.length
      ? products.find(el => el.id === productId)
      : {
          name: '',
          image: '',
          price: '',
          description: ''
        }

    const writeToCart = () => {
      if (isLoggedIn) {
        const orderId = user.orders.find(order => !order.isPurchased).id
        this.props.addAnItemToOrder(orderId, productId)
     } else {
        const productList = JSON.parse(window.localStorage.getItem('productList')) || []
        productList.push(aProduct)
        window.localStorage.setItem('productList', JSON.stringify(productList))
      }
    }

    return (
      <React.Fragment>
        <div className="single-product container flex column">
          <div className="container flex column">
            <div className="item-detail flex column">
              <div className="flex column">
                <div className="header">
                  <span>{aProduct.name}</span>
                </div>
                <img className="item-image" src={aProduct.image} />
                <span className='description'>{aProduct.description}</span>
              </div>
              <span className="footer">${aProduct.price}</span>
            </div>
          </div>
          <button className='action-button' type="submit" onClick={writeToCart}>Add to Cart</button>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products,
  orders: state.orders,
  user: state.user,
  isLoggedIn: !!state.user.id
})

const mapDispatchToProps = dispatch => ({
  getAProduct: productId => dispatch(fetchAProductFromDB(productId)),
  getAllProducts: () => dispatch(fetchProductsFromDB()),
  addAnItemToOrder: (orderId, productId) => dispatch(addAnItemToOrder(orderId, productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
