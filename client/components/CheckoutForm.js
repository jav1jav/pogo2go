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
      // OB: security issue, amount should be determined server side
      amount: 30099,
      description: 'NEW DESCRIPTION!'
    })

    if (response.status === 200) this.setState({complete: true});
}

  render() {
    if (this.state.complete) return (
      <React.Fragment>
        <h1>Purchase Complete</h1>
        <p>Come by and pick up your pogo. You know where to find us!</p>
      </React.Fragment>
    );

    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={this.submit}>
          <label>Email</label>
          <input type='text' name='email' />

        <CardElement />
        <button type='submit'>Purchase</button>
        </form>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
