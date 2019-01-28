import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card
} from '@material-ui/core';
import Create from '@material-ui/icons/Create';

import { filterTasks } from '../../logic/transforms';

class TaskTable extends Component {
  render() {
    const { list, filters } = this.props;
    if (!list.length) {
      return (
        <div>
          <p className="noProject">No Tasks Available</p>
        </div>
      );
    } else {
      const { selectedTask, onSelect } = this.props;

      return (
        <Card>
          <Table>
            <TableHead>
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
            <TableBody>
              {filterTasks(list, filters).map(item => (
                <TableRow
                  key={item._id}
                  style={{
                    cursor: 'pointer',
                    backgroundColor:
                      selectedTask && selectedTask._id === item._id
                        ? '#aad7fb'
                        : ''
                  }}
                  onClick={() => onSelect(item)}
                >
                  <TableCell>
                    <Link
                      to={`/project/${this.props.projectId}/task/${item._id}`}
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
        </Card>
      );
    }
  }
}

TaskTable.propTypes = {
  list: PropTypes.array.isRequired,
  selectedTask: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
  handleOpen: PropTypes.func.isRequired
};

export default TaskTable;
