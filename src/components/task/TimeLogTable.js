import React, { Component } from 'react';
import moment from 'moment';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card
} from '@material-ui/core';
import Create from '@material-ui/icons/Create';

class TimeLogTable extends Component {
  render() {
    const { list } = this.props;
    if (!list.length) {
      return (
        <div>
          <p className="noProject">No Tasks Available</p>
        </div>
      );
    } else {
      return (
        <Card>
          <Table>
            <TableHead displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableCell />
                <TableCell style={{ width: '100%' }}>Date</TableCell>
                <TableCell style={{ width: 100 }}> Points Done</TableCell>
                <TableCell style={{ width: 100 }}>Time Spent</TableCell>
              </TableRow>
            </TableHead>
            <TableBody displayRowCheckbox={false}>
              {list.map(item => (
                <TableRow>
                  <TableCell>
                    <Create
                      style={{ cursor: 'pointer' }}
                      onClick={() => this.props.onEdit(item._id)}
                    />
                  </TableCell>
                  <TableCell>
                    {moment(item.date).format('MMM DD , YYYY')}
                  </TableCell>
                  <TableCell>{item.pointsDone}</TableCell>
                  <TableCell>{item.timeSpent}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      );
    }
  }
}

export default TimeLogTable;
