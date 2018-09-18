import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAProductFromDB, fetchProductsFromDB} from '../store/productReducer'
import {NavLink} from 'react-router-dom'

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
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  getAProduct: productId => dispatch(fetchAProductFromDB(productId)),
  getAllProducts: () => dispatch(fetchProductsFromDB())
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
