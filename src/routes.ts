class AppRoutes {
    home = () => '/';
    login = () => '/login';
    chats = () => '/chats';
    settings = () => '/settings';
    settingsMobile = () => '/mobile/settings';
    settingsEditMobile = () => '/mobile/settings-edit';
    settingsEdit = (mobile?: boolean) => (mobile ? this.settingsEditMobile() : '/settings/edit');
    chatDetails = (id: string | number = ':id') => `/chats/${id}`;
    avatarEditMobile = () => '/mobile/avatar-edit';
}

export const appRoutes = new AppRoutes();
