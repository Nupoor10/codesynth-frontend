import { io } from 'socket.io-client';
const socketURL = import.meta.env.VITE_SOCKET_URL;

export const initSocket = async () => {
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };
    return io(socketURL, options);
};
