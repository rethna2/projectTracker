import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { fetchTaskData, fetchTaskTime } from '../routines';
import LogWork from '../components/task/LogWork';
import TimeLogTable from '../components/task/TimeLogTable';
import RecentActivities from '../components/task/RecentActivities';

class TaskDetails extends Component {
  state = {
    timeId: null
  };

  componentDidMount() {
    if (this.props.taskId) {
      this.props.fetchTaskData({ taskId: this.props.taskId });
      this.props.fetchTaskTime({ taskId: this.props.taskId });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.taskId !== nextProps.taskId) {
      this.props.fetchTaskData({ taskId: nextProps.taskId });
      this.props.fetchTaskTime({ taskId: nextProps.taskId });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      (this.props.updating && !nextProps.updating) ||
      this.props.taskId !== nextProps.taskId
    ) {
      this.props.fetchTaskData({ taskId: nextProps.taskId });
      this.props.fetchTaskTime({ taskId: nextProps.taskId });
      this.setState({ timeId: null });
    }
  }

  render() {
    if (!this.props.taskId) {
      return (
        <div style={{ margin: 50 }}> Select a Task to see more details </div>
      );
    }

    const { recentActivities, loading, timeList } = this.props;

    if (loading || !recentActivities || !timeList) {
      return <div style={{ margin: 50 }}> Loading... </div>;
    }

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
            taskId={this.props.taskId}
            projectId={this.props.projectId}
            timeId={this.state.timeId}
            initialValues={
              this.state.timeId !== 'new' &&
              timeList.find(time => time._id === this.state.timeId)
            }
            timeList={this.props.timeList}
            onCancel={() => this.setState({ timeId: null })}
            updating={this.props.updating}
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
