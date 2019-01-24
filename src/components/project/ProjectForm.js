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

import { createValidator } from '../../logic/validator';
import { TextField } from '../../forms';
import ManageTeam from './ManageTeam';
import { addProject, editProject, deleteProject } from '../../routines';
import { Grid } from '@material-ui/core';
import ProgressButton from '../general/ProgressButton';

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
    if (this.props.updating || this.props.deleting) {
      return;
    }
    this.props.deleteProject({
      projectId: this.props.match.params.projectId
    });
  };

  projectFormSubmit = values => {
    if (this.props.updating || this.props.deleting) {
      return;
    }
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
    console.log('render');
    console.log(this.props);
    const { handleSubmit, classes } = this.props;
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
        <form onSubmit={handleSubmit(this.projectFormSubmit)}>
          <DialogContent>
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
          </DialogContent>
          <DialogActions>
            {projectId !== 'new' &&
              (this.state.showConfirmDelete ? (
                <React.Fragment>
                  <span className={classes.spaceLeft}> Are you sure? </span>
                  <ProgressButton
                    className={classes.spaceLeft}
                    onClick={this.deleteProject}
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

ProjectForm = reduxForm({
  form: 'project',
  validate: createValidator('project')
})(ProjectForm);

export default withRouter(
  connect(
    (state, props) => ({
      updating: state.project.updating,
      deleting: state.project.deleting,
      error: state.project.error,
      initialValues: state.project.list.find(
        project => project._id === props.match.params.projectId
      )
    }),
    { addProject, editProject, deleteProject }
  )(withStyles(styles)(withMobileDialog()(ProjectForm)))
);
