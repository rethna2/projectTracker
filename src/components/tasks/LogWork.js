import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DatePicker } from 'material-ui-pickers';

import { Typography, Button, withStyles } from '@material-ui/core';
import cx from 'classnames';
import { Field, reduxForm } from 'redux-form';
import Joi from 'joi';

import { TextField } from '../../forms';
import createValidator from '../../logic/joiReduxForm';
import { logTime } from '../../routines';

const styles = () => ({
  wrapper: {
    borderLeft: '1px solid green',
    paddingLeft: 20
  },
  marginTop15: {
    marginTop: 15
  },
  flex: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 20
  },
  hspace: {
    margin: '0 20px'
  },
  right: {
    textAlign: 'right'
  }
});

const schema = {
  timeSpent: Joi.number(),
  pointsDone: Joi.number(),
  //date: Joi.date(),
  comments: Joi.string()
    .min(6)
    .max(3000)
};

class LogWork extends Component {
  state = {
    selectedDate: new Date()
  };

  handleDateChange = selectedDate => {
    this.setState({ selectedDate });
  };

  timeFormSubmit = values => {
    const data = {
      timeSpent: Number(values.timeSpent),
      pointsDone: Number(values.pointsDone),
      date: this.state.selectedDate,
      comments: values.comments
    };
    const projectId = this.props.projectId;
    const taskId = this.props.taskId;
    this.props.logTime({ projectId, taskId, data });
  };

  render() {
    if (this.props.loading) {
      return <div style={{ margin: 50 }}> Loading... </div>;
    }
    if (!this.props.taskId) {
      return (
        <div style={{ margin: 50 }}> Select a Task to see more details </div>
      );
    }
    const { handleSubmit, classes } = this.props;
    return (
      <form
        className={classes.wrapper}
        onSubmit={handleSubmit(this.timeFormSubmit)}
      >
        <Typography variant="h5">Log Work</Typography>
        <div className={cx(classes.flex, classes.marginTop15)}>
          <Field
            component={TextField}
            name="timeSpent"
            label="Time Spent"
            type="number"
            width="100"
          />
          <Field
            component={TextField}
            name="pointsDone"
            label="Points Done"
            type="number"
            className={classes.hspace}
          />
          <DatePicker
            name="date"
            format="MMM DD, YY"
            animateYearScrolling={false}
            value={this.state.selectedDate}
            onChange={this.handleDateChange}
          />
        </div>
        <div>
          <Field
            component={TextField}
            name="comments"
            label="Comments"
            multiline
            rows={5}
            fullWidth
          />
        </div>
        <div className={cx(classes.marginTop15, classes.right)}>
          <Button
            submit
            variant="contained"
            color="primary"
            onClick={handleSubmit(this.timeFormSubmit)}
          >
            Log Work
          </Button>
        </div>
      </form>
    );
  }
}

LogWork = reduxForm({
  form: 'time',
  validate: createValidator(schema)
})(LogWork);

export default connect(
  state => ({}),
  { logTime }
)(withStyles(styles)(LogWork));
