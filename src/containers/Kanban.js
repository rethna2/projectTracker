import React from 'react';
import { Typography } from '@material-ui/core';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';

import KanbanColumn from '../components/kanban/KanbanColumn';
import KanbanItem from '../components/kanban/KanbanItem';

const channels = ['backlog', 'new', 'wip', 'review', 'done'];
const labelsMap = {
  backlog: 'Backlog',
  new: 'To Do',
  wip: 'In Progress',
  review: 'Review',
  done: 'Done'
};

//

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

@DragDropContext(HTML5Backend)
class Kanban extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks
    };
  }
  update = (id, status) => {
    console.log('id', id, status);
    const { tasks } = this.state;
    const task = tasks.find(task => task._id === id);
    task.status = status;
    const taskIndex = tasks.indexOf(task);
    console.log('task', task, taskIndex);
    console.log(tasks);
    const newTasks = update(tasks, {
      [taskIndex]: { $set: task }
    });
    console.log(newTasks);
    this.setState({ tasks: newTasks });
  };

  render() {
    const { tasks } = this.state;
    return (
      <main>
        <Typography variant="h4">Kanban Board</Typography>
        <div style={{ display: 'flex' }}>
          {channels.map(channel => (
            <KanbanColumn status={channel}>
              <section
                style={{
                  minWidth: 200,
                  width: '18vw',
                  height: '80vh',
                  padding: 5,
                  margin: '0 auto',
                  border: '1px solid green'
                }}
              >
                <div
                  style={{
                    textAlign: 'center',
                    padding: 5,
                    backgroundColor: 'yellow'
                  }}
                >
                  {labelsMap[channel]}
                </div>
                <div>
                  {tasks
                    .filter(item => item.status === channel)
                    .map(item => (
                      <KanbanItem id={item._id} onDrop={this.update}>
                        <div
                          style={{
                            padding: 5,
                            marginBottom: 5,
                            border: '1px solid green',
                            backgroundColor: 'white'
                          }}
                        >
                          {item.title}
                        </div>
                      </KanbanItem>
                    ))}
                </div>
              </section>
            </KanbanColumn>
          ))}
        </div>
      </main>
    );
  }
}

export default Kanban;
