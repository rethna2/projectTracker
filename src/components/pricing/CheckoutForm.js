import React, { Component } from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  CardElement,
  injectStripe
} from 'react-stripe-elements';

import { Card, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',
    width: 500,
    padding: 20,
    margin: '50px auto',
    backgroundColor: theme.palette.secondary.light
  },
  flex: {
    display: 'flex',
    alignItems: 'center'
  },
  textInput: {
    display: 'block',
    margin: '10px 0 20px 0',
    maxWidth: 500,
    padding: '10px 14px',
    fontSize: '1em',
    fontFamily: "'Source Code Pro', monospace",
    boxShadow:
      'rgba(50, 50, 93, 0.14902) 0px 1px 3px, rgba(0, 0, 0, 0.0196078) 0px 1px 0px',
    border: 0,
    outline: 0,
    borderRadius: 4,
    background: 'white'
  },
  smallLabel: {
    minWidth: 150,
    marginRight: 50
  }
});

const handleBlur = () => {
  console.log('[blur]');
};
const handleChange = change => {
  console.log('[change]', change);
};
const handleClick = () => {
  console.log('[click]');
};
const handleFocus = () => {
  console.log('[focus]');
};
const handleReady = () => {
  console.log('[ready]');
};

const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize,
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4'
        },
        padding
      },
      invalid: {
        color: '#9e2146'
      }
    }
  };
};

class CheckoutForm extends Component {
  state = {
    paying: false
  };
  submit = async ev => {
    const sessionToken =
      localStorage.getItem('token') &&
      JSON.parse(localStorage.getItem('token')).token;
    this.setState({ paying: true });
    let { token } = await this.props.stripe.createToken({ name: 'Name' });
    console.log('token', token);
    if (!token || !token.id) {
      return;
    }

    let response = await fetch('/api/pricing/charge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-auth': sessionToken },
      body: JSON.stringify({ source: token.id, price: this.props.price })
    });
    this.setState({ paying: false });
    this.props.onPaymentDone();
  };

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.root}>
        <form onSubmit={this.handleSubmit}>
          <label>
            Card number
            <CardNumberElement
              onBlur={handleBlur}
              onChange={handleChange}
              onFocus={handleFocus}
              onReady={handleReady}
              className={classes.textInput}
              {...createOptions(this.props.fontSize)}
            />
          </label>
          <div className={classes.flex}>
            <label className={classes.smallLabel}>
              Expiration date
              <CardExpiryElement
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                onReady={handleReady}
                className={classes.textInput}
                {...createOptions(this.props.fontSize)}
              />
            </label>
            <label className={classes.smallLabel}>
              CVC
              <CardCVCElement
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                onReady={handleReady}
                className={classes.textInput}
                {...createOptions(this.props.fontSize)}
              />
            </label>
            <Button
              variant="contained"
              color="primary"
              onClick={this.submit}
              disabled={this.state.paying}
            >
              Pay ${this.props.price}
              {this.state.paying && '...'}
            </Button>
          </div>
        </form>
      </Card>
    );
  }
}

export default injectStripe(withStyles(styles)(CheckoutForm));
