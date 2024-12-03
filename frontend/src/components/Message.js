
import React from 'react';
import { Box, Typography } from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';

function Message({ message, isOwnMessage }) {
  return (
    <Box
      className={`message-bubble ${isOwnMessage ? 'message-own' : 'message-other'}`}
    >
      <Typography variant="body1">{message.content}</Typography>
      <Typography
        variant="caption"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          color: 'text.secondary',
          justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
        }}
      >
        {new Date(message.createdAt).toLocaleTimeString()}
        {isOwnMessage && (
          <DoneAllIcon sx={{ fontSize: 16, color: '#34B7F1' }} />
        )}
      </Typography>
    </Box>
  );
}

export default Message;