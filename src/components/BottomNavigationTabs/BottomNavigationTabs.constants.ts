import { chatboxEllipses, person } from 'ionicons/icons';
import { appRoutes } from 'routes';

export const TABS = [
    { tab: 'chats', href: '/chats', icon: chatboxEllipses },
    { tab: 'profile', href: appRoutes.settingsMobile(), icon: person },
];
