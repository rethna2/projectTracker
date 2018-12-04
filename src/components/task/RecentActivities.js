import React, { Component } from 'react';
import {
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

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
      {item.type} 
    </span>
  </span>
);

class RecentActivities extends Component {
  render() {
    const { recentActivities } = this.props;

    if (!recentActivities.length) {
      return <div style={{ margin: 50 }}> No Recent Activities </div>;
    }

    return (
      <React.Fragment>
        <Typography variant="h5" style={{ paddingLeft: 20 }}>
          Recent Activities
        </Typography>
        <List>
          {recentActivities.map(item => (
            <ListItem key={item._id}>
              <Avatar>
                <AccountCircle />
              </Avatar>
              <ListItemText primary={comp(item)} secondary="Jan 9, 2014" />
              <Divider />
            </ListItem>
          ))}
        </List>
      </React.Fragment>
    );
  }
}

export default RecentActivities;
