import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button, withStyles } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import Joi from 'joi';
import createValidator from '../../logic/joiReduxForm';
import { validate } from '../../logic/register';
import { register } from '../../routines';
import { TextField } from '../../forms';

const schema = {
  name: Joi.string()
    .min(6)
    .max(30)
    .required(),
  emailId: Joi.string()
    .email()
    .required(),
  password: Joi.string().required()
};

const styles = () => ({
  marginTop15: {
    marginTop: 15
  },
  btnWrap: { margin: 20, textAlign: 'right' }
});

class RegisterForm extends Component {
  registerFormSubmit = values => {
    const data = {
      name: values.name,
      emailId: values.emailId,
      password: values.password
    };
    this.props.register(data);
  };
  render() {
    const { handleSubmit, pristine, submitting, classes } = this.props;
    return (
      <form
        className="formBody"
        onSubmit={handleSubmit(this.registerFormSubmit.bind(this))}
      >
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
  validate: createValidator(schema)
})(RegisterForm);

export default withRouter(
  connect(
    (state, props) => ({}),
    { register }
  )(withStyles(styles)(RegisterForm))
);
