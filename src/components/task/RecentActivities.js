import React, { Component } from 'react';
import moment from 'moment';
import {
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Card
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const comp = (item, classes) => (
  <span>
    <span className={classes.displayName}>{item.user.name} : </span>
    <span className={classes.actionName}>{item.type}</span>
  </span>
);

const styles = theme => ({
  displayName: {
    color: theme.palette.primary.main,
    fontSize: '0.7em'
  },
  actionName: {
    padding: 5,
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    fontSize: '0.7em'
  }
});

class RecentActivities extends Component {
  render() {
    const { recentActivities } = this.props;

    if (!recentActivities.length) {
      return (
        <Typography variant="subtitle1" style={{ margin: 50 }}>
          {' '}
          No Recent Activities{' '}
        </Typography>
      );
    }

    return (
      <React.Fragment>
        <Typography variant="h5" style={{ paddingLeft: 20, marginTop: 20 }}>
          Recent Activities
        </Typography>
        <Card>
          <List>
            {recentActivities.map(item => (
              <ListItem key={item._id}>
                <Avatar>
                  <AccountCircle />
                </Avatar>
                <ListItemText
                  primary={comp(item, this.props.classes)}
                  secondary={moment(item.createdAt).fromNow()}
                />
                <Divider />
              </ListItem>
            ))}
          </List>
        </Card>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(RecentActivities);
