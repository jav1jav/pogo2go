import React, {Component} from 'react'
import {connect} from 'react-redux'
// import { fetchProductsFromDB } from '../store'
import {NavLink} from 'react-router-dom'

const aProduct =
  {
    name: 'The Commuter',
    price: 199.99,
    description:
      'Taiyaki portland enamel pin trust fund, cardigan cred whatever vice chicharrones roof party kale chips pabst venmo. Wayfarers air plant wolf everyday carry shaman whatever raclette distillery umami blog ennui thundercats direct trade. Gochujang selfies heirloom thundercats everyday carry occupy, cray freegan organic sartorial yuccie. Flannel polaroid vape, XOXO photo booth pork belly migas woke enamel pin portland cold-pressed truffaut farm-to-table pug.',
      image:
      'https://d39qw52yhr4bcj.cloudfront.net/catalog/product/cache/9/image/9df78eab33525d08d6e5fb8d27136e95/7/7/770x_acomp.jpg'
  }


class SingleProduct extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <React.Fragment>
        <h1 className='title' >{aProduct.name}</h1>
        <div className='container flex products'> {/* container for single products*/}
          {/* this works but the divs/css are placeholder code only, needs to be changed */}
            <div key={aProduct.name} className='item flex column'>
              <div className='flex column'>
                <img className='item-image' src={aProduct.image} />
              </div>
              <div>
              <h3 className='footer'>${aProduct.price}</h3>
              </div>
              <div className='flex column'>
                <p>{aProduct.description}</p>
              </div>
            </div>
        </div>
      </React.Fragment>
    )
  }
}

export default SingleProduct
