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

const styles = theme => ({
  root: {
    width: '100%'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
});

class MyAppBar extends Component {
  state = {
    anchorEl: null,
    tabPos: 0
  };
  componentDidMount() {
    //this.props.userInfo();
  }
  logout = () => {
    //this.props.logout();
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    //this.handleMobileMenuClose();
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
        <AppBar position="static" color="primary">
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
