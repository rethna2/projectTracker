import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Typography } from '@material-ui/core';
import { fetchTaskData, fetchTaskTime } from '../routines';
import LogWork from '../components/task/LogWork';
import TimeLogTable from '../components/task/TimeLogTable';
import RecentActivities from '../components/task/RecentActivities';
import { createValidator } from '../logic/validator';

class TaskDetails extends Component {
  state = {
    timeId: null
  };

  componentDidMount() {
    if (this.props.task) {
      this.props.fetchTaskData({ taskId: this.props.task._id });
      this.props.fetchTaskTime({ taskId: this.props.task._id });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      (this.props.updating && !nextProps.updating) ||
      this.props.task !== nextProps.task
    ) {
      this.props.fetchTaskData({ taskId: nextProps.task._id });
      this.props.fetchTaskTime({ taskId: nextProps.task._id });
      this.setState({ timeId: null });
    }
  }

  render() {
    if (!this.props.task) {
      return (
        <Typography variant="subtitle1" style={{ margin: 50 }}>
          Select a Task to see more details
        </Typography>
      );
    }

    const { recentActivities, loading, timeList } = this.props;

    if (loading || !recentActivities || !timeList) {
      return (
        <Typography variant="subtitle1" style={{ margin: 50 }}>
          Loading...
        </Typography>
      );
    }

    const initialValues =
      this.state.timeId !== 'new' &&
      timeList.find(time => time._id === this.state.timeId);

    return (
      <div style={{ borderLeft: '1px solid green', paddingLeft: 20 }}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => this.setState({ timeId: 'new' })}
        >
          Log Time
        </Button>
        {!!timeList.length && (
          <TimeLogTable
            list={timeList}
            onEdit={timeId => this.setState({ timeId })}
          />
        )}

        {this.state.timeId && (
          <LogWork
            task={this.props.task}
            projectId={this.props.projectId}
            timeId={this.state.timeId}
            initialValues={initialValues}
            timeList={this.props.timeList}
            onCancel={() => this.setState({ timeId: null })}
            updating={this.props.updating}
            validate={createValidator(
              'logTime',
              this.props.task,
              initialValues
            )}
          />
        )}
        <RecentActivities recentActivities={this.props.recentActivities} />
      </div>
    );
  }
}

export default connect(
  state => ({
    recentActivities: state.task.data,
    loading: state.task.loading && state.time.loading,
    timeList: state.time.data,
    updating: state.time.updating
  }),
  { fetchTaskData, fetchTaskTime }
)(TaskDetails);
