/* eslint-disable no-param-reassign */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { DatePicker } from 'material-ui-pickers';
import { IconButton, withStyles } from '@material-ui/core';

class CustomElements extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  state = {
    selectedDate: new Date()
  };

  handleWeekChange = date => {
    console.log('handleWeekChange', date);
    this.setState({ selectedDate: date.startOf('isoWeek') });
  };

  formatWeekSelectLabel = (date, invalidLabel) => {
    if (date === null) {
      return '';
    }

    return date ? `CW ${date.isoWeek()}, ${date.format('YYYY')}` : invalidLabel;
  };

  renderWrappedWeekDay = (date, selectedDate, dayInCurrentMonth) => {
    const { classes } = this.props;

    const start = selectedDate.clone().startOf('isoWeek');
    const end = selectedDate.clone().endOf('isoWeek');

    const dayIsBetween = date.isBetween(start, end, 'day', '[]');
    const isFirstDay = date.isSame(start, 'day');
    const isLastDay = date.isSame(end, 'day');

    const wrapperClassName = classNames({
      [classes.highlight]: dayIsBetween,
      [classes.firstHighlight]: isFirstDay,
      [classes.endHighlight]: isLastDay
    });

    const dayClassName = classNames(classes.day, {
      [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
      [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsBetween
    });

    return (
      <div className={wrapperClassName}>
        <IconButton className={dayClassName}>
          <span> {date.format('D')} </span>
        </IconButton>
      </div>
    );
  };

  render() {
    const { selectedDate } = this.state;
    console.log('selectedDate', selectedDate);
    return (
      <div className="picker">
        <DatePicker
          label="Week picker"
          value={selectedDate}
          onChange={this.handleWeekChange}
          renderDay={this.renderWrappedWeekDay}
          format="MMM DD, YY"
        />
      </div>
    );
  }
}

const styles = theme => ({
  dayWrapper: {
    position: 'relative'
  },
  day: {
    width: 36,
    height: 36,
    fontSize: theme.typography.caption.fontSize,
    margin: '0 2px',
    color: 'inherit'
  },
  customDayHighlight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '2px',
    right: '2px',
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: '50%'
  },
  nonCurrentMonthDay: {
    color: theme.palette.text.disabled
  },
  highlightNonCurrentMonthDay: {
    color: '#676767'
  },
  highlight: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white
  },
  firstHighlight: {
    extend: 'highlight',
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%'
  },
  endHighlight: {
    extend: 'highlight',
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%'
  }
});

export default withStyles(styles)(CustomElements);
