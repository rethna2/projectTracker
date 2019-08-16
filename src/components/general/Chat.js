import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { startChannel } from '../../actions';

const styles = theme => ({
  wrapper: {
    position: 'fixed',
    bottom: 5,
    right: 5
  },
  chatBox: {
    width: 300,
    minHeight: 200,
    border: '1px solid blue',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column'
  },
  head: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    backgroundColor: '#99f'
  },
  btn: {
    backgroundColor: '#99f',
    padding: '5px 10px',
    cursor: 'pointer',
    display: 'inline-block'
  },
  item: {
    padding: 3
  },
  main: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  chatList: {
    flexGrow: 1,
    borderBottom: '1px solid blue'
  }
});

class Chat extends Component {
  state = {
    show: false,
    chatTxt: '',
    username: '',
    roomname: ''
  };

  onKeyDown = e => {
    if (e.keyCode === 13) {
      const { chatTxt } = this.state;
      let msg = {
        username: this.props.username,
        roomname: this.props.roomname,
        text: chatTxt
      };
      this.props.sendChat(msg);
      this.setState({
        chatTxt: ''
      });
    }
  };

  render() {
    const { classes, data } = this.props;
    if (!this.state.show) {
      return (
        <div
          className={classes.wrapper}
          onClick={() => this.setState({ show: true })}
        >
          <span className={classes.btn}>Chat</span>
        </div>
      );
    }

    return (
      <div className={classes.wrapper}>
        <div className={classes.chatBox}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {!this.props.username ? (
              <div>
                Name:
                <input
                  type="text"
                  value={this.state.username}
                  onChange={e => this.setState({ username: e.target.value })}
                />
                Room Name:
                <input
                  type="text"
                  value={this.state.roomname}
                  onChange={e => this.setState({ roomname: e.target.value })}
                />
              </div>
            ) : (
              <span>
                {this.props.username}({this.props.roomname})
              </span>
            )}
            <button
              onClick={() =>
                this.props.onConnect(this.state.username, this.state.roomname)
              }
            >
              {this.props.username ? 'Disconnect' : 'Connect'}
            </button>
          </div>
          <div className={classes.head}>
            <div>Chat</div>
            <span
              className={classes.btn}
              onClick={() => this.setState({ show: false })}
            >
              Hide
            </span>
          </div>
          <div className={classes.main}>
            <div className={classes.chatList}>
              {data.map(item => (
                <div className={classes.item}>
                  <span>
                    ({item.numUsers || 0}){item.username}
                  </span>
                  :<span>{item.text}</span>
                </div>
              ))}
            </div>
            <div>
              <input
                type="text"
                placeholder="type here"
                value={this.state.chatTxt}
                onChange={e => this.setState({ chatTxt: e.target.value })}
                onKeyDown={this.onKeyDown}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(
  connect(({ message }) => ({ ...message }))(Chat)
);
