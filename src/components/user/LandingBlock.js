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
import tickIcon from '../../img/tick.svg';
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
      display: 'inline-block',
      marginTop: 60,
      transform: 'rotate(-10deg)',
      padding: 20,
      backgroundColor: '#2496ea',
      borderRadius: 4,
      color: 'white',
      boxShadow: '#666666a3 2px 2px 2px 2px'
    },
    features: {
      marginTop: 50,
      display: 'inline-block',
      margin: 5,
      textAlign: 'left',
      backgroundColor: 'white',
      boxShadow: '#bbbbbb 2px 2px 2px 2px',
      borderRadius: 4,

      '& h6': {
        color: 'white',
        backgroundColor: theme.palette.primary.main,
        padding: '5px 10px'
      },
      '& ul': {
        padding: '0 40px'
      },
      '& li': {
        listStyleImage: `url(${tickIcon})`,
        marginBottom: 8,
        borderBottom: '1px solid #ddd'
      }
    }
  };
};

const LandingBlock = ({ classes }) => (
  <div style={{ textAlign: 'center', marginRight: 40 }}>
    <Typography variant="h4" className={classes.introTxt}>
      A simple, straight forward
      <br />
      App for managing <br />
      agile projects, <br />
      team and time.
    </Typography>
    <div>
      <section className={classes.features}>
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
      </section>
    </div>
  </div>
);

export default withRouter(withStyles(styles)(LandingBlock));
