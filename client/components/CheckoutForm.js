import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false};
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: "Name"});
    console.log('TOKEN ====> ', token)
    let response = await fetch("/charge", {
      method: "POST",
      headers: {"Content-Type": "text/plain"},
      body: token.id
    });

    if (response.ok) this.setState({complete: true});
}


  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;

    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <form>
          <label>First Name</label>
          <input type='text' name='firstName'/>
          <label>Last Name</label>
          <input type='text' name='lastName'/>
          <label>Address</label>
          <input type='text' name='address'/>
          <label>Country</label>
          <input type='text' name='country'/>
        </form>
        <CardElement />
        <button type='submit' onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
