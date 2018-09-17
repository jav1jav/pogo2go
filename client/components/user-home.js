import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchUserData} from '../store/userReducer'

export class UserHome extends Component {
  componentDidMount() {
    // TODO: Needs to be hooked up to state
    // OB: shouldn't be necessary, user data should already be on the store state as `storeState.user`
    this.props.getUserData(4)
  }

  render() {
    return (
      <div>
        {!this.props.user.user ? (
          <p>loading...</p>
        ) : (
          <div>
            <h3>Welcome, {this.props.user.user.name}</h3>
            <div>
              <img src={this.props.user.user.imageUrl} />
              <h3>{this.props.user.user.name}</h3>
              <p>{this.props.user.user.email}</p>
            </div>
            <div>
              <h2>Order History</h2>
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
                  // OB: bugfix below
                ) : (<span key={order.id}/>) )}
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
