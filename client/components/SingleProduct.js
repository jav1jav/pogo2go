import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAProductFromDB, fetchProductsFromDB} from '../store/productReducer'
import {addAnItemToOrder, addAnOrderId} from '../store/orderReducer'

class SingleProduct extends Component {
  componentDidMount() {
    this.props.getAllProducts()
  }

  render() {
    const {user, isLoggedIn, products} = this.props
    const productId = Number(this.props.match.params.id)
    console.log('SingleProduct.js | render | productId:', productId)

    // Initialize aProduct prevents rendering errors before componentDidMount
    const aProduct = products.length
      ? products.find(el => el.id === productId)
      : {
          name: '',
          image: '',
          price: '',
          description: ''
        }

    const writeToCart = async () => {
      console.log('SingleProduct.js before isLoggedIn check | orderId', 'n/a', 'user.id', user.id, 'productId', productId)
      // if you're logged in, then if you don't have any orders
      // create an new order
      // else, find the order that is not yet purchased
      //   if there isn't an order that is not yet purchased, then
      //   create a new order
      if (isLoggedIn) {
        let newestOrder
        if (user.orders.length === 0) {
          newestOrder = await this.props.addAnOrderId(user.id)
          this.props.addAnItemToOrder(newestOrder.id, productId)
        } else {
          let tempOrder = user.orders.find(order => !order.isPurchased)
          if (tempOrder === null) {
            newestOrder = await this.props.addAnOrderId(user.id)
            this.props.addAnItemToOrder(newestOrder.id, productId)
          } else {
            newestOrder = tempOrder
            this.props.addAnItemToOrder(newestOrder.id, productId)
          }
        }

        console.log('singleProduct.js | writeToCart | newestOrder', newestOrder)


     } else {
        const productList = JSON.parse(window.localStorage.getItem('productList')) || []
        productList.push(aProduct)
        window.localStorage.setItem('productList', JSON.stringify(productList))
      }
    }

    return (
      <React.Fragment>
        <div className="single-product container flex column">
          {/* <div className="container flex column"> */}
            <div className="item-detail flex column">
              {/* <div className="flex column"> */}
                <div className="header">
                  <span>{aProduct.name}</span>
                </div>
                <img className="item-image" src={aProduct.image} />
                <span className='description'>{aProduct.description}</span>
              {/* </div> */}
              <span className="single-product-footer">${aProduct.price}</span>
            </div>
          {/* </div> */}
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
  addAnOrderId: (userId) => dispatch(addAnOrderId(userId)),
  addAnItemToOrder: (orderId, productId) => dispatch(addAnItemToOrder(orderId, productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
