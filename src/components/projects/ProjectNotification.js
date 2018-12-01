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
import ImageIcon from '@material-ui/icons/Image';

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
      {item.type} :{' '}
    </span>
    {item.data.name}
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
    if (this.props.loading) {
      return <div style={{ margin: 50 }}> Loading... </div>;
    }
    if (!this.props.projectId) {
      return (
        <div style={{ margin: 50 }}> Select a Project to see more details </div>
      );
    }
    const { data } = this.props;
    return (
      <div style={{ borderLeft: '1px solid green' }}>
        <Typography variant="h5">Recent Activities</Typography>
        <List>
          {data.map(item => (
            <ListItem>
              <Avatar>
                <ImageIcon />
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
    data: state.projects.projectData,
    loading: state.projects.loadingProjectData
  }),
  { fetchProjectData }
)(ProjectNotification);
