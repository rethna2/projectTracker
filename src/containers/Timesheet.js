import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import GenerateTimesheetBar from '../components/timesheet/GenerateTimesheetBar';
import TimeSheetList from '../components/timesheet/TimesheetList';
import TimesheetReviewList from '../components/timesheet/TimesheetReviewList';
import TimeSheetPopup from '../components/timesheet/TimesheetPopup';

import { fetchMyTimesheets, fetchMyReviewTimesheets } from '../routines';
import Loader from '../components/Loader';

import { Button, Typography } from '@material-ui/core';

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
    isReviewer: null,
    timesheetData: null
  };
  componentDidMount() {
    this.props.fetchMyTimesheets();
    this.props.fetchMyReviewTimesheets();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.updating && !nextProps.updating) {
      this.props.fetchMyTimesheets();
      this.props.fetchMyReviewTimesheets();
      this.setState({
        showTimesheetActionBar: false,
        showTimesheetPopup: false,
        isReviewer: null,
        timesheetData: null
      });
    }
  }

  onGenerate = timesheetData => {
    this.setState({ timesheetData, showTimesheetPopup: true });
  };

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

  onEditTimesheet = (id, isReviewer = false) => {
    const data = this.props.list.find(item => item.project.id === id);
    const timesheetData = {
      projectId: id,
      from: new Date(data.startDate).getTime(),
      to: new Date(data.endDate).getTime(),
      user: data.people.id,
      comments: data.comments,
      approverComments: data.approverComments,
      timesheetId: data._id
    };
    this.setState({
      showTimesheetPopup: true,
      isReviewer,
      timesheetData
    });
  };

  render() {
    if (this.props.loading) {
      return <Loader />;
    }
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        {this.state.showTimesheetActionBar ? (
          <GenerateTimesheetBar
            onGenerate={this.onGenerate}
            onCloseBar={this.onCloseBar}
          />
        ) : (
          <Button onClick={this.onOpenBar} color="primary" variant="contained">
            Generate TimeSheet
          </Button>
        )}
        <div>
          <Typography variant="h5" className={classes.spacetop}>
            My Recent Timesheets
          </Typography>
          <div>
            <TimeSheetList
              onEdit={this.onEditTimesheet}
              list={this.props.list}
            />
          </div>
        </div>
        <div>
          <Typography variant="h5" className={classes.spacetop}>
            Timesheets waiting for approval
          </Typography>
          <div>
            <TimesheetReviewList
              onView={id => this.onEditTimesheet(id, true)}
              list={this.props.reviewList}
            />
          </div>
        </div>
        {this.state.showTimesheetPopup && (
          <TimeSheetPopup
            isReviewer={this.state.isReviewer}
            timesheetData={this.state.timesheetData}
            updating={this.props.updating}
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
    loading: state.timesheet.loading && state.timesheet.loadingReview,
    updating: state.timesheet.updating,
    list: state.timesheet.list,
    reviewList: state.timesheet.reviewList
  }),
  {
    fetchMyTimesheets,
    fetchMyReviewTimesheets
  }
)(withStyles(styles)(Reports));
