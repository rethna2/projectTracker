import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { Typography } from '@material-ui/core';

import CheckoutForm from '../components/pricing/CheckoutForm';
import PricingList from '../components/pricing/PricingList';

class Pricing extends Component {
  state = {
    showForm: false,
    price: null,
    paymentDone: false
  };

  onBuy = price => {
    this.setState({ price, showForm: true });
  };

  render() {
    return (
      <StripeProvider apiKey="pk_test_sCm1r52hcnobvKsRmMZ4laf1">
        <div>
          <PricingList onBuy={this.onBuy} />
          {this.state.showForm && (
            <Elements>
              <CheckoutForm
                price={this.state.price}
                onPaymentDone={() =>
                  this.setState({ paymentDone: true, showForm: false })
                }
              />
            </Elements>
          )}
          {this.state.paymentDone && (
            <Typography variant="h3" style={{ textAlign: 'center' }}>
              Thank You
            </Typography>
          )}
        </div>
      </StripeProvider>
    );
  }
}

export default Pricing;
