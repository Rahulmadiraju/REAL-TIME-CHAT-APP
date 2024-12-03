import io from 'socket.io-client';

let socket;

export const initSocket = (token) => {
  socket = io('http://localhost:1337', {
    query: { token },
  });

  socket.on('connect', () => {
    console.log('Connected to WebSocket');
  });

  socket.on('connect_error', (error) => {
    console.error('WebSocket connection error:', error);
  });

  return socket;
};

export const getSocket = () => socket;

