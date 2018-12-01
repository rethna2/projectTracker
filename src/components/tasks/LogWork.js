import React, { Component } from 'react';
import { Typography, Button, withStyles } from '@material-ui/core';
import { DatePicker } from 'material-ui-pickers';
import cx from 'classnames';

import { TextField } from '../../forms';

const styles = () => ({
  wrapper: {
    borderLeft: '1px solid green',
    paddingLeft: 20
  },
  marginTop15: {
    marginTop: 15
  },
  flex: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 20
  },
  hspace: {
    margin: '0 20px'
  },
  right: {
    textAlign: 'right'
  }
});

class LogWork extends Component {
  state = {
    date: new Date()
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  render() {
    if (this.props.loading) {
      return <div style={{ margin: 50 }}> Loading... </div>;
    }
    if (!this.props.taskId) {
      return (
        <div style={{ margin: 50 }}> Select a Task to see more details </div>
      );
    }
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <Typography variant="h5">Log Work</Typography>
        <div className={cx(classes.flex, classes.marginTop15)}>
          <TextField label="Time Spent" type="number" width="100" />
          <TextField
            label="Points Done"
            type="number"
            className={classes.hspace}
          />
          <DatePicker
            format="MMM DD, YY"
            animateYearScrolling={false}
            value={this.state.selectedDate}
            onChange={this.handleDateChange}
          />
        </div>
        <div>
          <TextField label="Comments" multiline rows={5} fullWidth />
        </div>
        <div className={cx(classes.marginTop15, classes.right)}>
          <Button variant="contained" color="primary">
            Log Work
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(LogWork);
