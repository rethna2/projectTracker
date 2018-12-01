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
  withMobileDialog
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Joi from 'joi';
import createValidator from '../../logic/joiReduxForm';
import { TextField } from '../../forms';
import { validate } from '../../logic/project';
import ManageTeam from './ManageTeam';
import { addProject, editProject } from '../../routines';
import { Grid } from '@material-ui/core';

const schema = {
  name: Joi.string()
    .min(6)
    .max(30)
    .required(),
  description: Joi.string(),
  team: Joi.array()
    .items(Joi.string())
    .required()
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => {
  console.log('theme', theme);
  return {
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
  };
};

class ProjectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: (props.initialValues && props.initialValues.team) || []
    };
  }

  onAddPerson = person => {
    this.setState({ people: [...this.state.people, person] });
  };

  onRemovePerson = person => {
    const index = this.state.people.indexOf(person);
    const { people } = this.state;
    this.setState({
      people: [...people.slice(0, index), ...people.slice(index + 1)]
    });
  };

  projectFormSubmit = values => {
    if (!this.props.error) {
      const data = {
        name: values.name,
        description: values.description,
        team: this.state.people
      };
      const id = this.props.match.params.projectId;
      if (id === 'new') {
        this.props.addProject(data);
      } else {
        this.props.editProject({ id, data });
      }
    }
  };

  render() {
    const { handleSubmit, pristine, reset, submitting, classes } = this.props;
    console.log('ProjectForm render');
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
          New Project
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(this.projectFormSubmit.bind(this))}>
            <Grid container spacing={24} className={classes.wrapper}>
              <Grid item xs={12} sm={6}>
                <div className={classes.spacetop}>
                  <Field
                    name="name"
                    component={TextField}
                    label="Project Name"
                    fullWidth
                  />
                </div>
                <div className={classes.spacetop}>
                  <Field
                    name="description"
                    component={TextField}
                    label="Project Description"
                    multiline
                    fullWidth
                    rows={5}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className={classes.spacetop}>
                  <ManageTeam
                    people={this.state.people}
                    onAdd={this.onAddPerson}
                    onRemove={this.onRemovePerson}
                  />
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
            variant="contained"
            onClick={handleSubmit(this.projectFormSubmit.bind(this))}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ProjectForm = reduxForm({
  form: 'project',
  validate: createValidator(schema)
})(ProjectForm);

export default withRouter(
  connect(
    (state, props) => ({
      isUpdating: state.tasks.updating,
      error: state.projects.error,
      initialValues: state.projects.data.find(
        project => project._id === props.match.params.projectId
      )
    }),
    { addProject, editProject }
  )(withStyles(styles)(withMobileDialog()(ProjectForm)))
);
