import React from 'react';
import { Typography } from '@mui/material';

function ConnectionStatus({ isConnected }) {
  return (
    <Typography
      variant="body2"
      style={{ color: isConnected ? 'green' : 'red', marginBottom: '10px' }}
    >
      {isConnected ? 'Connected' : 'Disconnected'}
    </Typography>
  );
}

export default ConnectionStatus;


