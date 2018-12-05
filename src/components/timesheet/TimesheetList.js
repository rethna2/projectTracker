import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import Create from '@material-ui/icons/Create';

class TimeSheetList extends Component {
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
                    <TableCell>{item.project.name}</TableCell>
                    <TableCell>{`${moment(item.startDate).format(
                      'MMM DD'
                    )} - ${moment(item.startDate).format(
                      'MMM DD'
                    )}`}</TableCell>
                    <TableCell>{item.hoursSpent}</TableCell>
                    <TableCell>{item.pointsDone}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>
                      {item.status !== 'approved' && (
                        <Create
                          onClick={() => this.props.onEdit(item.project.id)}
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
