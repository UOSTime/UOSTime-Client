import io from 'socket.io-client';

let socket;

export function getSocket() {
    if(!socket) {
      socket = io(process.env.API_URL_BASE, {
        path: '/websocket/entryPoint',
        transports: ['websocket'],
        query: {
          token: window.localStorage.getItem('token')
        },
        reconnectionAttempts: 10
      });

      socket.on('connect', () => {
        console.log('connected');
      });
    }
      
    return socket;
}