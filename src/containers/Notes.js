import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';

import Chat from '../components/general/Chat';
import Editor from '../components/notes/Editor';
import { startChannel, sendChat, docUpdate } from '../actions';

const styles = theme => ({});

class Notes extends Component {
  constructor(props) {
    super(props);
    //props.dispatch(startChannel());
  }

  render() {
    const { classes } = this.props;
    console.log('props', this.props);
    return (
      <div>
        <Editor
          doc={this.props.doc}
          docUpdate={doc => this.props.dispatch(docUpdate(doc))}
        />
        <Chat
          onConnect={(username, roomname) =>
            this.props.dispatch(startChannel(username, roomname))
          }
          sendChat={msg => this.props.dispatch(sendChat(msg))}
          data={this.props.chat || []}
        />
      </div>
    );
  }
}

export default withStyles(styles)(
  connect(({ message }) => ({ ...message }))(Notes)
);
