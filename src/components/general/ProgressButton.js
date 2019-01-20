import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';

const ProgressButton = ({ showProgress, children, ...props }) => (
  <Button {...props}>
    {children}
    {showProgress && (
      <CircularProgress style={{ marginLeft: 10, color: 'green' }} size={20} />
    )}
  </Button>
);

export default ProgressButton;
