import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <h3>Welcome, NAME_HERE!</h3>
      <div>
        <img src='http://www.placecage.com/400/400' />
        <h3>NAME_GOES_HERE</h3>
        <p>EMAIL_GOES_HERE</p>
      </div>
      <div>
        <h2>Order History</h2>
        <div>
          <div className='single-order'>
            <h4>DATE_HERE</h4>
            <ul>
              <li>PRODUCT 1 NAME</li>
              <li>PRODUCT 2 NAME</li>
              <li>PRODUCT 3 NAME</li>
            </ul>
            <hr />
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
