import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAProductFromDB, fetchProductsFromDB} from '../store/productReducer'
import {NavLink} from 'react-router-dom'

class SingleProduct extends Component {
  // OB/JD: unnecessary code
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // if (this.props.products.length) {
    this.props.getAllProducts()
    // } else {
    //   // const productId = this.props.match.params.id
    //   // this.props.getAProduct(productId)
    // }
  }

  render() {
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
    /*
    OB/JD: might be better to show a Loading view of some kind instead of a "blank" view
    if (loading) {
      return <Loading />; // or whatever
    }
    */
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
