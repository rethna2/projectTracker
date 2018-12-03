import React, { Component } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';

class ReportTable extends Component {
  render() {
    console.log(this.props.reportData);
    if (!this.props.reportData.length) {
      return (
        <div>
          <p className="noProject">No Reports Available</p>
        </div>
      );
    } else {
      return (
        <Table>
          <TableHead displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell>Task Count</TableCell>
              <TableCell>Completed Task Count</TableCell>
              <TableCell>Points Count</TableCell>
              <TableCell>Completed Points Count</TableCell>
              <TableCell>Project status in %</TableCell>
            </TableRow>
          </TableHead>
          <TableBody displayRowCheckbox={false}>
            {this.props.reportData.map(item => {
              let pointsCount = 0;
              let completedPoints = 0;
              let points;
              let taskcomPoints;
              let taskCompletionCount = 0;
              let tasknames;
              item.tasks.forEach(data => {
                points = data.points;
                tasknames = data.name;
                taskcomPoints = 0;
                let taskName;
                pointsCount += data.points;
                data.timeLog.forEach(value => {
                  taskName = value.taskName;
                  taskcomPoints += value.taskCompletion;
                  completedPoints += value.taskCompletion;
                });
                if (points === taskcomPoints && taskName === tasknames) {
                  taskCompletionCount++;
                }
              });
              const status = (completedPoints / pointsCount) * 100;
              let statusValue = 0;
              if (isNaN(status)) {
                statusValue = 0;
              } else {
                statusValue = Math.round(status);
              }
              let styel = {
                width: statusValue
              };

              return (
                <TableRow>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.taskCount}</TableCell>
                  <TableCell>{taskCompletionCount}</TableCell>
                  <TableCell>{pointsCount}</TableCell>
                  <TableCell>{completedPoints}</TableCell>
                  <TableCell>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        aria-valuenow={statusValue}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={styel}
                      >
                        {statusValue}%
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      );
    }
  }
}

export default ReportTable;
