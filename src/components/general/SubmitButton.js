import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';

const SubmitButton = ({ submitting, children, ...props }) => (
  <Button {...props}>
    {children}
    {submitting && <CircularProgress style={{ marginLeft: 10 }} size={20} />}
  </Button>
);

export default SubmitButton;
