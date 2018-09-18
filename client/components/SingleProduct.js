import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAProductFromDB, fetchProductsFromDB} from '../store/productReducer'
import {addAnItemToOrder} from '../store/orderReducer'

import {NavLink} from 'react-router-dom'

// updating single prod page so that button to add item to cart, adds item to db
// update write to cart to handle logged in case
//  dispatch so that redux will make post to express to update db

class SingleProduct extends Component {
  componentDidMount() {
    // if (this.props.products.length) {
    this.props.getAllProducts()
    // } else {
    //   // const productId = this.props.match.params.id
    //   // this.props.getAProduct(productId)
    // }
  }

  render() {
    const {user, isLoggedIn, products} = this.props
    const orderId = user.orders.find(order => !order.isPurchased).id
    const productId = Number(this.props.match.params.id)
    const allProducts = products
    //Since the componentDidMount hasn't run on the initial render, we are
    //initializing values so the aProduct does not error out on the inital React render
    const aProduct = allProducts.length
      ? allProducts.find(el => el.id === productId)
      : {
          name: '',
          image: '',
          price: '',
          description: ''
        }
 console.log('singleProduct.js | isLoggedIn in component', isLoggedIn)
    const writeToCart = () => {
      //event.preventDefault
      console.log('singleProduct.js | writeToCart ', isLoggedIn)
      if (isLoggedIn) {
        addAnItemToOrder(orderId, productId)

      } else {
        //write locally
        const productList = JSON.parse(window.localStorage.getItem('productList')) || []
        productList.push(aProduct)
        window.localStorage.setItem('productList', JSON.stringify(productList))
      }
    }

    return (
      <React.Fragment>
        <h1 className="title">{aProduct.name}</h1>
        <div className="container flex products">
          {' '}
          {/* container for single products*/}
          {/* this works but the divs/css are placeholder code only, needs to be changed */}
          <div key={aProduct.name} className="item flex column">
            <div className="flex column">
              <img className="item-image" src={aProduct.image} />
            </div>
            <div>
              <h3 className="footer">${aProduct.price}</h3>
            </div>
            <div className="flex column">
              <p>{aProduct.description}</p>
            </div>
            <div><button type="submit" onClick={writeToCart}>Buy Me!</button></div>
          </div>
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
