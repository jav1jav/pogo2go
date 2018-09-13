import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProductsFromDB} from '../store/productReducer'
import {NavLink} from 'react-router-dom'

class AllProducts extends Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    console.log('PRODUCTS**', this.props.products)
    return (
      <React.Fragment>
        <h1 className="title">Choose your pogo</h1>
        <div className="container flex gallery">
          {' '}
          {/* container for all products*/}
          {this.props.products.map(item => (
            <NavLink to={`/store/${item.id}`} key={item.name}>
              <div className="item flex column">
                <div className="flex column">
                  <div className="header">
                    <span>{item.name}</span>
                  </div>
                  <img className="item-image" src={item.image} />
                </div>
                <span className="footer">${item.price}</span>
              </div>
            </NavLink>
          ))}
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(fetchProductsFromDB())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
