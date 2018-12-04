import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import ProjectTable from '../components/project/ProjectTable';
import ProjectForm from '../components/project/ProjectForm';
import Loader from '../components/Loader';
import { Grid, Divider } from '@material-ui/core';
import ProjectNotification from '../components/project/ProjectNotification';

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopupOpen: false,
      index: -1,
      selectedProject: null
    };
  }

  handleOpen = () => {
    this.setState({ index: -1 });
  };

  handleClose = () => {
    this.props.history.push('/project');
  };

  render() {
    const { list, loadingList } = this.props;
    if (!list || loadingList) {
      return <Loader />;
    }
    const { index, selectedProject } = this.state;
    return (
      <div className="page" style={{ margin: 20 }}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <div className="headingTop" style={{ display: 'flex' }}>
              <h3 style={{ flexGrow: 1 }}>My Projects</h3>
              <Link to="/project/new">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={this.handleOpen}
                >
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
                      data={index === -1 ? {} : list[index]}
                      projectFormSubmit={this.projectFormSubmit}
                    />
                  )}
                />
                <div className="table">
                  <ProjectTable
                    list={list}
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

export default connect(state => ({
  list: state.project.list,
  loadingList: state.project.loadingList
}))(withRouter(Projects));
