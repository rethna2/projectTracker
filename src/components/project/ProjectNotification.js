import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import {
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

import { fetchProjectData } from '../../routines';
import BurnDownChart from './BurnDownChart';

// data.name is not available for project change
const comp = item => (
  <span>
    <span style={{ color: 'green', fontSize: '0.7em' }}>
      {item.user.name} :{' '}
    </span>
    <span
      style={{
        padding: 5,
        color: 'blue',
        fontSize: '0.7em'
      }}
    >
      {item.type}
    </span>{' '}
    <span style={{ padding: 5 }}>{item.data && item.data.name}</span>
  </span>
);

class ProjectNotification extends Component {
  componentDidMount() {
    if (this.props.projectId) {
      this.props.fetchProjectData({ projectId: this.props.projectId });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.projectId !== nextProps.projectId) {
      this.props.fetchProjectData({ projectId: nextProps.projectId });
    }
  }

  render() {
    if (!this.props.projectId) {
      return (
        <Typography variant="subtitle1" style={{ margin: 50 }}>
          Select a Project to see more details
        </Typography>
      );
    }
    const { recentActivities } = this.props;
    if (!recentActivities || this.props.loading) {
      return (
        <Typography variant="subtitle1" style={{ margin: 50 }}>
          Loading...
        </Typography>
      );
    }
    if (!recentActivities.length) {
      return (
        <Typography variant="subtitle1" style={{ margin: 50 }}>
          No Recent Activities
        </Typography>
      );
    }

    return (
      <div style={{ borderLeft: '1px solid green' }}>
        <div>
          <Typography variant="h5" style={{ paddingLeft: 20 }}>
            Burn Down Chart
          </Typography>
          <div
            style={{
              padding: 20,
              margin: 20,
              backgroundColor: 'white',
              boxShadow: '0 2px 1px 1px rgba(140, 150, 160, 0.5)'
            }}
          >
            <BurnDownChart />
          </div>
        </div>
        <Typography variant="h5" style={{ paddingLeft: 20 }}>
          Recent Activities
        </Typography>
        <List>
          {recentActivities.map(item => (
            <ListItem>
              <Avatar>
                <AccountCircle />
              </Avatar>
              <ListItemText
                primary={comp(item)}
                secondary={moment(item.createdAt).fromNow()}
              />
              <Divider />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default connect(
  state => ({
    recentActivities: state.project.data,
    loading: state.project.loading
  }),
  { fetchProjectData }
)(ProjectNotification);
