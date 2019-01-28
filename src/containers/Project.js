import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import ProjectTable from '../components/project/ProjectTable';
import ProjectForm from '../components/project/ProjectForm';
import Loader from '../components/Loader';
import { importProject } from '../routines';
import { Grid, Divider, Typography } from '@material-ui/core';
import ProjectNotification from '../components/project/ProjectNotification';
import TitleBar from '../components/general/TitleBar';

class Projects extends Component {
  constructor(props) {
    super(props);
    this.fileInputRef = React.createRef();
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

  triggerFileInput = () => {
    this.fileInputRef.current.click();
  };

  onFilePick = e => {
    var reader = new FileReader();
    reader.onload = event => {
      const data = JSON.parse(event.target.result);
      console.log('data', data);
      this.props.importProject({ data });
    };
    reader.readAsText(e.target.files[0]);
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
            <TitleBar label="My Projects">
              <input
                type="file"
                ref={this.fileInputRef}
                style={{ display: 'none' }}
                onChange={this.onFilePick}
                accept="application/json"
              />
              <Button color="primary" onClick={this.triggerFileInput}>
                Import Project
              </Button>
              <Link to="/project/new">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={this.handleOpen}
                >
                  Create New Project
                </Button>
              </Link>
            </TitleBar>
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
            {list && list.length > 0 && (
              <ProjectNotification projectId={selectedProject} />
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

Projects.propTypes = {
  list: PropTypes.array,
  loadingList: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  importProject: PropTypes.func.isRequired
};

export default connect(
  state => ({
    list: state.project.list,
    loadingList: state.project.loadingList
  }),
  { importProject }
)(withRouter(Projects));
