import React, { Component } from 'react';
import { connect } from 'react-redux';

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
  console.log('theme', theme);
  return {
    wrapper: {
      width: '80vw',
      maxWidth: 800,
      minWidth: 400
    },
    title: {
      backgroundColor: theme.palette.primary.light,
      color: 'white !important'
    },
    spacetop: {
      marginTop: 20
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

class TimeSheetPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: ''
    };
  }

  componentDidMount() {
    const { projectId, from, to, user } = this.props.timesheetData;
    this.props.fetchProjectTime({ projectId, from, to, user });
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

  projectFormSubmit = values => {
    if (!this.props.error) {
      const data = {
        name: values.name,
        description: values.description,
        team: this.state.people
      };
      const id = this.props.match.params.projectId;
      if (id === 'new') {
        this.props.addProject(data);
      } else {
        this.props.editProject({ id, data });
      }
    }
  };

  onTimesheetSubmit = () => {
    const { projectId, from, to } = this.props.timesheetData;
    this.props.generateTimesheet({
      startDate: from,
      endDate: to,
      comments: this.state.comments,
      project: {
        id: projectId,
        name: this.props.projects.find(p => p._id === projectId).name
      }
    });
  };

  onTimesheetReject = () => {};

  onTimesheetApprove = () => {};

  render() {
    const { handleSubmit, pristine, reset, submitting, classes } = this.props;
    if (this.props.isPopup) {
      this.props.history.push('/projects');
    }
    console.log(this.props.error);
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
          TimeSheet
        </DialogTitle>
        <DialogContent>
          <Table>
            <TableHead displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableCell style={{ width: 200 }}>Date</TableCell>
                <TableCell style={{ width: 400 }}>Task</TableCell>
                <TableCell style={{ width: 50 }}>Total Points</TableCell>
                <TableCell style={{ width: 50 }}>Points Completed</TableCell>
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
                    <TableCell>{item.entries[0].hoursSpent}</TableCell>
                    <TableCell>{item.entries[0].pointsDone}</TableCell>
                    <TableCell>{item.entries[0].comments}</TableCell>
                  </TableRow>
                  {item.entries.map(
                    (entry, i) =>
                      i !== 0 && (
                        <TableRow>
                          <TableCell>{entry.taskName}</TableCell>
                          <TableCell>{entry.hoursSpent}</TableCell>
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
          <Button onClick={this.props.onClose} color="primary">
            Cancel
          </Button>
          {this.props.isReviewer ? (
            <React.Fragment>
              <Button
                submit
                color="primary"
                autoFocus
                onClick={this.props.onTimesheetReject}
              >
                Reject
              </Button>
              <Button
                submit
                color="primary"
                autoFocus
                onClick={this.props.onTimesheetApprove}
              >
                Approve
              </Button>
            </React.Fragment>
          ) : (
            <Button
              submit
              color="primary"
              autoFocus
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
    emailId: state.user.data.emailId
  }),
  {
    fetchProjectTime,
    generateTimesheet,
    editTimesheet,
    deleteTimesheet,
    reviewTimesheet
  }
)(withStyles(styles)(TimeSheetPopup));
