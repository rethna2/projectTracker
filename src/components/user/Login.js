import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Button, Typography, withStyles } from '@material-ui/core';

import cx from 'classnames';

import { validate } from '../../logic/login';
import { login } from '../../routines';
import { TextField, Checkbox } from '../../forms';
const required = value => (value == null ? 'Required' : undefined);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined;

const styles = () => ({
  marginTop15: {
    marginTop: 15
  },
  flexSpread: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  flexGrow: {
    flexGrow: 1
  }
});

class LoginForm extends Component {
  loginFormSubmit = values => {
    const data = {
      emailId: values.emailId,
      password: values.password
    };
    if (values.checker == true) {
      localStorage.setItem('rememberMe', JSON.stringify(data));
    }

    this.props.login(data);
  };

  render() {
    const { handleSubmit, pristine, submitting, classes } = this.props;
    return (
      <form
        className="formBody"
        name="form"
        onSubmit={handleSubmit(this.loginFormSubmit)}
      >
        <div>
          <Field
            name="emailId"
            component={TextField}
            hintText="Email"
            label="Email"
            floatingLabelText="Email"
            validate={[required, email]}
            fullWidth="true"
          />
        </div>
        <div className={classes.marginTop15}>
          <Field
            name="password"
            type="password"
            component={TextField}
            hintText="Password"
            label="Password"
            floatingLabelText="Password"
            fullWidth="true"
          />
        </div>
        <div className={cx(classes.flexSpread, classes.marginTop15)}>
          <div className={classes.flexGrow}>
            <Field name="rememberMe" component={Checkbox} />
            <label>Remember Me</label>
          </div>
          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={pristine || submitting}
            >
              Login
            </Button>
          </div>
        </div>
        <div className={classes.marginTop15}>
          <Button onClick={() => this.props.history.push('/forgotPassword')}>
            Forgot Password
          </Button>
        </div>
      </form>
    );
  }
}

LoginForm = reduxForm({
  form: 'login',
  validate
})(LoginForm);

export default withRouter(
  connect(
    (state, props) => {
      const obj = JSON.parse(localStorage.getItem('rememberMe')) || {};
      return {
        initialValues: {
          emailId: obj.emailId,
          password: obj.password
        }
      };
    },
    { login }
  )(withStyles(styles)(LoginForm))
);
