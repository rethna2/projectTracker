import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Button, withStyles, Typography } from '@material-ui/core';
import { ErrorOutline } from '@material-ui/icons';
import cx from 'classnames';
import { createValidator } from '../../logic/validator';

import { loginHandler } from '../../routines';
import { TextField, Checkbox } from '../../forms';
import ProgressButton from '../general/ProgressButton';

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
  render() {
    const { handleSubmit, pristine, submitting, classes, error } = this.props;
    return (
      <form
        className="formBody"
        name="form"
        onSubmit={handleSubmit(loginHandler)}
      >
        {error && (
          <Typography
            variant="subtitle2"
            style={{
              color: 'red',
              marginBottom: 15,
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            <ErrorOutline /> <span>{error}</span>
          </Typography>
        )}
        <div>
          <Field name="emailId" component={TextField} label="Email" fullWidth />
        </div>
        <div className={classes.marginTop15}>
          <Field
            name="password"
            type="password"
            component={TextField}
            label="Password"
            fullWidth
          />
        </div>
        <div className={cx(classes.flexSpread, classes.marginTop15)}>
          <div className={classes.flexGrow}>
            <Typography variant="subtitle2">
              <label htmlFor="rembemberMe">
                <Field name="rememberMe" component={Checkbox} color="primary" />
                Remember Me
              </label>
            </Typography>
          </div>
          <div>
            <ProgressButton
              type="submit"
              variant="contained"
              color="primary"
              disabled={pristine || submitting}
              showProgress={submitting}
            >
              Login
            </ProgressButton>
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
  validate: createValidator('login')
})(LoginForm);

export default withRouter(
  connect((state, props) => {
    const obj = JSON.parse(localStorage.getItem('rememberMe')) || {};
    return {
      initialValues: {
        emailId: obj.emailId,
        password: obj.password
      },
      error: state.user.error
    };
  })(withStyles(styles)(LoginForm))
);
