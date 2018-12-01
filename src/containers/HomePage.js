import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import LogIn from '../components/user/Login';
import Register from '../components/user/Register';
import ForgotPassword from '../components/user/ForgotPassword';
import ResetPassword from '../components/user/ResetPassword';
import Button from '@material-ui/core/Button';
import { Grid, Card, CardContent } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import StyledCardHeader from '../styles/CardHeader';

const styles = () => ({
  cardWrap: {
    width: 400,
    margin: '40px auto'
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
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <div style={{ marginTop: 50 }}>
                <Grid container spacing={40} justify="center">
                  <Grid item xs={12} sm={4}>
                    <Card>
                      <StyledCardHeader title="Sign Up" />
                      <CardContent>
                        <Register />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Card>
                      <StyledCardHeader title="Login" />
                      <CardContent>
                        <LogIn />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </div>
            )}
          />
          <Route
            path="/forgotPassword"
            render={() => (
              <Card className={classes.cardWrap}>
                <StyledCardHeader title="Forgot Password" />
                <CardContent>
                  <ForgotPassword />
                </CardContent>
              </Card>
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
        </Switch>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(HomePage));
