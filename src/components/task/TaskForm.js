import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Grid
} from '@material-ui/core';
import ProgressButton from '../general/ProgressButton';
import { TextField, Select } from '../../forms';
import { withStyles } from '@material-ui/core/styles';
import { createValidator } from '../../logic/validator';
import { addTask, editTask, deleteTask } from '../../routines';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  wrapper: {
    width: '80vw',
    maxWidth: 800,
    minWidth: 400
  },
  title: {
    backgroundColor: theme.palette.primary.light
  },
  titleTxt: {
    color: 'white'
  },
  spacetop: {
    marginTop: 20
  },
  spaceLeft: {
    marginLeft: 20
  }
});

class TaskForm extends Component {
  state = {
    showConfirmDelete: false
  };

  deleteTask = () => {
    if (this.props.updating || this.props.deleting) {
      return;
    }
    this.props.deleteTask({
      id: this.props.match.params.taskId,
      projectId: this.props.match.params.projectId
    });
  };

  taskFormSubmit = values => {
    if (this.props.updating || this.props.deleting) {
      return;
    }
    const data = {
      name: values.name,
      description: values.description,
      points: values.points,
      status: values.status,
      assignedTo: values.assignedTo
    };
    const id = this.props.match.params.taskId;
    const projectId = this.props.match.params.projectId;
    if (id === 'new') {
      this.props.addTask({ projectId, data });
    } else {
      this.props.editTask({ projectId, id, data });
    }
  };

  render() {
    const { handleSubmit, classes } = this.props;
    const taskId = this.props.match.params.taskId.toLowerCase();
    return (
      <Dialog
        open={true}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="lg"
        onClose={this.props.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" className={classes.title}>
          <div className={classes.titleTxt}>
            {taskId === 'new' ? 'New' : 'Edit'} Task
          </div>
        </DialogTitle>
        <form onSubmit={handleSubmit(this.taskFormSubmit)}>
          <DialogContent>
            <Grid container spacing={24} className={classes.wrapper}>
              <Grid item xs={12} sm={6}>
                <div className={classes.spacetop}>
                  <Field
                    name="name"
                    component={TextField}
                    fullWidth
                    label="Task Name"
                  />
                </div>
                <div className={classes.spacetop}>
                  <FormControl style={{ width: 200 }}>
                    <InputLabel htmlFor="assignedTo">Assigned To</InputLabel>
                    <Field name="assignedTo" component={Select}>
                      {this.props.team.map(item => (
                        <MenuItem value={item}>{item}</MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className={classes.spacetop}>
                  <FormControl style={{ width: 200 }}>
                    <InputLabel htmlFor="status">Status</InputLabel>
                    <Field name="status" component={Select}>
                      <MenuItem value="backlog">Backlog</MenuItem>
                      <MenuItem value="new">New</MenuItem>
                      <MenuItem value="wip">WIP</MenuItem>
                      <MenuItem value="review">Review</MenuItem>
                      <MenuItem value="done">Done</MenuItem>
                    </Field>
                  </FormControl>
                </div>
                <div className={classes.spacetop}>
                  <Field
                    name="points"
                    component={TextField}
                    label="Tasks points"
                  />
                </div>
              </Grid>
            </Grid>
            <div className={classes.spacetop}>
              <Field
                name="description"
                component={TextField}
                label="Task Description"
                multiline
                fullWidth
                rows={5}
              />
            </div>
          </DialogContent>
          <DialogActions>
            {taskId !== 'new' &&
              (this.state.showConfirmDelete ? (
                <React.Fragment>
                  <span className={classes.spaceLeft}> Are you sure? </span>
                  <ProgressButton
                    className={classes.spaceLeft}
                    onClick={this.deleteTask}
                    variant="contained"
                    showProgress={this.props.deleting}
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
                  Delete Task
                </Button>
              ))}
            <div style={{ flexGrow: 1 }} />
            <Button onClick={this.props.handleClose} color="primary">
              Cancel
            </Button>
            <ProgressButton
              type="submit"
              color="primary"
              variant="contained"
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

TaskForm.propTypes = {
  deleting: PropTypes.bool.isRequired,
  updating: PropTypes.bool.isRequired,
  addTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  team: PropTypes.array.isRequired
};

TaskForm = reduxForm({
  form: 'task',
  validate: createValidator('task')
})(TaskForm);

export default withRouter(
  connect(
    (state, props) => ({
      userData: state.user.userData,
      updating: state.task.updating,
      deleting: state.task.deleting,
      initialValues:
        state.task.list &&
        state.task.list.find(task => task._id === props.match.params.taskId)
    }),
    { addTask, editTask, deleteTask }
  )(withStyles(styles)(TaskForm))
);
