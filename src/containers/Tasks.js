import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button/Button';

import TaskTable from '../components/tasks/TaskTable';
import TaskForm from '../components/tasks/TaskForm';
import { fetchTasks } from '../routines';
import Loader from '../components/Loader';
import { Grid } from '@material-ui/core';
import LogWork from '../components/tasks/LogWork';

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
    if (this.props.tasks.loading) {
      return <Loader />;
    }
    const { index, selectedTask } = this.state;
    const { data } = this.props.tasks;
    const projectId = this.props.match.params.projectId;
    return (
      <div className="page" style={{ margin: 20 }}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <div className="headingTop" style={{ display: 'flex' }}>
              <h3 style={{ flexGrow: 1 }}>Tasks</h3>
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
                    data={index === -1 ? {} : data[index]}
                    taskFormSubmit={this.taskFormSubmit}
                  />
                )}
              />
              <div className="table">
                <TaskTable
                  taskData={data}
                  selectedTask={selectedTask}
                  onSelect={selectedTask => this.setState({ selectedTask })}
                  handleOpen={this.handleOpen}
                  projectId={projectId}
                />
              </div>
              {/*
              <div className="mobtable">
            <MobTable mobTaskData={data} />
          </div>
            */}
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LogWork taskId={selectedTask} projectId={projectId} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(
  state => ({
    tasks: state.tasks
  }),
  { fetchTasks }
)(withRouter(Tasks));
