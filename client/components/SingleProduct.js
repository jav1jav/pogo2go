import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAProductFromDB, fetchProductsFromDB} from '../store/productReducer'
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
    const isLoggedIn = false;
    const productId = Number(this.props.match.params.id)
    const allProducts = this.props.products
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

    const writeToCart = () => {
      //event.preventDefault
      if (isLoggedIn) {
        //dispatch thunk to create order

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
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  getAProduct: productId => dispatch(fetchAProductFromDB(productId)),
  getAllProducts: () => dispatch(fetchProductsFromDB())
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
