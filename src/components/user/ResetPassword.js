import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Button, Typography } from '@material-ui/core';
import { ErrorOutline } from '@material-ui/icons';

import { TextField } from '../../forms';
import { createValidator } from '../../logic/validator';
import { resetPasswordHandler } from '../../routines';

class ResetPasswordForm extends Component {
  resetPasswordFormSubmit = (values, ...args) => {
    const data = {
      password: values.password
    };
    const token = this.props.match.params.token;
    const emailId = this.props.match.params.emailId;
    resetPasswordHandler({ token, emailId, data }, ...args);
  };
  render() {
    const { handleSubmit, pristine, submitting, error } = this.props;
    return (
      <form
        className="formBody"
        onSubmit={handleSubmit(this.resetPasswordFormSubmit)}
      >
        {error && (
          <Typography
            variant="subtitle2"
            style={{ color: 'red', marginBottom: 15 }}
          >
            <ErrorOutline /> {error}
          </Typography>
        )}
        <Field
          name="password"
          type="password"
          component={TextField}
          label="New Password"
        />
        <div style={{ marginTop: 20 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={pristine || submitting}
            color="primary"
          >
            Update Password
          </Button>
        </div>
      </form>
    );
  }
}

ResetPasswordForm = reduxForm({
  form: 'reset',
  validate: createValidator('resetPassword')
})(ResetPasswordForm);

export default withRouter(connect()(ResetPasswordForm));
