class AppRoutes {
    home = () => '/';
    login = () => '/login';
    chats = () => '/chats';
    settings = () => '/settings';
    settingsMobile = () => '/mobile/settings';
    settingsEditMobile = () => '/mobile/settingsEdit';
    settingsEdit = (mobile?: boolean) => (mobile ? this.settingsEditMobile() : '/settings/edit');
    chatDetails = (id: string | number = ':id') => `/chats/${id}`;
}

export const appRoutes = new AppRoutes();
