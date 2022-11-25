class AppRoutes {
    home = () => '/';
    login = () => '/login';
    chats = () => '/chats';
    chatDetails = (id: string | number = ':id') => `/chats/${id}`;
}

export const appRoutes = new AppRoutes();
