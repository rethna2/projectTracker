import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import { TextField } from '../../forms';

import { createValidator } from '../../logic/validator';

import { resetPassword } from '../../routines';

class ResetPasswordForm extends Component {
  constructor(props) {
    super(props);
    const token = this.props.match.params.token;
  }

  resetPasswordFormSubmit = values => {
    const data = {
      password: values.password
    };
    const token = this.props.match.params.token;
    const emailId = this.props.match.params.emailId;
    this.props.resetPassword({ token, emailId, data });
  };
  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <form
        className="formBody"
        onSubmit={handleSubmit(this.resetPasswordFormSubmit)}
      >
        <Field name="password" component={TextField} label="New Password" />
        <div style={{ marginTop: 20 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={pristine || submitting}
            primary={true}
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

export default withRouter(
  connect(
    (state, props) => ({}),
    { resetPassword }
  )(ResetPasswordForm)
);
