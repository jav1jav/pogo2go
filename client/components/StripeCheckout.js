import React, {Component} from 'react'
import {Elements} from 'react-stripe-elements';
import InjectedCheckoutForm from './CheckoutForm'

class StripeTest extends Component {

  render() {
    return(
      <React.Fragment>
        <Elements>
          <InjectedCheckoutForm />
        </Elements>
      </React.Fragment>
    )
  }
}

export default StripeTest;
