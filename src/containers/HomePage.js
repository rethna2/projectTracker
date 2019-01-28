import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
import { Grid, Card, CardContent } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

import LogIn from '../components/user/Login';
import Register from '../components/user/Register';
import ForgotPassword from '../components/user/ForgotPassword';
import ResetPassword from '../components/user/ResetPassword';
import LandingBlock from '../components/user/LandingBlock';
import StyledCardHeader from '../styles/CardHeader';

import logo from '../img/logo.svg';

const styles = () => ({
  cardWrap: {
    width: 400,
    margin: '40px auto'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    margin: '30px 0'
  },
  logo: {
    width: 70,
    height: 70,
    background: `url(${logo})`,
    backgroundSize: 'cover'
  },
  nameHead: {
    fontSize: '3.5em',
    color: '#00425c',
    marginLeft: 20
  },
  notesText: {
    marginBottom: 10,
    textAlign: 'right',

    '& a': {
      color: '#2496ea',
      fontSize: '1.1em'
    }
  }
});

class HomePage extends Component {
  constructor(props) {
    super(props);
    const location = this.props.location.pathname;
    const currentUrl = location.split('/');
    const res = currentUrl[1];
    this.state = {
      currentView: res === 'resetPassword' ? '' : 'login'
    };
  }

  changeForm = name => {
    this.setState({ currentView: name });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container spacing={24} justify="center">
          <Grid item sm={12} lg={6} xl={4}>
            <LandingBlock />
          </Grid>
          <Grid item sm={12} lg={6} xl={4}>
            <div className={classes.header}>
              <div className={classes.logo} />
              <h1 className={classes.nameHead}>Project Tracker</h1>
            </div>

            <Switch>
              <Route
                path="/signup"
                exact
                render={() => (
                  <div className={classes.cardWrap}>
                    <div className={classes.notesText}>
                      Already have an account? Then please{' '}
                      <Link to="/">Sign In</Link>
                    </div>
                    <Card>
                      <StyledCardHeader title="Sign Up" />
                      <CardContent>
                        <Register />
                      </CardContent>
                    </Card>
                  </div>
                )}
              />
              <Route
                path="/forgotPassword"
                render={() => (
                  <div className={classes.cardWrap}>
                    <div className={classes.notesText}>
                      <Link to="/signup">Sign Up</Link>
                      {' | '}
                      <Link to="/">Sign In</Link>
                    </div>
                    <Card>
                      <StyledCardHeader title="Forgot Password" />
                      <CardContent>
                        <ForgotPassword />
                      </CardContent>
                    </Card>
                  </div>
                )}
              />
              <Route
                path="/resetPassword/:emailId/:token"
                render={() => (
                  <Card className={classes.cardWrap}>
                    <StyledCardHeader title="Reset Password" />
                    <CardContent>
                      <ResetPassword />
                    </CardContent>
                  </Card>
                )}
              />
              <Route
                path="/"
                render={() => (
                  <div className={classes.cardWrap}>
                    <div className={classes.notesText}>
                      First time user? Then please{' '}
                      <Link to="/signup">Sign Up</Link>
                    </div>
                    <Card>
                      <StyledCardHeader title="Login" />
                      <CardContent>
                        <LogIn />
                      </CardContent>
                    </Card>
                  </div>
                )}
              />
            </Switch>
          </Grid>
        </Grid>
      </div>
    );
  }
}

HomePage.propTypes = {
  location: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(HomePage));
