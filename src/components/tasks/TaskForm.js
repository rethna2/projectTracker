import React, { Component } from 'react';
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
import { TextField, Select } from '../../forms';
import { withStyles } from '@material-ui/core/styles';
import Joi from 'joi';
import createValidator from '../../logic/joiReduxForm';
import { validate } from '../../logic/task';
import { addTask, editTask, deleteTask, fetchUser } from '../../routines';

const schema = {
  name: Joi.string()
    .min(6)
    .max(255)
    .required(),
  description: Joi.string()
    .min(6)
    .max(3000),
  points: Joi.number(),
  status: Joi.string().valid(['backlog', 'new', 'wip', 'review', 'done']),
  assignedTo: Joi.string()
};

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
    backgroundColor: theme.palette.primary.light,
    color: 'white !important'
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
  componentDidMount() {
    //this.props.fetchUser();
  }

  deleteTask = () => {
    this.props.deleteTask({
      id: this.props.match.params.taskId,
      projectId: this.props.match.params.projectId
    });
  };

  taskFormSubmit = values => {
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
    console.log('team', this.props.team);
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
          {`${taskId === 'new' ? 'New' : 'Edit'} Task`}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(this.taskFormSubmit)}>
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
                  <Field
                    name="description"
                    component={TextField}
                    label="Task Description"
                    multiline
                    fullWidth
                    rows={5}
                  />
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
            </Grid>
            {this.props.isUpdating && (
              <span className="valid-green"> Updating... </span>
            )}
          </form>
        </DialogContent>
        <DialogActions>
          {this.state.showConfirmDelete ? (
            <React.Fragment>
              <span className={classes.spaceLeft}> Are you sure? </span>
              <Button
                className={classes.spaceLeft}
                onClick={this.deleteTask}
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
              Delete Task
            </Button>
          )}
          <div style={{ flexGrow: 1 }} />
          <Button onClick={this.props.handleClose} color="primary">
            Cancel
          </Button>
          <Button
            submit
            color="primary"
            variant="contained"
            onClick={handleSubmit(this.taskFormSubmit)}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

TaskForm = reduxForm({
  form: 'task',
  validate: createValidator(schema)
})(TaskForm);

export default withRouter(
  connect(
    (state, props) => {
      const project = state.projects.data.find(
        project => project._id === props.match.params.projectId
      );
      let team;
      if (project) {
        team = project.team;
      } else {
        team = [];
      }
      return {
        userData: state.user.userData,
        isUpdating: state.tasks.updating,
        initialValues: state.tasks.data.find(
          task => task._id === props.match.params.taskId
        ),
        team
      };
    },
    { addTask, editTask, deleteTask, fetchUser }
  )(withStyles(styles)(TaskForm))
);
