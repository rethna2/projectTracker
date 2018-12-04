import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import Search from '@material-ui/icons/Search';

const mockData = [
  {
    name: 'Alex',
    projectName: 'First Project',
    duration: 'Nov 12 - Nov 18',
    hoursSpent: 25,
    pointsDone: 18,
    status: 'approved'
  },
  {
    name: 'John',
    projectName: 'Second Project',
    duration: 'Nov 19 - Nov 25',
    hoursSpent: 35,
    pointsDone: 25,
    status: 'pending'
  },
  {
    name: 'Jack',
    projectName: 'Second Project',
    duration: 'Nov 19 - Nov 25',
    hoursSpent: 35,
    pointsDone: 25,
    status: 'rejected'
  }
];

class TimeSheetApprovalList extends Component {
  render() {
    const data = this.props.list; // mockData;
    if (!data.length) {
      return (
        <div>
          <p className="noProject" style={{ margin: 50 }}>
            No Data
          </p>
        </div>
      );
    } else {
      return (
        <div style={{ width: 1024, marginLeft: 30 }}>
          <Table>
            <TableHead displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableCell style={{ width: 350 }}>Name</TableCell>
                <TableCell style={{ width: 350 }}>Project Name</TableCell>
                <TableCell style={{ width: 350 }}>Duration</TableCell>
                <TableCell style={{ width: 50 }}>Hours Spent</TableCell>
                <TableCell style={{ width: 50 }}>Points Done</TableCell>
                <TableCell style={{ width: 50 }}>View</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody displayRowCheckbox={false}>
              {data.map(item => {
                return (
                  <TableRow>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.projectName}</TableCell>
                    <TableCell>{item.duration}</TableCell>
                    <TableCell>{item.hoursSpent}</TableCell>
                    <TableCell>{item.pointsDone}</TableCell>
                    <TableCell>
                      <Search
                        onClick={() => this.props.onView(item._id)}
                        style={{ cursor: 'pointer' }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      );
    }
  }
}

export default TimeSheetApprovalList;
