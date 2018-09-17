import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false};
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    ev.preventDefault();
    let {token} = await this.props.stripe.createToken({name:
      ev.target.email.value
    });

    let response = await axios.post('/charge', {
      source: token.id,
      amount: 30099,
      description: 'NEW DESCRIPTION!'
    })

    if (response.status === 200) this.setState({complete: true});
}

  render() {

    return (
      !this.state.complete ? (
        <div className="checkout">
          <h1>Checkout</h1>
          <table>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
            </tr>
            <tr>
              <td>The Commuter</td>
              <td>$199.99</td>
            </tr>
            <tr>
              <td>The Fixed Stick</td>
              <td>$149.99</td>
            </tr>
          </table>
          <p>TOTAL: TOTAL_HERE</p>
          <p>Enter info to complete purchase:</p>

          {/* ONLY RENDER THIS FORM IF NO USER LOGGED IN*/}
          <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={this.submit}>
            <label>Email</label>
            <input type='text' name='email' />

          <CardElement />
          <button type='submit'>Purchase</button>
          </form>
        </div>
      ) : (
        <React.Fragment>
          <h1>Purchase Complete</h1>
          <p>Come by and pick up your pogo. You know where to find us!</p>
        </React.Fragment>
      )

    );
  }
}

export default injectStripe(CheckoutForm);
