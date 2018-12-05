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
import { addProject, editProject, deleteProject } from '../../routines';
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
  return {
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
  };
};

class ProjectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: (props.initialValues && props.initialValues.team) || [],
      showConfirmDelete: false
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

  deleteProject = () => {
    this.props.deleteProject({
      id: this.props.match.params.projectId
    });
  };

  projectFormSubmit = values => {
    if (!this.props.error) {
      const data = {
        name: values.name,
        description: values.description,
        team: this.state.people
      };
      const projectId = this.props.match.params.projectId;
      if (projectId === 'new') {
        this.props.addProject(data);
      } else {
        this.props.editProject({ projectId, data });
      }
    }
  };

  render() {
    const { handleSubmit, pristine, reset, submitting, classes } = this.props;
    const projectId = this.props.match.params.projectId.toLowerCase();
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
            {projectId === 'new' ? 'New' : 'Edit'} Project
          </div>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(this.projectFormSubmit)}>
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
          {projectId !== 'new' &&
            (this.state.showConfirmDelete ? (
              <React.Fragment>
                <span className={classes.spaceLeft}> Are you sure? </span>
                <Button
                  className={classes.spaceLeft}
                  onClick={this.deleteProject}
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
                Delete Project
              </Button>
            ))}

          <div style={{ flexGrow: 1 }} />
          <Button onClick={this.props.handleClose} color="primary">
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit(this.projectFormSubmit)}
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
      isUpdating: state.project.updating,
      error: state.project.error,
      initialValues: state.project.list.find(
        project => project._id === props.match.params.projectId
      )
    }),
    { addProject, editProject, deleteProject }
  )(withStyles(styles)(withMobileDialog()(ProjectForm)))
);
