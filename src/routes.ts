class AppRoutes {
    home = () => '/';
    login = () => '/login';
    chats = () => '/chats';
    settings = () => '/settings';
    settingsEdit = () => '/settings';
    chatDetails = (id: string | number = ':id') => `/chats/${id}`;
}

export const appRoutes = new AppRoutes();
