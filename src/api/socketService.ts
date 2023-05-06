import { io, Socket } from 'socket.io-client';

class SocketService {
    socket!: Socket;

    connect = (Authorization: string) => {
        this.socket = io(`${process.env.BACKEND_URL}/chat`, {
            withCredentials: true,
            extraHeaders: { Authorization },
        });
    };

    disconnect = () => {
        if (this.socket) {
            this.socket.disconnect();
        }
    };
}

export const socketService = new SocketService();
