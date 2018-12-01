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
import { addTask, editTask, fetchUser } from '../../routines';

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
  }
});

class TaskForm extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  taskFormSubmit = values => {
    console.dir(values);
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
    const { handleSubmit, pristine, reset, submitting, classes } = this.props;
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
          New Task
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(this.taskFormSubmit.bind(this))}>
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
                  <FormControl>
                    <InputLabel htmlFor="age-simple">Status</InputLabel>
                    <Field
                      name="status"
                      component={Select}
                      label="Tasks Status"
                      inputProps={{
                        name: 'status',
                        width: 200
                      }}
                      width="200"
                    >
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
                  <Field
                    name="assignedTo"
                    component={Select}
                    label="AssignedTo User"
                  >
                    <option />
                    {this.props.userData.map(item => (
                      <option>{item.emailId}</option>
                    ))}
                  </Field>
                </div>
              </Grid>
            </Grid>
            {this.props.isUpdating && (
              <span className="valid-green"> Updating... </span>
            )}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Cancel
          </Button>
          <Button
            submit
            color="primary"
            autoFocus
            variant="contained"
            onClick={handleSubmit(this.taskFormSubmit.bind(this))}
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
    (state, props) => ({
      userData: state.user.userData,
      isUpdating: state.tasks.updating,
      initialValues: state.tasks.data.find(
        task => task._id === props.match.params.taskId
      )
      /*team: state.projects.data.find(
        project => project._id === props.match.params.projectId
      ).team*/
    }),
    { addTask, editTask, fetchUser }
  )(withStyles(styles)(TaskForm))
);
