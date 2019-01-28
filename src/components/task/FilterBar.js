import React, { Component } from 'react';
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  withStyles
} from '@material-ui/core';

const styles = theme => ({
  bar: {
    padding: 5,
    backgroundColor: 'white'
  },
  label: {
    verticalAlign: 'bottom'
  },
  select: {
    marginLeft: 30,
    width: 200
  }
});

class FilterBar extends Component {
  render() {
    const { classes, team } = this.props;
    console.log('this.props', this.props);
    return (
      <div className={classes.bar}>
        <span className={classes.label}>Filter By:</span>
        <FormControl className={classes.select}>
          <InputLabel htmlFor="status">Status</InputLabel>
          <Select
            name="status"
            value={this.props.filters.status}
            onChange={e => this.props.onChange('status', e.target.value)}
          >
            <MenuItem value="" />
            <MenuItem value="backlog">Backlog</MenuItem>
            <MenuItem value="new">New</MenuItem>
            <MenuItem value="wip">WIP</MenuItem>
            <MenuItem value="review">Review</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.select}>
          <InputLabel htmlFor="status">Assigned To</InputLabel>
          <Select
            name="assignedTo"
            value={this.props.filters.assignedTo}
            onChange={e => this.props.onChange('assignedTo', e.target.value)}
          >
            <MenuItem value="" />
            {team.map(member => (
              <MenuItem key={member} value={member}>
                {member}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(FilterBar);
