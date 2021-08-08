import io from 'socket.io-client';
import { getToken } from './api';

let socket;

export function getSocket() {
  const token = getToken();

  if (!token) {
    return null;
  }

  if (!socket) {
    socket = io(process.env.API_URL_BASE, {
      path: '/websocket/entryPoint',
      transports: ['websocket'],
      query: {
        token,
      },
      reconnectionAttempts: 10,
    });

    socket.on('connect', () => {
      console.log('connected');
    });
  }

  return socket;
}
