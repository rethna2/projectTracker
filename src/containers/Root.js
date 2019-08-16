import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { history } from '../store';
import AppBar from '../components/AppBar';
import Project from './Project';
import Task from './Task';
import Timesheet from './Timesheet';
import Kanban from './Kanban';

import { fetchProjects } from '../routines';
import Notes from './Notes';

class RootComponent extends Component {
  constructor(props) {
    super(props);
    //props.fetchProjects();
  }

  render() {
    return (
      <ConnectedRouter history={history}>
        <div>
          <AppBar />
          <Switch>
            <Route exact path="/" component={Project} />
            <Route path="/project/:projectId/task" component={Task} />
            <Route path="/project" component={Project} />
            <Route path="/timesheet" component={Timesheet} />
            <Route path="/kanban" component={Kanban} />
            <Route path="/notes" component={Notes} />
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

RootComponent.propTypes = {
  fetchProjects: PropTypes.func.isRequired
};

export default connect(
  state => ({}),
  { fetchProjects }
)(RootComponent);
