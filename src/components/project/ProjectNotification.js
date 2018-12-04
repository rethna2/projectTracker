import React, { Component } from 'react';
import { connect } from 'react-redux';

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

const comp = item => (
  <span>
    <span style={{ color: 'green', fontSize: '0.7em' }}>
      {item.user.name} :{' '}
    </span>
    <span
      style={{
        padding: 5,
        color: 'white',
        backgroundColor: 'blue',
        fontSize: '0.7em'
      }}
    >
      {item.type} :
    </span>{' '}
    :<span style={{ padding: 5 }}>{item.data.name}</span>
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
        <div style={{ margin: 50 }}> Select a Project to see more details </div>
      );
    }
    const { recentActivities } = this.props;
    if (!recentActivities || this.props.loading) {
      return <div style={{ margin: 50 }}> Loading... </div>;
    }
    if (!recentActivities.length) {
      return <div style={{ margin: 50 }}> No Recent Activities </div>;
    }

    return (
      <div style={{ borderLeft: '1px solid green' }}>
        <Typography variant="h5" style={{ paddingLeft: 20 }}>
          Recent Activities
        </Typography>
        <List>
          {recentActivities.map(item => (
            <ListItem>
              <Avatar>
                <AccountCircle />
              </Avatar>
              <ListItemText primary={comp(item)} secondary="Jan 9, 2014" />
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
