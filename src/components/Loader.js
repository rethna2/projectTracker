import React from 'react';
import { CircularProgress } from '@material-ui/core';

const Loader = () => (
  <div style={{ margin: '50px auto', textAlign: 'center' }}>
    <CircularProgress size={80} />
  </div>
);

export default Loader;
