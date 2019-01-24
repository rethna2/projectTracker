import React from 'react';
import { DragSource } from 'react-dnd';

const boxSource = {
  beginDrag(props) {
    return {
      name: props.id
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      console.log('??', monitor.getItem());
      console.log('??', dropResult);
      props.onDrop(monitor.getItem().name, dropResult.name);
      return;
    }
  }
};

class KanbanItem extends React.Component {
  render() {
    return this.props.connectDragSource(<div>{this.props.children}</div>);
  }
}

export default DragSource('kanbanItem', boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(KanbanItem);
