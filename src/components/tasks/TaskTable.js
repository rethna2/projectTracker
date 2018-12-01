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

class TaskTable extends Component {
  render() {
    if (!this.props.taskData.length) {
      return (
        <div>
          <p className="noProject">No Tasks Available</p>
        </div>
      );
    } else {
      const { selectedTask, onSelect } = this.props;

      return (
        <div>
          <Table>
            <TableHead displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableCell />
                <TableCell style={{ width: '100%' }}>Task Name</TableCell>
                <TableCell style={{ width: 50 }}>Status</TableCell>
                <TableCell style={{ width: 50, textAlign: 'center' }}>
                  Assigned To
                </TableCell>
                <TableCell style={{ width: 50 }}>Total Points</TableCell>
                <TableCell style={{ width: 50 }}> Points Done</TableCell>
                <TableCell style={{ width: 50 }}>Time Spent</TableCell>
              </TableRow>
            </TableHead>
            <TableBody displayRowCheckbox={false}>
              {this.props.taskData.map(item => (
                <TableRow
                  style={{
                    cursor: 'pointer',
                    backgroundColor: selectedTask === item._id ? 'yellow' : ''
                  }}
                  onClick={() => onSelect(item._id)}
                >
                  <TableCell>
                    <Link
                      to={`/project/${item.projectId}/task/${item._id}`}
                      onClick={() => this.props.handleOpen()}
                    >
                      <Create />
                    </Link>
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.assignedTo}</TableCell>
                  <TableCell>{item.points}</TableCell>
                  <TableCell>{item.pointsDone}</TableCell>
                  <TableCell>{item.timeSpent}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      );
    }
  }
}

export default TaskTable;
