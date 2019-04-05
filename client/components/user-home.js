import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchUserData} from '../store/userReducer'

export class UserHome extends Component {
  componentDidMount() {
    // TODO: Needs to be hooked up to state
    this.props.getUserData(this.props.user.id)
  }

  render() {
    return (
      <div className="page-body column align-items-center">
        {!this.props.user.orders ? (
          <p>loading...</p>
        ) : (
          <div>
            <h1>Account Information</h1>
            <div>
              <img src={this.props.user.imageUrl} />
              <h3>{this.props.user.name}</h3>
              <p>{this.props.user.email}</p>
            </div>
            <div>
              <h2>Order History</h2>
              {console.log('USER: ', this.props.user)}
              <div>
                {this.props.user.orders.map(order => order.isPurchased ? (
                  <div className="single-order" key={order.id}>
                    <h4>{order.createdAt.split('T')[0]}</h4>
                    <ul>
                      {order.products.map(product => (
                        <li key={product.id}>{product.name}</li>
                      ))}
                    </ul>
                    <hr />
                  </div>
                ) : (< span key={order.id}/>) )}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => ({
  getUserData: id => {
    dispatch(fetchUserData(id))
  }
})

export default connect(mapState, mapDispatch)(UserHome)
