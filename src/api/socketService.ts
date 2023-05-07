import { AUTH_HEADER_NAME } from 'api/constants';
import { io, Socket } from 'socket.io-client';

class SocketService {
    socket!: Socket;

    connect = (token: string) => {
        this.socket = io(`${process.env.BACKEND_URL}/chat`, {
            withCredentials: true,
            extraHeaders: { [AUTH_HEADER_NAME]: token },
        });
    };

    disconnect = () => {
        if (this.socket) {
            this.socket.disconnect();
        }
    };
}

export const socketService = new SocketService();
