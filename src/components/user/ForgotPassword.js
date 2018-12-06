import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import Button from '@material-ui/core/Button';
import { createValidator } from '../../logic/validator';
import { forgotPassword } from '../../routines';
import { TextField } from '../../forms';

class ForgotPasswordForm extends Component {
  forgotPasswordFormSubmit = values => {
    const data = {
      emailId: values.emailId
    };
    this.props.forgotPassword(data);
  };

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <form
        className="formBody"
        onSubmit={handleSubmit(this.forgotPasswordFormSubmit)}
      >
        <Field name="emailId" component={TextField} label="Email" />
        <div style={{ marginTop: 20 }}>
          <Button
            type="submit"
            variant="contained"
            label="Reset Password"
            disabled={pristine || submitting}
            primary={true}
          >
            Reset Password
          </Button>
        </div>
        {this.props.msg && (
          <div style={{ marginTop: 20 }}>{this.props.msg}</div>
        )}
      </form>
    );
  }
}

ForgotPasswordForm = reduxForm({
  form: 'forgotPassword',
  validate: createValidator('forgotPassword')
})(ForgotPasswordForm);

export default withRouter(
  connect(
    (state, props) => ({
      msg: state.user.data && state.user.data.msg
    }),
    { forgotPassword }
  )(ForgotPasswordForm)
);
