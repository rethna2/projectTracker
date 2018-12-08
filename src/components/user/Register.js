import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ErrorOutline } from '@material-ui/icons';

import { Button, withStyles, Typography } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import { createValidator } from '../../logic/validator';

import { register, registerHandler } from '../../routines';
import { TextField } from '../../forms';

const styles = () => ({
  marginTop15: {
    marginTop: 15
  },
  btnWrap: { marginTop: 15, textAlign: 'right' }
});

class RegisterForm extends Component {
  render() {
    const { handleSubmit, pristine, submitting, classes, error } = this.props;
    return (
      <form className="formBody" onSubmit={handleSubmit(registerHandler)}>
        {error && (
          <Typography
            variant="subtitle2"
            style={{ color: 'red', marginBottom: 15 }}
          >
            <ErrorOutline /> {error}
          </Typography>
        )}
        <div>
          <Field
            name="name"
            component={TextField}
            label="Name"
            fullWidth="true"
          />
        </div>
        <div className={classes.marginTop15}>
          <Field
            name="emailId"
            component={TextField}
            label="Email"
            fullWidth="true"
          />
        </div>
        <div className={classes.marginTop15}>
          <Field
            name="password"
            type="password"
            component={TextField}
            label="Password"
            fullWidth="true"
          />
        </div>

        <div className={classes.btnWrap}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={pristine || submitting}
          >
            Register
          </Button>
        </div>
      </form>
    );
  }
}

RegisterForm = reduxForm({
  form: 'register',
  validate: createValidator('register')
})(RegisterForm);

export default withRouter(connect()(withStyles(styles)(RegisterForm)));
