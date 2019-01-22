import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card
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
        <Card style={{ width: 1024, marginLeft: 30 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: 350 }}>Name</TableCell>
                <TableCell style={{ width: 350 }}>Project Name</TableCell>
                <TableCell style={{ width: 350 }}>Duration</TableCell>
                <TableCell style={{ width: 50 }}>Time Spent</TableCell>
                <TableCell style={{ width: 50 }}>Points Done</TableCell>
                <TableCell style={{ width: 50 }}>View</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(item => {
                return (
                  <TableRow key={item._id}>
                    <TableCell>{item.people.name}</TableCell>
                    <TableCell>{item.project.name}</TableCell>
                    <TableCell>{`${moment(item.startDate).format(
                      'MMM DD'
                    )} - ${moment(item.startDate).format(
                      'MMM DD'
                    )}`}</TableCell>
                    <TableCell>{item.timeSpent}</TableCell>
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
        </Card>
      );
    }
  }
}

export default TimeSheetApprovalList;
