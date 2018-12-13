import React from 'react';
import { Button, CircularProgress, Typography } from '@material-ui/core';

const TitleBar = ({ label, children}) => (
  <div className="headingTop" style={{ display: 'flex', marginBottom: 20 }}>
    <Typography variant="h4" style={{ flexGrow: 1 }}>
      {label}
    </Typography>
    {children}
  </div>
);

export default TitleBar;
