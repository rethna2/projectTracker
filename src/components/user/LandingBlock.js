import React from 'react';
import {
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  IconButton,
  Badge,
  Grid,
  Typography
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => {
  return {
    wrapper: {
      backgroundColor: theme.palette.primary.main
    },
    grow: {
      flexGrow: 1
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20
    },
    introTxt: {
      textAlign: 'center',
      marginTop: 100,
      transform: 'rotate(-10deg)'
    },
    features: {
      marginTop: 70,
      '& h6': {
        textDecoration: 'underline'
      }
    }
  };
};

const LandingBlock = ({ classes }) => (
  <div>
    <AppBar position="static" className={classes.wrapper}>
      <Toolbar>
        <Typography
          className={classes.grow}
          variant="h5"
          color="inherit"
          noWrap
        >
          Project Tracker
        </Typography>
      </Toolbar>
    </AppBar>
    <Grid container spacing={40} justify="center">
      <Grid item xs={12} md={6}>
        <Typography variant="h4" className={classes.introTxt}>
          A simple, straight forward
          <br />
          App for managing <br />
          agile projects, <br />
          team and time.
        </Typography>
      </Grid>
      <Grid item xs={12} md={4} className={classes.features}>
        <Typography variant="h6">Features </Typography>
        <ul className="feature">
          <li>Manage Projects and Tasks</li>
          <li>Manage People and Time</li>
          <li>Kanban Board</li>
          <li>Run Sprints</li>
          <li>Burndown Charts</li>
          <li>Rich Text Documentation</li>
          <li>Export/Import projects</li>
        </ul>
      </Grid>
    </Grid>
  </div>
);

export default withRouter(withStyles(styles)(LandingBlock));
