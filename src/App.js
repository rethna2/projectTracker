import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './store';

import { create } from 'jss';
import { createStyleManager } from 'jss-theme-reactor/styleManager';
import jssPreset from 'jss-preset-default';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import RootContainer from './containers/Root';

import HomePage from './containers/HomePage';
import AppBar from './components/AppBar';
import { userInfo } from './routines';
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
      main: '#89d9ff'
    },
    error: red
  },
  typography: {
    fontFamily: ['Arial', '"Helvetica Neue"', 'sans-serif']
  },
  overrides: {
    /*
    MuiTable: {
      root: {
        backgroundColor: 'white',
        boxShadow: '0 2px 1px 1px rgba(140, 150, 160, 0.5)'
      }
    },*/
    MuiTableCell: {
      root: {
        padding: '5px 10px'
      }
    },
    MuiTableHead: {
      root: {
        backgroundColor: '#89d9ff'
      }
    },
    flex: {
      display: 'flex'
    }
  }
});

const styleManager = createStyleManager({
  theme: muiTheme,
  jss: create(jssPreset())
});

class App extends Component {
  constructor(props) {
    super(props);
    this.token = window.localStorage.getItem('token');
    if (this.token) {
      props.userInfo();
    }
  }

  componentWillReceiveProps() {
    /*
    this.token = window.localStorage.getItem('token');
    if (this.token) {
      this.props.userInfo();
      this.props.fetchProjects();
    }
    */
  }

  render() {
    const { userId, loading } = this.props;
    if (this.token && loading) {
      return <Loader />;
    }

    if (!userId) {
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
          <div>
            <RootContainer />
          </div>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  }
}

export default connect(
  ({ user }) => ({
    loading: user.loading,
    userId: user.data && user.data.emailId
  }),
  { userInfo }
)(App);
