import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import {
  fetchProjectTime,
  generateTimesheet,
  editTimesheet,
  deleteTimesheet,
  reviewTimesheet
} from '../../routines';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => {
  return {
    wrapper: {
      width: '80vw',
      maxWidth: 800,
      minWidth: 400
    },
    title: {
      backgroundColor: theme.palette.primary.light
    },
    titleTxt: {
      color: 'white'
    },
    spacetop: {
      marginTop: 20
    },
    spaceLeft: {
      marginLeft: 20
    },
    flex: {
      display: 'flex'
    },
    grow: {
      flexGrow: 1,
      margin: 40
    }
  };
};

const data = [
  {
    date: 'Nov 26',
    entries: [
      {
        taskName: 'My Task One',
        hoursSpent: 5,
        pointsDone: 2,
        comments: 'No comments'
      },
      {
        taskName: 'My Task Two',
        hoursSpent: 5,
        pointsDone: 2,
        comments: 'No comments'
      }
    ]
  },
  {
    date: 'Nov 27',
    entries: [
      {
        taskName: 'My Task Three',
        hoursSpent: 5,
        pointsDone: 2,
        comments: 'No comments'
      },
      {
        taskName: 'My Task Four',
        hoursSpent: 5,
        pointsDone: 2,
        comments: 'No comments'
      }
    ]
  }
];

const transformData = data => {
  const list = [];
  let totalTimeSpent = 0;
  let totalPointsDone = 0;
  for (let i = 0; i < data.length; i++) {
    const d = data[i];
    const dateStr = moment(d.date).format('MMM DD, YYYY');
    const obj = {
      taskName: 'yet to come',
      timeSpent: d.timeSpent,
      pointsDone: d.pointsDone,
      comments: d.comments
    };
    totalTimeSpent += d.timeSpent;
    totalPointsDone += d.pointsDone;
    const present = list.find(item => item.date === dateStr);
    if (present) {
      present.entries.push(obj);
    } else {
      list.push({
        date: dateStr,
        entries: [obj]
      });
    }
  }
  return {
    data: list,
    totalTimeSpent,
    totalPointsDone
  };
};

class TimeSheetPopup extends Component {
  constructor(props) {
    super(props);
    const {
      projectId,
      from,
      to,
      user,
      comments,
      approverComments
    } = props.timesheetData;
    this.props.fetchProjectTime({
      projectId,
      from,
      to,
      user
    });

    this.state = {
      comments: comments || '',
      approverComments: approverComments || '',
      showConfirmDelete: false
    };
  }

  onAddPerson = person => {
    this.setState({ people: [...this.state.people, person] });
  };

  onRemovePerson = person => {
    const index = this.state.people.indexOf(person);
    const { people } = this.state;
    this.setState({
      people: [...people.slice(0, index), ...people.slice(index + 1)]
    });
  };

  onTimesheetSubmit = () => {
    const { projectId, from, to, timesheetId } = this.props.timesheetData;
    if (timesheetId) {
      this.props.editTimesheet({
        timesheetId,
        data: {
          comments: this.state.comments
        }
      });
    } else {
      this.props.generateTimesheet({
        startDate: from,
        endDate: to,
        comments: this.state.comments,
        pointsDone: this.totalPointsDone,
        timeSpent: this.totalTimeSpent,
        project: {
          id: projectId,
          name: this.props.projects.find(p => p._id === projectId).name
        }
      });
    }
  };

  onTimesheetDelete = () => {
    const { timesheetId } = this.props.timesheetData;
    this.props.deleteTimesheet({
      timesheetId
    });
  };

  onTimesheetAction = isApprove => {
    const { timesheetId } = this.props.timesheetData;
    this.props.reviewTimesheet({
      timesheetId,
      data: {
        approverComments: this.state.approverComments,
        status: isApprove ? 'approved' : 'rejected'
      }
    });
  };

  onTimesheetApprove = () => {};

