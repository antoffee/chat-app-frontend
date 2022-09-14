export type ChatItemProps = {
    title: string;
    date: string;
    image?: string;
    unreadCount?: number;
    messageState?: 'sent' | 'error' | 'read';
    pinned?: boolean;
    message?: string;
    onMakeRead?: () => void;
    onDelete?: () => void;
};
