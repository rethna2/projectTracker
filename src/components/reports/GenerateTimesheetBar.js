import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

import WeekPicker from './WeekPicker';
import DatePicker from './DatePicker';

const styles = theme => ({
  flex: {
    display: 'flex'
  },
  select: {
    width: 200,
    marginRight: 20
  },
  title: {
    backgroundColor: theme.palette.primary.light,
    color: 'white !important'
  },
  spacetop: {
    marginTop: 20
  },
  closeBtn: {
    alignSelf: 'center',
    marginLeft: 20
  }
});

class GenerateTimesheetBar extends React.Component {
  state = {
    showTimesheetForm: false,
    projectId: null,
    durationType: 'weekly',
    date: [new Date(), new Date()]
  };

  onGenerate = () => {
    
  }
  onDateChange = (index, newDate) => {
    const date = [...this.state.date];
    date[index] = newDate;
    this.setState({
      date
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.flex}>
        <div className={classes.select}>
          <FormControl fullWidth>
            <InputLabel htmlFor="project">Project</InputLabel>
            <Select
              name="project"
              onChange={e => {
                this.setState({ projectId: e.target.value });
              }}
              value={this.state.projectId}
            >
              <MenuItem value="proj1">Project 1</MenuItem>
              <MenuItem value="proj2">Project 2</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.select}>
          <FormControl fullWidth>
            <InputLabel htmlFor="durationType">Duration Type</InputLabel>
            <Select
              name="durationType"
              onChange={e => {
                this.setState({ durationType: e.target.value });
              }}
              value={this.state.durationType}
            >
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="nonweekly">Date Range</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          {this.state.durationType === 'weekly' ? (
            <WeekPicker
              date={this.state.date[0]}
              onDateChange={date => this.onDateChange(0, date)}
            />
          ) : (
            <div className={classes.flex}>
              <DatePicker
                label="Start Date"
                date={this.state.date[0]}
                onDateChange={date => this.onDateChange(0, date)}
              />
              <DatePicker
                label="End Date"
                date={this.state.date[1]}
                onDateChange={date => this.onDateChange(1, date)}
              />
            </div>
          )}
        </div>
        <Button onClick={this.onGenerate} color="primary">
          Generate
        </Button>
        <Close onClick={this.props.onCloseBar} className={classes.closeBtn} />
      </div>
    );
  }
}

export default withStyles(styles)(GenerateTimesheetBar);
