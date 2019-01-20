import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Typography, Card } from '@material-ui/core';
import { fetchTaskData, fetchTaskTime } from '../routines';
import LogWork from '../components/task/LogWork';
import TimeLogTable from '../components/task/TimeLogTable';
import TitleBar from '../components/general/TitleBar';
import RecentActivities from '../components/task/RecentActivities';
import { createValidator } from '../logic/validator';
import Loader from '../components/Loader';

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
        <Card style={{ marginTop: 50, padding: 20 }}>
          <Typography variant="subtitle1">
            Select a Task to see more details
          </Typography>
        </Card>
      );
    }

    const { recentActivities, loading, timeList } = this.props;

    if (loading || !recentActivities || !timeList) {
      return <Loader />;
    }

    const initialValues =
      this.state.timeId !== 'new' &&
      timeList.find(time => time._id === this.state.timeId);

    return (
      <div style={{ borderLeft: '1px solid green', paddingLeft: 20 }}>
        <TitleBar label="Time Logged">
          <Button
            color="primary"
            variant="contained"
            onClick={() => this.setState({ timeId: 'new' })}
          >
            Log Time
          </Button>
        </TitleBar>
        {!!timeList.length ? (
          <TimeLogTable
            list={timeList}
            onEdit={timeId => this.setState({ timeId })}
          />
        ) : (
          <div style={{ margin: 50 }}> No work logged yet </div>
        )}

        {this.state.timeId && (
          <LogWork
            task={this.props.task}
            projectId={this.props.projectId}
            timeId={this.state.timeId}
            initialValues={initialValues}
            timeList={this.props.timeList}
            onCancel={() => this.setState({ timeId: null })}
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
