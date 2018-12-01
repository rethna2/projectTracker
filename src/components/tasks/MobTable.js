import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';

class MobTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: -1
    };
  }

  handleOpen = index => {
    this.setState({ index });
  };

  handleClose = () => {
    this.setState({ index: -1 });
  };

  render() {
    const { index } = this.state;
    let currentItem = {};
    if (index !== -1) {
      currentItem = this.props.mobTaskData[index];
    }
    return (
      <div>
        <p className="name-mob">Task Name</p>
        <ul>
          {this.props.mobTaskData.map((items, i) => (
            <li className="data-mob" onClick={() => this.handleOpen(i)}>
              {items.name}
            </li>
          ))}
        </ul>
        <Dialog
          title={
            <div>
              Task Details
              <span className="close" onClick={this.handleClose}>
                X
              </span>{' '}
            </div>
          }
          modal={false}
          autoScrollBodyContent={true}
          open={index !== -1}
        >
          <div className="tableDetail">
            <ul>
              <li>Task Name:</li>
              <li>Task Points:</li>
              <li>Task Status:</li>
              <li>Assigned To:</li>
              <li />
            </ul>
            <ul>
              <li>{currentItem.name}</li>
              <li>{currentItem.points}</li>
              <li>{currentItem.status}</li>
              <li>{currentItem.assignedTo}</li>
              <li>
                <Link
                  to={'/' + currentItem.projectId + '/' + currentItem._id}
                  onClick={() => this.props.handleOpen()}
                >
                  Edit
                </Link>
              </li>
            </ul>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default MobTable;
