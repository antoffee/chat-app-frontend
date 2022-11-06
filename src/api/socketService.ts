import { io, Socket } from 'socket.io-client';

class SocketService {
    socket: Socket | undefined = undefined;

    connect = () => {
        if (this.socket) {
            return;
        }

        this.socket = io(`${process.env.BACKEND_URL}/chat`, {
            withCredentials: true,
        });
    };

    disconnect = () => {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = undefined;
        }
    };
}

export const socketService = new SocketService();
