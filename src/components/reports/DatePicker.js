import React, { Fragment, PureComponent } from 'react';
import { DatePicker } from 'material-ui-pickers';

export default class BasicDatePicker extends PureComponent {
  render() {
    return (
      <Fragment>
        <div className="picker">
          <DatePicker
            label={this.props.label}
            format="MMM DD, YY"
            value={this.props.date}
            onChange={this.props.onDateChange}
            animateYearScrolling
          />
        </div>
      </Fragment>
    );
  }
}
