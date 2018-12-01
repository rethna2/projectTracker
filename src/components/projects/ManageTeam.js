import React from 'react';
import { AddCircle, RemoveCircle } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

import { TextField, Typography } from '@material-ui/core';

let addRef = null;

const styles = theme => ({
  smallFont: {
    fontSize: '0.7em'
  },
  flex: {
    display: 'flex'
  },
  grow: {
    flexGrow: 1
  }
});

const ManageTeam = ({ people, onAdd, onRemove, classes }) => (
  <div className="person">
    <Typography variant="subheading">Manage Team</Typography>

    <Typography variant="subtitle1" className={classes.smallFont}>
      Add People
    </Typography>
    <div className={classes.flex}>
      <TextField
        name="userList"
        inputRef={n => (addRef = n)}
        className={classes.grow}
        onKeyPress={e => e.charCode === 13 && onAdd(addRef.value)}
      />
      <AddCircle onClick={() => onAdd(addRef.value)} color="primary" />
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
                <span style={{ padding: '5px 20px 5px 5px' }}>{person}</span>
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

export default withStyles(styles)(ManageTeam);
