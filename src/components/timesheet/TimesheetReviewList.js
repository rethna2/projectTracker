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
import moment from 'moment';

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
                    <TableCell>{item.people.name}</TableCell>
                    <TableCell>{item.project.name}</TableCell>
                    <TableCell>{`${moment(item.startDate).format(
                      'MMM DD'
                    )} - ${moment(item.startDate).format(
                      'MMM DD'
                    )}`}</TableCell>
                    <TableCell>{item.hoursSpent}</TableCell>
                    <TableCell>{item.pointsDone}</TableCell>
                    <TableCell>
                      <Search
                        onClick={() => this.props.onView(item.project.id)}
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
