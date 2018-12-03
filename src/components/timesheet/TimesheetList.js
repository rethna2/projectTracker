import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import Create from '@material-ui/icons/Create';

const mockData = [
  {
    projectName: 'First Project',
    duration: 'Nov 12 - Nov 18',
    hoursSpent: 25,
    pointsDone: 18,
    status: 'approved'
  },
  {
    projectName: 'Second Project',
    duration: 'Nov 19 - Nov 25',
    hoursSpent: 35,
    pointsDone: 25,
    status: 'pending'
  },
  {
    projectName: 'Second Project',
    duration: 'Nov 19 - Nov 25',
    hoursSpent: 35,
    pointsDone: 25,
    status: 'rejected'
  }
];

class TimeSheetList extends Component {
  render() {
    const data = mockData; //this.props.projectData;
    if (!data.length) {
      return (
        <div>
          <p className="noProject">No Data</p>
        </div>
      );
    } else {
      return (
        <div style={{ width: 1024, marginLeft: 30 }}>
          <Table>
            <TableHead displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableCell style={{ width: 300 }}>Project Name</TableCell>
                <TableCell style={{ width: 200 }}>Duration</TableCell>
                <TableCell style={{ width: 50 }}>Hours Spent</TableCell>
                <TableCell style={{ width: 50 }}>Points Done</TableCell>
                <TableCell style={{ width: 50 }}>Status</TableCell>
                <TableCell style={{ width: 50 }} />
              </TableRow>
            </TableHead>
            <TableBody displayRowCheckbox={false}>
              {data.map(item => {
                return (
                  <TableRow>
                    <TableCell>{item.projectName}</TableCell>
                    <TableCell>{item.duration}</TableCell>
                    <TableCell>{item.hoursSpent}</TableCell>
                    <TableCell>{item.pointsDone}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>
                      {item.status !== 'approved' && (
                        <Create
                          onClick={() => this.props.onEdit(item._id)}
                          style={{ cursor: 'pointer' }}
                        />
                      )}
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

export default TimeSheetList;
