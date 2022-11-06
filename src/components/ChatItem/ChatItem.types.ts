export type ChatItemProps = {
    title?: string;
    date?: string | Date;
    image?: string;
    unreadCount?: number;
    messageState?: 'sent' | 'error' | 'read';
    pinned?: boolean;
    message?: string;
    id: number;
    onMakeRead?: () => void;
    onDelete?: () => void;
};
