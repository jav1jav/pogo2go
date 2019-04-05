import React, {Component} from 'react'
import {Elements} from 'react-stripe-elements';
import InjectedCheckoutForm from './CheckoutForm'

class StripeTest extends Component {

  render() {
    return(
      <div className="page-body column align-items-center">
        <Elements>
          <InjectedCheckoutForm />
        </Elements>
      </div>
    )
  }
}

export default StripeTest;
