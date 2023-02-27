import { io, Socket } from 'socket.io-client';

class SocketService {
    socket!: Socket;

    connect = (authentication: string) => {
        this.socket = io(`${process.env.BACKEND_URL}/chat`, {
            withCredentials: true,
            extraHeaders: { authentication },
        });
    };

    disconnect = () => {
        if (this.socket) {
            this.socket.disconnect();
        }
    };
}

export const socketService = new SocketService();
