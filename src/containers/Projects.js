import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import ProjectTable from '../components/projects/ProjectTable';
import ProjectForm from '../components/projects/ProjectForm';
import { fetchProjects } from '../routines';
import Loader from '../components/Loader';
import { Grid, Divider } from '@material-ui/core';
import ProjectNotification from '../components/projects/ProjectNotification';

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopupOpen: false,
      index: -1,
      selectedProject: null
    };
  }

  componentDidMount() {
    this.props.fetchProjects();
  }

  handleOpen = () => {
    this.setState({ index: -1 });
  };

  handleClose = () => {
    this.props.history.push('/project');
  };

  render() {
    if (this.props.projects.loading) {
      return <Loader />;
    }
    const { index, selectedProject } = this.state;
    const { data } = this.props.projects;
    return (
      <div className="page" style={{ margin: 20 }}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <div className="headingTop" style={{ display: 'flex' }}>
              <h3 style={{ flexGrow: 1 }}>My Projects</h3>
              <Link to="/project/new">
                <Button color="primary" onClick={this.handleOpen}>
                  Create New Project
                </Button>
              </Link>
            </div>
            <div className="section-sides">
              <div>
                <Route
                  exact
                  path="/project/:projectId"
                  render={() => (
                    <ProjectForm
                      handleClose={this.handleClose}
                      data={index === -1 ? {} : data[index]}
                      projectFormSubmit={this.projectFormSubmit}
                    />
                  )}
                />
                <div className="table">
                  <ProjectTable
                    projectData={data}
                    selectedProject={selectedProject}
                    onSelect={selectedProject =>
                      this.setState({ selectedProject })
                    }
                    handleOpen={this.handleOpen}
                  />
                </div>
              </div>
            </div>
          </Grid>
          <Divider />
          <Grid item xs={12} sm={6}>
            <ProjectNotification projectId={selectedProject} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(
  state => ({
    projects: state.projects
  }),
  { fetchProjects }
)(withRouter(Projects));
