import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DatePicker } from 'material-ui-pickers';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Slide,
  Button,
  withStyles
} from '@material-ui/core';
import cx from 'classnames';
import { Field, reduxForm } from 'redux-form';
import Joi from 'joi';

import { TextField } from '../../forms';
import createValidator from '../../logic/joiReduxForm';
import { logTime, editTime, deleteTime } from '../../routines';

const styles = theme => ({
  title: {
    backgroundColor: theme.palette.primary.light
  },
  titleTxt: {
    color: 'white'
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

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class LogWork extends Component {
  state = {
    selectedDate: new Date()
  };

  handleDateChange = selectedDate => {
    this.setState({ selectedDate });
  };

  deleteTime = () => {
    this.props.deleteTime({
      projectId: this.props.projectId,
      taskId: this.props.taskId,
      timeId: this.props.timeId
    });
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
    const payload = { projectId, taskId, data };
    if (this.props.timeId === 'new') {
      this.props.logTime(payload);
    } else {
      this.props.editTime({ ...payload, timeId: this.props.timeId });
    }
  };

  render() {
    const { handleSubmit, classes, timeId } = this.props;
    return (
      <Dialog
        open={true}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="900"
        onClose={this.props.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" className={classes.title}>
          <div className={classes.titleTxt}>
            {timeId === 'new' ? 'Log Time' : 'Edit Time'}
          </div>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(this.timeFormSubmit)}>
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
          </form>
        </DialogContent>
        <DialogActions>
          {this.props.timeId !== 'new' &&
            (this.state.showConfirmDelete ? (
              <React.Fragment>
                <span className={classes.spaceLeft}> Are you sure? </span>
                <Button
                  className={classes.spaceLeft}
                  onClick={this.deleteTime}
                  color="error"
                  variant="contained"
                >
                  Delete
                </Button>
                <Button
                  className={classes.spaceLeft}
                  onClick={() => this.setState({ showConfirmDelete: false })}
                  color="error"
                  variant="contained"
                >
                  Cancel
                </Button>
              </React.Fragment>
            ) : (
              <Button
                onClick={() => this.setState({ showConfirmDelete: true })}
                color="error"
                variant="contained"
              >
                Delete Time
              </Button>
            ))}
          <div style={{ flexGrow: 1 }} />
          {this.props.updating && <div style={{ padding: 5 }}>Updating...</div>}
          <Button onClick={this.props.onCancel} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(this.timeFormSubmit)}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

LogWork = reduxForm({
  form: 'time',
  validate: createValidator(schema)
})(LogWork);

export default connect(
  state => ({}),
  { logTime, editTime, deleteTime }
)(withStyles(styles)(LogWork));
