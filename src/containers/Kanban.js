import React from 'react';
import { Typography, Card, withStyles } from '@material-ui/core';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';

import KanbanColumn from '../components/kanban/KanbanColumn';
import KanbanItem from '../components/kanban/KanbanItem';
import { TextField } from '../forms';
const channels = ['backlog', 'new', 'wip', 'review', 'done'];
const labelsMap = {
  backlog: 'Backlog',
  new: 'To Do',
  wip: 'In Progress',
  review: 'Review',
  done: 'Done'
};

//
let idCounter = 11;
const tasks = [
  { _id: 1, title: 'First Task', status: 'backlog' },
  { _id: 2, title: 'Second Task', status: 'backlog' },
  { _id: 3, title: 'Third Task', status: 'backlog' },
  { _id: 4, title: 'Fourth Task', status: 'new' },
  { _id: 5, title: 'Fifth Task', status: 'new' },
  { _id: 6, title: 'Sixth Task', status: 'wip' },
  { _id: 7, title: 'Seventh Task', status: 'review' },
  { _id: 8, title: 'Eighth Task', status: 'review' },
  { _id: 9, title: 'Ninth Task', status: 'done' },
  { _id: 10, title: 'Tenth Task', status: 'done' }
];

const styles = theme => {
  console.log('theme', theme);
  return {
    flex: {
      display: 'flex',
      margin: '0 auto',
      width: '90vw',
      fontFamily: 'Arial, "Helvetica Neue", sans-serif'
    },
    title: {
      margin: 20,
      textAlign: 'center'
    },
    column: {
      minWidth: 200,
      width: '18vw',
      height: '80vh',
      margin: '0 auto',
      // border: `1px solid ${theme.palette.primary.light}`,
      backgroundColor: theme.palette.primary.light
    },
    columnHead: {
      textAlign: 'center',
      padding: 10,
      fontSize: '1.2em',
      backgroundColor: theme.palette.secondary.light
    },
    item: {
      padding: 10,
      margin: 10,
      fontSize: '0.8em',
      cursor: 'pointer',
      // borderBottom: '1px solid green',
      backgroundColor: 'white'
    }
  };
};

@DragDropContext(HTML5Backend)
class Kanban extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks,
      newTask: ''
    };
  }
  update = (id, status) => {
    const { tasks } = this.state;
    const task = tasks.find(task => task._id === id);
    task.status = status;
    const taskIndex = tasks.indexOf(task);
    const newTasks = update(tasks, {
      [taskIndex]: { $set: task }
    });
    this.setState({ tasks: newTasks });
  };

  onNewTask = e => {
    console.log('e.charCode', e.charCode, e);
    if (e.charCode === 13) {
      const newTasks = update(this.state.tasks, {
        $push: [
          {
            _id: idCounter,
            title: this.state.newTask,
            status: 'backlog'
          }
        ]
      });
      idCounter++;
      this.setState({ newTask: '', tasks: newTasks });
    }
  };
  render() {
    const { tasks } = this.state;
    const { classes } = this.props;
    return (
      <main>
        <Typography variant="h4" className={classes.title}>
          Kanban Board
        </Typography>
        <div className={classes.flex}>
          {channels.map(channel => (
            <KanbanColumn status={channel}>
              <section className={classes.column}>
                <div className={classes.columnHead}>{labelsMap[channel]}</div>
                <div>
                  {tasks
                    .filter(item => item.status === channel)
                    .map(item => (
                      <KanbanItem id={item._id} onDrop={this.update}>
                        <Card className={classes.item}>{item.title}</Card>
                      </KanbanItem>
                    ))}
                  {channel === 'backlog' && (
                    <div
                      style={{
                        backgroundColor: 'white',
                        margin: 10,
                        borderRadius: 3
                      }}
                    >
                      <TextField
                        name="taskName"
                        label="Add new task"
                        fullWidth
                        onChange={e =>
                          this.setState({ newTask: e.target.value })
                        }
                        style={{ margin: 10 }}
                        value={this.state.newTask}
                        onKeyPress={this.onNewTask}
                      />
                    </div>
                  )}
                </div>
              </section>
            </KanbanColumn>
          ))}
        </div>
      </main>
    );
  }
}

export default withStyles(styles)(Kanban);
