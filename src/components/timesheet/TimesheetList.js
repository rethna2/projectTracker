import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card
} from '@material-ui/core';
import { Create } from '@material-ui/icons';

class TimeSheetList extends Component {
  render() {
    const data = this.props.list;
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
                <TableCell style={{ width: 300 }}>Project Name</TableCell>
                <TableCell style={{ width: 200 }}>Duration</TableCell>
                <TableCell style={{ width: 50 }}>Time Spent</TableCell>
                <TableCell style={{ width: 50 }}>Points Done</TableCell>
                <TableCell style={{ width: 50 }}>Status</TableCell>
                <TableCell style={{ width: 50 }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(item => {
                return (
                  <TableRow key={item._id}>
                    <TableCell>{item.project.name}</TableCell>
                    <TableCell>{`${moment(item.startDate).format(
                      'MMM DD'
                    )} - ${moment(item.startDate).format(
                      'MMM DD'
                    )}`}</TableCell>
                    <TableCell>{item.timeSpent}</TableCell>
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
        </Card>
      );
    }
  }
}

TimeSheetList.propTypes = {
  list: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default TimeSheetList;
