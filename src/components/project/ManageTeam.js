import React from 'react';
import PropTypes from 'prop-types';
import { AddCircle, RemoveCircle } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

import { TextField, Typography } from '@material-ui/core';

import { isValidEmail } from '../../logic/validator';

const styles = theme => ({
  smallFont: {
    fontSize: '0.7em'
  },
  /*
  flex: {
    display: 'flex'
  },*/
  grow: {
    flexGrow: 1
  }
});

class ManageTeam extends React.Component {
  state = {
    emailId: '',
    error: false
  };
  onAdd = () => {
    if (!isValidEmail(this.state.emailId)) {
      this.setState({ error: true, errorMsg: 'Invalid Email' });
      return;
    }
    const present = this.props.people.find(item => item === this.state.emailId);
    if (present) {
      this.setState({ error: true, errorMsg: 'Already in team' });
    } else {
      this.props.onAdd(this.state.emailId);
      this.setState({ emailId: '' });
    }
  };
  render() {
    const { people, onRemove, classes } = this.props;
    return (
      <div className="person">
        <Typography variant="subheading">Manage Team</Typography>

        <Typography variant="subtitle1" className={classes.smallFont}>
          Add People
        </Typography>
        <div className={classes.flex}>
          <TextField
            name="userList"
            error={this.state.error}
            label={this.state.error && this.state.errorMsg}
            onChange={e =>
              this.setState({ emailId: e.target.value, error: false })
            }
            value={this.state.emailId}
            className={classes.grow}
            onKeyPress={e => e.charCode === 13 && this.onAdd()}
          />
          <AddCircle onClick={this.onAdd} color="primary" />
        </div>
        <div>
          {people && (
            <div>
              <Typography variant="subtitle1" className={classes.smallFont}>
                Remove People
              </Typography>
              <div style={{ maxHeight: 300, overflow: 'auto' }}>
                {people.map(person => (
                  <div className="person-flex personlist">
                    <span style={{ padding: '5px 20px 5px 5px' }}>
                      {person}
                    </span>
                    <RemoveCircle
                      onClick={() => onRemove(person)}
                      color="primary"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

ManageTeam.propTypes = {
  people: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ManageTeam);
