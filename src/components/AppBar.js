import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { fade } from '@material-ui/core/styles/colorManipulator';
import {
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  IconButton,
  Badge,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { AccountCircle, Notifications } from '@material-ui/icons';

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
    }
  };
};

class MyAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      tabPos:
        props.location.pathname.toLowerCase().indexOf('/timesheet') === 0
          ? 1
          : 0
    };
  }

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  onLogout = () => {
    this.setState({ anchorEl: null });
    window.localStorage.removeItem('token');
    this.props.history.push('/');
  };

  handleTabChange = (event, tabPos) => {
    this.setState({ tabPos });
    if (tabPos === 0) {
      this.props.history.push('/project');
    } else {
      this.props.history.push('/timesheet');
    }
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, tabPos } = this.state;
    return (
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
            <Tabs
              value={tabPos}
              onChange={this.handleTabChange}
              style={{ alignSelf: 'flex-end' }}
            >
              <Tab label="Projects" />
              <Tab label="Timesheet" />
            </Tabs>
            <IconButton color="inherit">
              <Badge badgeContent={17} color="secondary">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton
              aria-owns={true /*isMenuOpen*/ ? 'material-appbar' : undefined}
              aria-haspopup="true"
              onClick={this.handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={Boolean(anchorEl)}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={this.onLogout}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(MyAppBar));
