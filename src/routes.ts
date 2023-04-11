class AppRoutes {
    home = () => '/';
    login = () => '/login';
    chats = () => '/chats';
    settings = () => '/settings';
    settingsMobile = () => '/mobile/settings';
    settingsEdit = () => '/settings/edit';
    chatDetails = (id: string | number = ':id') => `/chats/${id}`;
}

export const appRoutes = new AppRoutes();