  render() {
    const { handleSubmit, pristine, reset, submitting, classes } = this.props;

    let data = [];
    if (this.props.data) {
      const generatedData = transformData(this.props.data);
      data = generatedData.data;
      this.totalTimeSpent = generatedData.totalTimeSpent;
      this.totalPointsDone = generatedData.totalPointsDone;
    }
    return (
      <Dialog
        open={true}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="900"
        onClose={this.props.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" className={classes.title}>
          <div className={classes.titleTxt}>TimeSheet</div>
        </DialogTitle>
        <DialogContent>
          <Table>
            <TableHead displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableCell style={{ width: 200 }}>Date</TableCell>
                <TableCell style={{ width: 400 }}>Task</TableCell>
                <TableCell style={{ width: 50 }}>Time Spent</TableCell>
                <TableCell style={{ width: 50 }}>Points Done</TableCell>
                <TableCell style={{ width: 400 }}>Comments</TableCell>

                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody displayRowCheckbox={false}>
              {data.map(item => (
                <React.Fragment>
                  <TableRow>
                    <TableCell rowSpan={item.entries.length}>
                      {item.date}
                    </TableCell>
                    <TableCell>{item.entries[0].taskName}</TableCell>
                    <TableCell>{item.entries[0].timeSpent}</TableCell>
                    <TableCell>{item.entries[0].pointsDone}</TableCell>
                    <TableCell>{item.entries[0].comments}</TableCell>
                  </TableRow>
                  {item.entries.map(
                    (entry, i) =>
                      i !== 0 && (
                        <TableRow>
                          <TableCell>{entry.taskName}</TableCell>
                          <TableCell>{entry.timeSpent}</TableCell>
                          <TableCell>{entry.pointsDone}</TableCell>
                          <TableCell>{entry.comments}</TableCell>
                        </TableRow>
                      )
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
          <div className={classes.flex}>
            <TextField
              className={classes.grow}
              rows={5}
              multiline
              label="Comments"
              value={this.state.comments}
              onChange={e => this.setState({ comments: e.target.value })}
              disabled={this.props.isReviewer}
            />
            <TextField
              className={classes.grow}
              rows={5}
              multiline
              label="Reviewer Comments"
              disabled={!this.props.isReviewer}
            />
          </div>
        </DialogContent>
        <DialogActions>
          {!this.props.isReviewer &&
            this.props.timesheetData.timesheetId &&
            (this.state.showConfirmDelete ? (
              <React.Fragment>
                <span className={classes.spaceLeft}> Are you sure? </span>
                <Button
                  className={classes.spaceLeft}
                  onClick={this.onTimesheetDelete}
                  color="error"
                  variant="contained"
                >
                  Delete
                </Button>
                <Button
                  className={classes.spaceLeft}
                  onClick={() => this.setState({ showConfirmDelete: false })}
                  color="error"
                  variant="contained"
                >
                  Cancel
                </Button>
              </React.Fragment>
            ) : (
              <Button
                onClick={() => this.setState({ showConfirmDelete: true })}
                color="error"
                variant="contained"
              >
                Delete Timesheet
              </Button>
            ))}
          <div style={{ flexGrow: 1 }} />

          {this.props.updating && <div style={{ padding: 5 }}>Updating...</div>}
          <Button onClick={this.props.onClose} color="primary">
            Cancel
          </Button>
          {this.props.isReviewer ? (
            <React.Fragment>
              <Button
                color="error"
                variant="contained"
                onClick={() => this.onTimesheetAction(false)}
              >
                Reject
              </Button>
              <Button
                color="primary"
                variant="contained"
                className={classes.spaceLeft}
                onClick={() => this.onTimesheetAction(true)}
              >
                Approve
              </Button>
            </React.Fragment>
          ) : (
            <Button
              variant="contained"
              className={classes.spaceLeft}
              onClick={this.onTimesheetSubmit}
            >
              Submit
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  }
}

export default connect(
  state => ({
    projects: state.project.list || [],
    emailId: state.user.data.emailId,
    data: state.time.data
  }),
  {
    fetchProjectTime,
    generateTimesheet,
    editTimesheet,
    deleteTimesheet,
    reviewTimesheet
  }
)(withStyles(styles)(TimeSheetPopup));
