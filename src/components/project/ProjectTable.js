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

class ProjectTable extends Component {
  render() {
    const { list, selectedProject, onSelect } = this.props;

    if (!list.length) {
      return (
        <div>
          <p className="noProject">No Projects Available</p>
        </div>
      );
    } else {
      return (
        <div>
          <Table>
            <TableHead displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableCell />
                <TableCell style={{ width: '100%' }}>Name</TableCell>
                <TableCell style={{ width: 50 }}>Total Tasks</TableCell>
                <TableCell style={{ width: 50 }}>Total Points</TableCell>
                <TableCell style={{ width: 50 }}>Points Completed</TableCell>
                <TableCell style={{ width: 50 }}>Hours Spent</TableCell>

                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody displayRowCheckbox={false}>
              {list.map(item => {
                return (
                  <TableRow
                    style={{
                      cursor: 'pointer',
                      backgroundColor:
                        selectedProject === item._id ? 'yellow' : ''
                    }}
                    onClick={() => onSelect(item._id)}
                  >
                    <TableCell>
                      <Link
                        to={`/project/${item._id}`}
                        onClick={e => {
                          e.stopPropagation();
                          this.props.handleOpen();
                        }}
                      >
                        <Create />
                      </Link>
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.noOfTasks}</TableCell>
                    <TableCell>{item.totalPoints}</TableCell>
                    <TableCell>{item.pointsDone}</TableCell>
                    <TableCell>{item.timeSpent}</TableCell>
                    <TableCell>
                      <Link to={`/project/${item._id}/task`}>Tasks</Link>
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

export default ProjectTable;
