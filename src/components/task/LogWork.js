import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

import { TextField } from '../../forms';
import { logTime, editTime, deleteTime } from '../../routines';
import ProgressButton from '../general/ProgressButton';

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
  },
  spaceLeft: {
    marginLeft: 20
  }
});

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
    if (this.props.updating || this.props.deleting) {
      return;
    }
    this.props.deleteTime({
      projectId: this.props.projectId,
      taskId: this.props.task._id,
      timeId: this.props.timeId
    });
  };

  timeFormSubmit = values => {
    if (this.props.updating || this.props.deleting) {
      return;
    }
    const data = {
      timeSpent: Number(values.timeSpent),
      pointsDone: Number(values.pointsDone),
      date: this.state.selectedDate,
      comments: values.comments,
      task: {
        id: this.props.task._id,
        name: this.props.task.name
      }
    };
    const projectId = this.props.projectId;
    const taskId = this.props.task._id;
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
        onClose={this.props.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" className={classes.title}>
          <div className={classes.titleTxt}>
            {timeId === 'new' ? 'Log Time' : 'Edit Time'}
          </div>
        </DialogTitle>
        <form onSubmit={handleSubmit(this.timeFormSubmit)}>
          <DialogContent>
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
          </DialogContent>
          <DialogActions>
            {this.props.timeId !== 'new' &&
              (this.state.showConfirmDelete ? (
                <React.Fragment>
                  <span className={classes.spaceLeft}> Are you sure? </span>
                  <ProgressButton
                    className={classes.spaceLeft}
                    onClick={this.deleteTime}
                    showProgress={this.props.deleting}
                    variant="contained"
                  >
                    Delete
                  </ProgressButton>
                  <Button
                    className={classes.spaceLeft}
                    onClick={() => this.setState({ showConfirmDelete: false })}
                    variant="contained"
                  >
                    Cancel
                  </Button>
                </React.Fragment>
              ) : (
                <Button
                  onClick={() => this.setState({ showConfirmDelete: true })}
                  variant="contained"
                >
                  Delete Time
                </Button>
              ))}
            <div style={{ flexGrow: 1 }} />
            <Button onClick={this.props.onCancel} color="primary">
              Cancel
            </Button>
            <ProgressButton
              type="submit"
              variant="contained"
              color="primary"
              showProgress={this.props.updating}
            >
              Save
            </ProgressButton>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

LogWork.propTypes = {
  projectId: PropTypes.string.isRequired,
  timeId: PropTypes.string.isRequired,
  deleting: PropTypes.bool.isRequired,
  updating: PropTypes.bool.isRequired,
  deleteTime: PropTypes.func.isRequired,
  logTime: PropTypes.func.isRequired,
  editTime: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

LogWork = reduxForm({
  form: 'logTime'
})(LogWork);

export default connect(
  state => ({
    updating: state.time.updating,
    deleting: state.time.deleting
  }),
  { logTime, editTime, deleteTime }
)(withStyles(styles)(LogWork));
