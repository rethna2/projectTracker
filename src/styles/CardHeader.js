import React from 'react';
import { CardHeader, withStyles } from '@material-ui/core';

const CustomCardHeader = ({ classes, title }) => (
  <CardHeader classes={{ ...classes }} title={title} />
);

//theme.palette.primary.light
const styles = theme => {
  return {
    root: {
      //background: `linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)`,
      background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${
        theme.palette.primary.light
      } 90%)`,
      borderRadius: 3,
      border: 0,
      color: '#ffffff',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
    },
    title: {
      color: 'white'
    }
  };
};

export default withStyles(styles)(CustomCardHeader);
