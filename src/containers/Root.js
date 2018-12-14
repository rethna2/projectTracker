import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { withStyles } from '@material-ui/core';

import { history } from '../store';
import AppBar from '../components/AppBar';
import Project from './Project';
import Task from './Task';
import Timesheet from './Timesheet';
import Kanban from './Kanban';

import { fetchProjects } from '../routines';

const styles = theme => ({
  root: {
    '@global': {
      flex: {
        display: 'flex'
      }
    }
  }
});

class RootComponent extends Component {
  constructor(props) {
    super(props);
    props.fetchProjects();
  }

  render() {
    const { classes } = this.props;
    return (
      <ConnectedRouter history={history}>
        <div className={classes.root}>
          <AppBar />
          <Switch>
            <Route exact path="/" component={Project} />
            <Route path="/project/:projectId/task" component={Task} />
            <Route path="/project" component={Project} />
            <Route path="/timesheet" component={Timesheet} />
            <Route path="/kanban" component={Kanban} />
            <Route
              path="/"
              render={() => <div style={{ margin: 50 }}>Page Not Found </div>}
            />
          </Switch>
        </div>
      </ConnectedRouter>
    );
  }
}

export default connect(
  state => ({}),
  { fetchProjects }
)(withStyles(styles)(RootComponent));
