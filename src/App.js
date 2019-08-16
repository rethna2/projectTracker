import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './store';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import RootContainer from './containers/Root';

import HomePage from './containers/HomePage';
import Notes from './containers/Notes';

import { userInfo } from './routines';
import Loader from './components/Loader';
import { red } from '@material-ui/core/colors';

import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#0d3756'
    },
    secondary: {
      main: '#2496ea'
    },
    error: red
  },
  typography: {
    fontFamily: ['Arial', '"Helvetica Neue"', 'sans-serif']
  },
  overrides: {
    MuiTableCell: {
      root: {
        padding: '5px 10px'
      },
      head: {
        color: 'white'
      }
    },
    MuiTableHead: {
      root: {
        backgroundColor: '#2496ea'
      }
    },
    flex: {
      display: 'flex'
    }
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.token = window.localStorage.getItem('token');
    if (this.token) {
      //props.userInfo();
    }
  }

  render() {
    const { userId, loading } = this.props;
    if (false && this.token && loading) {
      return <Loader />;
    }

    if (!userId) {
      return (
        <MuiThemeProvider theme={muiTheme}>
          <ConnectedRouter history={history}>
            <div>
              <Route path="/notes" component={Notes} />
              {/*<Route path="/" component={HomePage} />*/}
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
