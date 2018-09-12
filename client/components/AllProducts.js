import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProductsFromDB} from '../store'
import {NavLink} from 'react-router-dom'

const dummyData = [
  {
    name: 'The Commuter',
    price: 199.99,
    description:
      'Taiyaki portland enamel pin trust fund, cardigan cred whatever vice chicharrones roof party kale chips pabst venmo. Wayfarers air plant wolf everyday carry shaman whatever raclette distillery umami blog ennui thundercats direct trade. Gochujang selfies heirloom thundercats everyday carry occupy, cray freegan organic sartorial yuccie. Flannel polaroid vape, XOXO photo booth pork belly migas woke enamel pin portland cold-pressed truffaut farm-to-table pug.',
    image:
      'https://d39qw52yhr4bcj.cloudfront.net/catalog/product/cache/9/image/9df78eab33525d08d6e5fb8d27136e95/7/7/770x_acomp.jpg'
  },
  {
    name: 'The Fixed Stick',
    price: 149.99,
    description:
      'Jianbing jean shorts direct trade, poke butcher ethical cliche helvetica dreamcatcher. Succulents shabby chic schlitz truffaut raw denim, cardigan swag jianbing fashion axe poutine lomo ethical mlkshk chia plaid. Portland blog godard af, blue bottle tbh actually literally pop-up edison bulb poke biodiesel.',
    image:
      'https://d39qw52yhr4bcj.cloudfront.net/catalog/product/cache/9/image/9df78eab33525d08d6e5fb8d27136e95/7/7/770x_acomp.jpg'
  },
  {
    name: 'The Urban Stick',
    price: 299.99,
    description:
      'Vexillologist occupy bicycle rights cray humblebrag DIY, plaid poutine dreamcatcher typewriter jianbing. Palo santo meditation blog tilde bicycle rights kale chips whatever bushwick cold-pressed authentic echo park enamel pin tattooed hot chicken synth. Migas unicorn cold-pressed, raclette tumeric tousled roof party heirloom church-key fanny pack paleo deep v. Cliche pinterest tote bag, flannel kinfolk succulents heirloom blog dreamcatcher cray man bun.',
    image:
      'https://d39qw52yhr4bcj.cloudfront.net/catalog/product/cache/9/image/9df78eab33525d08d6e5fb8d27136e95/7/7/770x_acomp.jpg'
  }
]

class AllProducts extends Component {
  // constructor(props) {
  //   super(props)
  // }
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    console.log(this.props.getProducts())
    return (
      <React.Fragment>
        <h1 className="title">Choose your pogo</h1>
        <div className="container flex gallery">
          {' '}
          {/* container for all products*/}
          {dummyData.map(item => (
            <NavLink to={`/products/${item.id}`} key={item.name}>
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
