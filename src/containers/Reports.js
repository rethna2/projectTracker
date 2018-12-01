import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import GenerateTimesheetBar from '../components/reports/GenerateTimesheetBar';
import TimeSheetList from '../components/reports/TimeSheetList';
import TimeSheetApprovalList from '../components/reports/TimeSheetApprovalList';
import TimeSheetPopup from '../components/reports/TimeSheetPopup';

import { fetchReports } from '../routines';
import Loader from '../components/Loader';

import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button
} from '@material-ui/core';

const styles = theme => ({
  wrapper: {
    margin: 20
  },
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
  }
});
class Reports extends Component {
  state = {
    showTimesheetActionBar: false,
    showTimesheetPopup: false,
    isReviewer: null
  };
  componentDidMount() {
    this.props.fetchReports();
  }

  onOpenBar = () => {
    if (!this.state.showTimesheetActionBar) {
      this.setState({ showTimesheetActionBar: true });
    }
  };

  onCloseBar = () => {
    if (this.state.showTimesheetActionBar) {
      this.setState({ showTimesheetActionBar: false });
    }
  };

  render() {
    if (this.props.reports.loading) {
      return <Loader />;
    }
    const { data } = this.props.reports;
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <h3 />
        <Button onClick={this.onOpenBar} color="primary">
          Generate TimeSheet
        </Button>
        {this.state.showTimesheetActionBar && (
          <GenerateTimesheetBar
            onGenerate={this.onGenerate}
            onCloseBar={this.onCloseBar}
          />
        )}
        <div>
          <h6 className={classes.spacetop}>My Recent Timesheets </h6>
          <div>
            <TimeSheetList
              onEdit={e => {
                this.setState({ showTimesheetPopup: true, isReviewer: false });
              }}
            />
          </div>
        </div>
        <div>
          <h6 className={classes.spacetop}>Timesheets waiting for approval </h6>
          <div>
            <TimeSheetApprovalList
              onView={e => {
                this.setState({ showTimesheetPopup: true, isReviewer: true });
              }}
            />
          </div>
        </div>
        {this.state.showTimesheetPopup && (
          <TimeSheetPopup
            isReviewer={this.state.isReviewer}
            onClose={() => {
              this.setState({ showTimesheetPopup: false });
            }}
            onSubmit={() => {
              //this.setState({ showTimesheetPopup: false });
            }}
          />
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    reports: state.reports
  }),
  { fetchReports }
)(withStyles(styles)(Reports));
