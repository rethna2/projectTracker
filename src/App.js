import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './store';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Project from './containers/Project';
import Task from './containers/Task';
import Timesheet from './containers/Timesheet';
import HomePage from './containers/HomePage';
import AppBar from './components/AppBar';
import { userInfo, fetchProjects } from './routines';
import Loader from './components/Loader';
import { blue, pink, red } from '@material-ui/core/colors';

import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#0d3756'
    },
    secondary: {
      main: '#ffff00'
    },
    error: red
  },
  typography: {
    fontFamily: ['Arial', '"Helvetica Neue"', 'sans-serif']
  },
  overrides: {
    MuiTable: {
      root: {
        backgroundColor: 'white',
        boxShadow: '0 2px 1px 1px rgba(140, 150, 160, 0.5)'
      }
    },
    MuiTableCell: {
      root: {
        padding: '5px 10px'
      }
    }
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.token = window.localStorage.getItem('token');
    if (this.token) {
      props.userInfo();
      props.fetchProjects();
    }
  }

  componentWillReceiveProps() {
    this.token = window.localStorage.getItem('token');
    if (this.token) {
      this.props.userInfo();
      this.props.fetchProjects();
    }
  }

  render() {
    const { userId, loading } = this.props;
    if (this.token && loading) {
      return <Loader />;
    }

    if (!this.token || !userId) {
      return (
        <MuiThemeProvider theme={muiTheme}>
          <ConnectedRouter history={history}>
            <div>
              <Route path="/" component={HomePage} />
            </div>
          </ConnectedRouter>
        </MuiThemeProvider>
      );
    }

    return (
      <MuiThemeProvider theme={muiTheme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <ConnectedRouter history={history}>
            <div className="App">
              <AppBar />
              <Switch>
                <Route exact path="/" component={Project} />
                <Route path="/project/:projectId/task" component={Task} />
                <Route path="/project" component={Project} />
                <Route path="/timesheet" component={Timesheet} />
                <Route
                  path="/"
                  render={() => (
                    <div style={{ margin: 50 }}>Page Not Found </div>
                  )}
                />
              </Switch>
            </div>
          </ConnectedRouter>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  }
}

export default connect(
  ({ user }) => ({
    loading: user.loading,
    userId: user.data.emailId
  }),
  { userInfo, fetchProjects }
)(App);
