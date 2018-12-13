import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import {
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Button,
  Card
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

import { fetchProjectData, exportProject } from '../../routines';
import BurnDownChart from './BurnDownChart';
import Loader from '../Loader';

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
    </span>
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
        <Card style={{ marginTop: 50, padding: 20 }}>
          <Typography variant="subtitle1">
            Select a Project to see more details
          </Typography>
        </Card>
      );
    }
    const { recentActivities } = this.props;
    if (!recentActivities || this.props.loading) {
      return <Loader />;
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
          <div style={{ display: 'flex' }}>
            <Typography variant="h5" style={{ paddingLeft: 20, flexGrow: 1 }}>
              Burn Down Chart
            </Typography>
            <Button
              color="primary"
              onClick={() => {
                this.props.exportProject({
                  projectId: this.props.projectId
                });
              }}
            >
              Export Project
            </Button>
          </div>
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
  { fetchProjectData, exportProject }
)(ProjectNotification);
