import React from 'react';
import { DropTarget } from 'react-dnd';

const boxTarget = {
  drop(props) {
    console.log('props', props);
    return { name: props.status };
  }
};

class KanbanColumn extends React.Component {
  render() {
    return this.props.connectDropTarget(<div>{this.props.children}</div>);
  }
}

export default DropTarget('kanbanItem', boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(KanbanColumn);
