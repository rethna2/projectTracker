import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';
import { Button, Grid, Typography } from '@material-ui/core';

import { fetchTasks } from '../routines';
import Loader from '../components/Loader';
import TaskTable from '../components/task/TaskTable';
import TaskForm from '../components/task/TaskForm';
import TaskDetails from './TaskDetails';

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopupOpen: false,
      index: -1,
      selectedTask: null
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

  render() {
    const { list, loadingList } = this.props;

    if (!list || loadingList) {
      return <Loader />;
    }
    const { index, selectedTask } = this.state;
    const projectId = this.props.match.params.projectId;
    return (
      <div className="page" style={{ margin: 20 }}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <div className="headingTop" style={{ display: 'flex' }}>
              <Typography variant="h4" style={{ flexGrow: 1 }}>
                Tasks
              </Typography>
              <Link to={`/project/${projectId}/task/new`}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={this.handleOpen}
                >
                  Create New Task
                </Button>
              </Link>
            </div>
            <div className="section-sides">
              <Route
                path="/project/:projectId/task/:taskId"
                exact
                render={() => (
                  <TaskForm
                    handleClose={this.handleClose}
                    data={index === -1 ? {} : list[index]}
                    taskFormSubmit={this.taskFormSubmit}
                  />
                )}
              />
              <div className="table">
                <TaskTable
                  list={list}
                  selectedTask={selectedTask}
                  onSelect={selectedTask => this.setState({ selectedTask })}
                  handleOpen={this.handleOpen}
                  projectId={projectId}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TaskDetails task={selectedTask} projectId={projectId} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(
  state => ({
    list: state.task.list,
    loadingList: state.task.loadingList
  }),
  { fetchTasks }
)(withRouter(Tasks));
