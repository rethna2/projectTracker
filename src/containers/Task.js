import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';
import { Button, Grid, Typography } from '@material-ui/core';

import { fetchTasks } from '../routines';
import Loader from '../components/Loader';
import TaskTable from '../components/task/TaskTable';
import TaskForm from '../components/task/TaskForm';
import FilterBar from '../components/task/FilterBar';
import TaskDetails from './TaskDetails';

import TitleBar from '../components/general/TitleBar';

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopupOpen: false,
      index: -1,
      selectedTask: null,
      filters: {
        status: '',
        assignedTo: ''
      }
    };
  }

  componentDidMount() {
    this.props.fetchTasks(this.props.match.params.projectId);
  }

  handleOpen = () => {
    this.setState({ index: -1 });
  };

  handleClose = () => {
    this.props.history.push(
      `/project/${this.props.match.params.projectId}/task`
    );
  };

  handleFilterChange = (name, value) => {
    this.setState({
      filters: {
        ...this.state.filters,
        [name]: value
      }
    });
  };

  render() {
    const { list, loadingList, team } = this.props;
    const { filters } = this.state;

    if (!list || loadingList) {
      return <Loader />;
    }
    const { index, selectedTask } = this.state;
    const projectId = this.props.match.params.projectId;
    return (
      <div className="page" style={{ margin: 20 }}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <TitleBar label="Tasks">
              <Link to={`/project/${projectId}/task/new`}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={this.handleOpen}
                >
                  Create New Task
                </Button>
              </Link>
            </TitleBar>
            <FilterBar
              filters={filters}
              onChange={this.handleFilterChange}
              team={team}
            />
            <div className="section-sides">
              <div className="table">
                <TaskTable
                  list={list}
                  selectedTask={selectedTask}
                  onSelect={selectedTask => this.setState({ selectedTask })}
                  handleOpen={this.handleOpen}
                  projectId={projectId}
                  filters={filters}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            {list && list.length > 0 && (
              <TaskDetails task={selectedTask} projectId={projectId} />
            )}
          </Grid>
        </Grid>
        <Route
          path="/project/:projectId/task/:taskId"
          exact
          render={() => (
            <TaskForm
              handleClose={this.handleClose}
              data={index === -1 ? {} : list[index]}
              taskFormSubmit={this.taskFormSubmit}
              team={team}
            />
          )}
        />
      </div>
    );
  }
}

Tasks.propTypes = {
  fetchTasks: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired,
  loadingList: PropTypes.bool.isRequired
};

export default connect(
  (state, props) => {
    const project =
      state.project.list &&
      state.project.list.find(
        project => project._id === props.match.params.projectId
      );
    let team;
    if (project) {
      team = project.team;
    } else {
      team = [];
    }
    return {
      list: state.task.list,
      loadingList: state.task.loadingList,
      team
    };
  },
  { fetchTasks }
)(withRouter(Tasks));
